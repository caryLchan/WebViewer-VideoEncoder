export {}

require('dotenv').config();
const { Pool } = require('pg')

const PG_URI = process.env.PGDATA;

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = pool;