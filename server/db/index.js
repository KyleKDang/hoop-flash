require('dotenv').config()
const pg = require('pg')
const { Pool } = pg
 
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    ssl: {
        rejectUnauthorized: false
    }
})
 
module.exports = { query: (text, params) => pool.query(text, params)}