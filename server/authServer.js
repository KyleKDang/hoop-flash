require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const app = express()

const db = require('./db')
const authenticateToken = require('./middleware/auth.js')

app.use(express.json())


app.post('/api/v1/auth/signup', async (req, res) => {
    try {
        const username = req.body.username

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const results = await db.query(`
            INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *
        `, [username, hashedPassword])

        res.status(201).json({
            status: 'success',
            data: {
                user: results.rows[0]
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
        const user = userResponse.rows[0]
        const user_id = user.id


        if (!user) {
            return res.status(400).json({
                status: 'error',
                message: 'Cannot find user'
            })
        }

        if (await bcrypt.compare(password, user.password_hash)) {

            const accessToken = jwt.sign({ user_id, username }, process.env.ACCESS_TOKEN_SECRET)

            res.status(201).json({
                status: 'success',
                data: {
                    accessToken
                }
            })
        }

    } catch (err) {
        console.log(err)
    }
})


const port = process.env.AUTH_PORT || 4000
app.listen(port, () => {
    console.log(`auth server is up and listening on port ${port}`)
})