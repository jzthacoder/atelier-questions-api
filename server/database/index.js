const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST
})

const connectDb = async () => {
  console.log('starting up database')
  try {
      await pool.connect()
      console.log('connected to database')
  } catch (error) {
      console.log(error)
  }
}

module.exports = { pool, connectDb } ;