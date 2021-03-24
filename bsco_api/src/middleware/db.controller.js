const bcrypt = require('bcrypt');
const { pool, hash_secret } = require('../helpers/db');

const INSERT_QS = `INSERT INTO points(full_path, parent_path, emoji, location, clue, secret) VALUES($1, $2, $3, $4, $5, $6)`;

async function getPointsContentAndClue(req, res) {
    // get all emojis from parent route
    const query_res = {points: "", content: "", clue: ""};

    let fullPath  = req.path ==="/" ? "/" : req.path.replace("/", "");
    let parentPath = fullPath ==='' ? null : encodeURIComponent(req.body.parentPath);

    console.log(req.path);

    try {
        query_res.clue = await pool.query('SELECT clue FROM points WHERE full_path=$1', [fullPath]);

        if(query_res.clue.rowCount === 0) {
            return res.status(400).send("could not GET");
        } else {
            query_res.points = await pool.query('SELECT emoji, location FROM points WHERE parent_path=$1', [parentPath]);
            query_res.content = await pool.query('SELECT * FROM content WHERE full_path==$1', [fullPath]);
            console.log(query_res);
            return res.status(200).send(query_res);
        }
    } catch(err) {
        console.log(err);
        return res.status(400).send("could not GET");
    }

}

function compare_secrets(candidate, actual) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidate, actual, (err, isMatch) => {
            if (err) {
                return reject(err);
            }
            if (!isMatch) {
                return reject(false);
            }
            resolve(true);
        });
    });
}


async function addPoint(req, res, next) {
    const coord = {x: req.body.x, y: req.body.y};
    const {fullPath, parentPath, emoji, clue, secret} = req.body;

    // NEED TO VERIFY THAT PARENT_PATH EXISTS -- FIX LATER
    const parent_exists = await pool
        .query('SELECT * FROM points WHERE full_path=$1', [parentPath])
        .catch(e => { return res.status(400).send("could not add"); });

    console.log(parent_exists);

    if (parent_exists.rowCount === 0)
         return res.status(400).send("no parent");

    // VERIFY NO MATCHING COORD IN PARENT PATH
    const coord_query = await pool
        .query('SELECT * FROM points WHERE parent_path=$1 AND location=$2', [parentPath, coord])
        .catch(e => { return res.status(400).send("coord already exists"); });

    if (coord_query.rowCount === 0) {
        // hash secret
        hash_secret(secret, (hashed_secret) => {
            pool.query(INSERT_QS, [fullPath, parentPath, emoji, coord, clue, hashed_secret])
                .then(result => {
                    return res.status(200).send("great success!");
                })
                .catch(err => {console.log(err); return res.status(400).send("could not add");});
        });
    } else {
        return res.status(400).send("could not add");
    }

}

async function addContent(req, res, next) {
    const { secret, content, url, fullPath } = req.body;

    try {
        // validate secret
        const point = await pool.query('SELECT * FROM points WHERE full_path=$1', [fullPath]);

        if(await compare_secrets(secret, point.rows[0].secret)) {
            pool.query('INSERT INTO content(full_path, URL, content) VALUES($1, $2, $3)', [fullPath, url, content])
                .then( result => {
                    console.log(result);
                    return res.status(200).send("great success!");
                })
                .catch(err => {
                    console.log(err);
                });
        }
    } catch(e) {
        console.log(e);
    }

    return res.status(400).send("could not add content");
}


module.exports = {
    getPointsContentAndClue,
    addContent,
    addPoint,
};
