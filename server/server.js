require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

const db = require('./db')

app.use(express.json())
app.use(cors())


const refreshDatabase = require('./db/youtube.js')
const cron = require('node-cron')
cron.schedule('0,10,20,30,40,50 * * * *', async () => {
    try {
        await refreshDatabase()
        console.log('successfully refreshed database')
    } catch (err) {
        console.log('failed to refresh database')
    }
})


app.get('/api/v1/videos', async (req, res) => {
    try {
        const videosResponse = await db.query('SELECT * FROM videos LIMIT 10')
        const videos = videosResponse.rows

        const userTeamsResponse = await db.query(
            `SELECT name FROM user_teams INNER JOIN teams ON team_id = teams.id WHERE user_id = $1`, [1]
        );
        const userTeams = userTeamsResponse.rows

        const teamsSet = new Set()
        userTeams.forEach((userTeam) => {
            teamsSet.add(userTeam.name.toLowerCase())
        })

        
        const filteredVideos = videos.filter((video) => {
            const videoTitle = video.title.toLowerCase()
            const [team1, team2WithRest] = videoTitle.split(' at ')
            const [team2, ...rest] = team2WithRest.trim().split(' ')
            return teamsSet.has(team1) || teamsSet.has(team2)
        })
        
        
        res.status(200).json({
            status: 'success',
            data: {
                videos: filteredVideos,
                userTeams
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


