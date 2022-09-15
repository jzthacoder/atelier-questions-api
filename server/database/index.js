const { Pool } = require("pg");

const connectDb = async () => {
  console.log('starting up database')
  try {
      const pool = new Pool({
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST
      });
      console.log('here is pool: ', pool)
      await pool.connect()
      console.log('connection')
      const res = await pool.query(`SELECT COUNT(*) FROM questions;`)
      // console.log(res)
      console.log('connected to database')
      await pool.end()
      console.log('FINISHED')
  } catch (error) {
      console.log('caught error')
      console.log(error)
  }
}

module.exports = { connectDb } ;