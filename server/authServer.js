require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const app = express()

const db = require('./db')

app.use(express.json())
app.use(cors())


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
}


app.post('/api/v1/auth/signup', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const result = await db.query(`
            INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *
        `, [req.body.username, hashedPassword])

        const userId = result.rows[0].id
        const username = result.rows[0].username

        const user = { userId, username }

        const accessToken = generateAccessToken(user)
        const refreshToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

        await db.query('INSERT INTO tokens (refresh_token) VALUES ($1)', [refreshToken])

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        res.status(201).json({
            status: 'success',
            data: {
                accessToken,
            }
        })

    } catch (err) {
        console.log(err)

        if (err.code === '23505') {
            res.status(409).json({
                status: 'error',
                message: 'Username is taken'
            })
        }
    }
})


app.post('/api/v1/auth/login', async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password

        const userResponse = await db.query('SELECT * FROM users WHERE username = $1', [username])
        const userData = userResponse.rows[0]

        if (!userData) {
            return res.status(400).json({
                status: 'error',
                message: 'Cannot find user'
            })
        }

        const userId = userData.id

        if (await bcrypt.compare(password, userData.password_hash)) {
            const user = { userId, username }

            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

            await db.query('INSERT INTO tokens (refresh_token) VALUES ($1)', [refreshToken])

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            })

            res.status(201).json({
                status: 'success',
                data: {
                    accessToken,
                }
            })
        }

    } catch (err) {
        console.log(err)
    }
})


app.post('/api/v1/auth/token', (req, res) => {
    const refreshToken = req.body.token

    const tokenResponse = db.query(`SELECT * FROM tokens WHERE token = $1`, [refreshToken])
    const tokenData = tokenResponse.rows[0]

    if (!tokenData) {
        return res.status(403).json({
            status: 'error'
        })
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                status: 'error'
            })
        }

        const accessToken = generateAccessToken({ userId: user.userId, username: user.username })

        res.status(201).json({
            status: 'success',
            data: {
                accessToken
            }
        })
    })
})


app.delete('/api/v1/auth/logout/refreshToken', async (req, res) => {
    const refreshToken = req.params.refreshToken

    try {
        await db.query(`DELETE FROM tokens WHERE refresh_token = $1`, [refreshToken])

        res.status(204).json({
            status: 'success'
        })
        
    } catch (err) {
        console.log(err)
    }
})


const port = process.env.AUTH_PORT || 4000
app.listen(port, () => {
    console.log(`auth server is up and listening on port ${port}`)
})