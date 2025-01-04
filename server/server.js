require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

const db = require('./db')

app.use(express.json())
app.use(cors())

app.get('/api/v1/videos', async (req, res) => {
    try {
        const response = await db.query('SELECT * FROM videos')
        const videos = response.rows
        
        res.status(200).json({
            status: 'success',
            data: {
                videos
            }
        })

    } catch (err) {
        console.log(err)
    }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`)
})


