const Pool = require('pg').Pool;
const bcrypt = require('bcrypt');

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
    content char(250) UNIQUE NOT NULL
)`;

const test_haiku = `INSERT INTO content(full_path, url, content) VALUES($1,$2,$3)`;

async function initTables(hashed_secret) {
    await pool.query(create_pt).catch(err => console.log(e));
    //await pool.query(add_root, ["/", "big", hashed_secret]).catch(e => console.log(e));
    await pool.query(create_ct).catch(e => console.log(e));
    //await pool.query(test_haiku, ["/", "www.google.com", "A world of dew and within every dewdrop A world of struggle"]).catch(e => console.log(e));
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
