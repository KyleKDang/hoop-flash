require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

const db = require('./db')

app.use(express.json())
app.use(cors())


const refreshDatabase = require('./db/youtube.js')
const cron = require('node-cron')
cron.schedule('0,5,10,15,20,25,30,35,40,45,50,55 * * * *', async () => {
    try {
        await refreshDatabase()
        console.log('successfully refreshed database')
    } catch (err) {
        console.log('failed to refresh database')
    }
})


app.get('/api/v1/videos', async (req, res) => {
    try {
        const videosResponse = await db.query('SELECT * FROM videos')
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


app.get('/api/v1/teams', async (req, res) => {
    try {

        const selectedTeamsResponse = await db.query(`
            SELECT teams.id, full_name
            FROM teams 
            LEFT JOIN user_teams 
            ON teams.id = team_id
            WHERE team_id IS NOT NULL 
            ORDER BY teams.id
        `)
        const selectedTeams = selectedTeamsResponse.rows

        const unselectedTeamsResponse = await db.query(`
            SELECT teams.id, full_name 
            FROM teams 
            LEFT JOIN user_teams 
            ON teams.id = team_id 
            WHERE team_id IS NULL
            ORDER BY teams.id
        `)
        const unselectedTeams = unselectedTeamsResponse.rows


        res.status(200).json({
            status: 'success',
            data: {
                selectedTeams,
                unselectedTeams
            }
        })

    } catch (err) {
        console.log(err)
    }
})


app.post('/api/v1/teams', async (req, res) => {
    try {
        const results = await db.query(`
            INSERT INTO user_teams (user_id, team_id) 
            VALUES ($1, $2) 
            RETURNING *
        `, [1, req.body.team_id])

        res.status(201).json({
            status: 'success',
            data: {
                team: results.rows[0]
            }
        })

    } catch (err) {
        console.log(err)
    }
})


app.delete('/api/v1/teams/:team_id', async (req, res) => {
    try {
        await db.query(`
            DELETE FROM user_teams
            WHERE team_id = $1
        `, [req.params.team_id])

        res.status(204).json({
            status: 'success',
        })

    } catch (err) {
        console.log(err)
    }
})


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`)
})


