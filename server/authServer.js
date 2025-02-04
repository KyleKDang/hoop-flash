require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
const authenticateToken = require('./middleware/auth.js')

app.use(express.json())


app.post('/login', authenticateToken, (req, res) => {
    const username = req.body.username
    const user = { username }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

    res.status(201).json({
        status: 'success',
        data: {
            accessToken
        }
    })
})


const port = process.env.AUTH_PORT || 4000
app.listen(port, () => {
    console.log(`auth server is up and listening on port ${port}`)
})