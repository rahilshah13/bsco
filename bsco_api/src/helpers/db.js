const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'bsco_api',
    password: 'password',
    port: 5432
});

const create_pt = `CREATE TABLE IF NOT EXISTS points(
    ID SERIAL,
    full_path TEXT PRIMARY KEY,
    parent_path TEXT NOT NULL,
    location jsonb NOT NULL,
    clue TEXT NOT NULL,
    secret TEXT NOT NULL
)`;


const create_ct = `CREATE TABLE IF NOT EXISTS content(
    ID SERIAL PRIMARY KEY,
    full_path TEXT NOT NULL,
    url TEXT UNIQUE NOT NULL,
    content char(250) UNIQUE NOT NULL
)`;

pool.query(create_pt);
pool.query(create_ct);

module.exports = {
  pool
};
