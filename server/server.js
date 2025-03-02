require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Redis = require('redis')

const app = express()

const db = require('./db')
const { fetchGames } = require('./db/balldontlie.js')

const authenticateToken = require('./middleware/auth.js')

const DEFAULT_EXPIRATION = 3600
const redisClient = Redis.createClient() // Add production url as a parameter Redis.createClient({ url : ___ })
redisClient.on('connect', () => {
    console.log('Redis client connected');
});
redisClient.connect()

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


app.get('/api/v1/user', authenticateToken, (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            user: req.user
        }
    })
})


app.get('/api/v1/videos', authenticateToken, async (req, res) => {

    try {
        const userTeamsResponse = await db.query(
            `SELECT name FROM user_teams INNER JOIN teams ON team_id = teams.id WHERE user_id = $1`, 
            [req.user.userId]
        );
        const userTeams = userTeamsResponse.rows

        const filteredVideos = await redisClient.get(`filteredVideos?${req.user.userId}`)

        if (filteredVideos != null) {
            res.status(200).json({
                status: 'success',
                data: {
                    videos: JSON.parse(filteredVideos),
                    userTeams
                }
            })
        } else {
            const videosResponse = await db.query('SELECT * FROM videos')
            const videos = videosResponse.rows

            const teamsSet = new Set()
            userTeams.forEach((userTeam) => {
                teamsSet.add(userTeam.name.toLowerCase())
            })

            const filteredVideos = videos.filter((video) => {
                try {
                    const videoTitle = video.title.toLowerCase()
                    const [team1, team2WithRest] = videoTitle.split(' at ')
                    const [team2, ...rest] = team2WithRest.trim().split(' | ')
                    return teamsSet.has(team1) || teamsSet.has(team2)
                } catch (err) {
                    console.log(err)
                }
            })
            await redisClient.setEx(`filteredVideos?${req.user.userId}`, 3600, JSON.stringify(filteredVideos))
            
            res.status(200).json({
                status: 'success',
                data: {
                    videos: filteredVideos,
                    userTeams
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
})


app.get('/api/v1/teams:user_id', async (req, res) => {
    try {

        const selectedTeamsResponse = await db.query(`
            SELECT teams.id, full_name 
            FROM teams
            WHERE teams.id IN 
            (SELECT team_id 
            FROM user_teams
            WHERE user_id = $1)
            ORDER BY teams.id
        `, [req.params.user_id])
        const selectedTeams = selectedTeamsResponse.rows

        const unselectedTeamsResponse = await db.query(`
            SELECT teams.id, full_name 
            FROM teams
            WHERE teams.id NOT IN 
            (SELECT team_id 
            FROM user_teams
            WHERE user_id = $1)
            ORDER BY teams.id
        `, [req.params.user_id])
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
        `, [req.body.user_id, req.body.team_id])

        await redisClient.del(`filteredVideos?${req.body.user_id}`)

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


app.delete('/api/v1/teams/:user_id/:team_id', async (req, res) => {
    try {
        await db.query(`
            DELETE FROM user_teams
            WHERE user_id = $1
            AND team_id = $2
        `, [req.params.user_id, req.params.team_id])

        await redisClient.del(`filteredVideos?${req.params.user_id}`)

        res.status(204).json({
            status: 'success',
        })

    } catch (err) {
        console.log(err)
    }
})


app.get('/api/v1/games', async (req, res) => {
    try {
        const games = await redisClient.get('games')

        if (games != null) { 
            res.status(200).json({
                status: 'success',
                data: {
                    games: JSON.parse(games)
                }
            })
        } else {
            const games = await fetchGames()
            await redisClient.setEx('games', 3600, JSON.stringify(games))

            res.status(200).json({
                status: 'success',
                data: {
                    games
                }
            })
        }

    } catch (err) {
        console.log(err)
    }
})


process.on('SIGINT', () => {
    redisClient.quit();
    console.log('Redis client disconnected');
    process.exit();
});


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`)
})


