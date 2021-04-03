const Pool = require('pg').Pool;
const bcrypt = require('bcrypt');

const pool = new Pool({
    user: process.env.POSTGRES_USER || 'me',
    host: process.env.DB_HOST ||'localhost',
    database: process.env.POSTGRES_DB || 'bsco_api',
    password: process.env.POSTGRES_PASSWORD || 'password',
    port: 5432
});

const create_pt = `CREATE TABLE IF NOT EXISTS points(
    ID SERIAL,
    full_path TEXT PRIMARY KEY,
    parent_path TEXT,
    emoji TEXT,
    location jsonb,
    clue TEXT NOT NULL,
    secret TEXT NOT NULL
)`;

const add_root = `INSERT INTO points(full_path, clue, secret) VALUES($1, $2, $3)`;

const create_ct = `CREATE TABLE IF NOT EXISTS content(
    ID SERIAL PRIMARY KEY,
    full_path TEXT NOT NULL,
    url TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL
)`;

const test_content = `INSERT INTO content(full_path, url, content) VALUES($1,$2,$3)`;

async function initTables(hashed_secret) {
    await pool.query(create_pt)
        .catch(err => console.log("table already exists"));
    await pool.query(add_root, ["/", "what's my finsta?", hashed_secret])
        .catch(e => console.log("root clue added"));
    await pool.query(create_ct)
        .catch(e => console.log(e));
    await pool.query(test_content, ["/", "http://www.google.com", "test"])
        .catch(e => console.log("default content added"));
}

function hash_secret(secret, next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(secret, salt, (err, hash) => {
            if (err)
                return null;
            else {
                next(hash);
            }
        });
    });
}

module.exports = {
  pool,
  hash_secret,
  initTables
};
