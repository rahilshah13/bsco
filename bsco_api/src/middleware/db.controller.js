const bcrypt = require('bcrypt');
const { pool, hash_secret } = require('../helpers/db');
const { client, getAsync, setAsync, delAsync } = require('../helpers/cache');

const INSERT_QS = `INSERT INTO points(full_path, parent_path, emoji, location, clue, secret) VALUES($1, $2, $3, $4, $5, $6)`;

async function getPointsContentAndClue(req, res) {
    // get all emojis from parent route
    const query_res = {points: "", content: "", clue: ""};

    let fullPath = req.path === "/api/" ? "/" : req.path.replace("/", "");

    console.log(fullPath);
    const cachedResult = await getAsync(fullPath);

    console.log("serving from cache");

    if(cachedResult)
        return res.status(200).send(JSON.parse(cachedResult));


    // get clue
    query_res.clue = await pool.query('SELECT clue FROM points WHERE full_path=$1', [fullPath]).catch(e => console.log(e));

    // if clue doesnt exist, then the path doesnt exist
    if(query_res.clue.rowCount === 0)
        return res.status(400).send("could not GET");
    else {
        query_res.points = await pool.query('SELECT full_path, emoji, location FROM points WHERE parent_path=$1', [fullPath])
            .catch(e => console.log(e));
        query_res.content = await pool.query('SELECT * FROM content WHERE full_path=$1', [fullPath])
            .catch(e => console.log(e));

        console.log(req.points);
        query_res.clue = query_res.clue.rows;
        query_res.points = query_res.points.rows;
        query_res.content = query_res.content.rows;

        // set cache
        await setAsync(fullPath, JSON.stringify(query_res));
        return res.status(200).send(query_res);
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

    // NEED TO VERIFY THAT PARENT_PATH EXISTS -- RECHECK LATER
    const parent_exists = await pool
        .query('SELECT * FROM points WHERE full_path=$1', [parentPath])
        .catch(e => { return res.status(400).send("could not add"); });

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
                .then(async () => {
                    await delAsync(parentPath);
                    return res.status(200).send("great success!");
                })
                .catch(err => {console.log(err); return res.status(400).send("could not add");});
        });
    } else {
        return res.status(400).send("could not add");
    }

}

async function addContent(req, res, next) {
    const { content, url, secret, fullPath } = req.body;
    console.log("WHAT IT DO");

    try {
        // validate secret
        const point = await pool.query('SELECT * FROM points WHERE full_path=$1', [fullPath]);

        if(await compare_secrets(secret, point.rows[0].secret)) {
            pool.query('INSERT INTO content(full_path, URL, content) VALUES($1, $2, $3)', [fullPath, url, content])
                .then( async (result) => {
                    // delete cached data
                    await delAsync(fullPath);
                    return res.status(200).send("great success!");
                })
                .catch(err => {
                    console.log(err);
                    return res.status(400).send("could not add content");
                });
        }
    } catch(e) {
        console.log(e);
        return res.status(400).send("could not add content");
    }

}


module.exports = {
    getPointsContentAndClue,
    addContent,
    addPoint,
};
