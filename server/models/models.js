const { Pool } = require('pg')

const PG_URI = 'postgres://cmrnsfqr:BiCbs7i9LsYOE5VTYRnYMQ1A2riywSMo@mahmud.db.elephantsql.com/cmrnsfqr'

const pool = new Pool({
  connectionString: PG_URI
})

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text)
    return pool.query(text, params, callback)
  }
}