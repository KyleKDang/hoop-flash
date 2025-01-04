require('dotenv').config()
const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const googleKey = process.env.GOOGLE_API_KEY
app.get('/api/v1/videos', async (req, res) => {
    const videos = []

    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${googleKey}&type=video&part=snippet&maxResults=10&q=lakers+clippers`)
        const result = await response.json()
        const items = result.items
        
        items.map((video) => {
            const title = video.snippet.title
            const description = video.snippet.description
            const thumbnail = video.snippet.thumbnails.high.url
            const channel = video.snippet.channelTitle
            const publishDate = video.snippet.publishTime

            videos.push({
                title,
                description,
                thumbnail,
                channel,
                publishDate
            })
        })
    } catch (err) {
        console.log(err)
    }

    res.status(200).json(videos)

})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`)
})


