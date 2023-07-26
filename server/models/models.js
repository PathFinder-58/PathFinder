import pkg from 'pg';
const { Pool } = pkg;

const PG_URI = 'postgres://cmrnsfqr:BiCbs7i9LsYOE5VTYRnYMQ1A2riywSMo@mahmud.db.elephantsql.com/cmrnsfqr'

const pool = new Pool({
  connectionString: PG_URI
})

export const query = (text, params, callback) => {
  console.log('executed query', text);
  return pool.query(text, params, callback);
};