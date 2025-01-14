require('dotenv').config({ path: '../.env' })

const db = require('./index.js')

const { google } = require('googleapis')
const youtube = google.youtube('v3')

const fetchYoutubeVideos = async () => {
    await db.query('DROP TABLE IF EXISTS videos')
    await db.query('CREATE TABLE videos (id SERIAL PRIMARY KEY, video_id TEXT NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL, thumbnail TEXT NOT NULL, publish_date TEXT NOT NULL)')

    try {
        const response = await youtube.playlistItems.list({
            key: process.env.GOOGLE_API_KEY,
            part: 'snippet',
            playlistId: process.env.NBA_HIGHLIGHTS_ID,
            maxResults: 50
        })

        const items = response.data.items

        for (let video of items) {
            const videoId = video.snippet.resourceId.videoId
            const title = video.snippet.title
            const description = video.snippet.description
            const thumbnail = video.snippet.thumbnails.high.url
            const publishDate = video.snippet.publishedAt
            
            if (videoId && title && description && thumbnail && publishDate) {
                await db.query(
                    'INSERT INTO videos (video_id, title, description, thumbnail, publish_date) VALUES ($1, $2, $3, $4, $5)',
                    [videoId, title, description, thumbnail, publishDate]
                )
            }
        }

    } catch (err) {
        console.log(err)
    }
}

module.exports = fetchYoutubeVideos