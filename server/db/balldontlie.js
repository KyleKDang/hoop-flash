require('dotenv').config({ path: '../.env' })
const fetch = require('node-fetch')
globalThis.fetch = fetch

const db = require('./index.js')

const { BalldontlieAPI } = require('@balldontlie/sdk')
const balldontlie = new BalldontlieAPI({ apiKey: process.env.BALLDONTLIE_API_KEY });

const fetchTeams = async () => {
    try {
        const teams = (await (await balldontlie.nba.getTeams()).data).slice(0, 30)

        console.log(teams)
        await db.query('DROP TABLE IF EXISTS teams')
        await db.query(`
        CREATE TABLE teams (
            id SERIAL PRIMARY KEY,
            conference TEXT NOT NULL,
            division TEXT NOT NULL,
            city TEXT NOT NULL,
            name TEXT NOT NULL,
            full_name TEXT NOT NULL,
            abbreviation TEXT NOT NULL
        )
        `)

        teams.forEach((team) => {
            db.query(
                `INSERT INTO teams (conference, division, city, name, full_name, abbreviation) VALUES ($1, $2, $3, $4, $5, $6)`,
                [team.conference, team.division, team.city, team.name, team.full_name, team.abbreviation]
            )
        })
    } catch (err) {
        console.log(err)
    }
    
}

fetchTeams()