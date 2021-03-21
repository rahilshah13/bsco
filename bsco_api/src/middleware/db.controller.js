const bcrypt = require('bcrypt');
const { pool } = require('../helpers/db');


async function getPointsAndContent(req, res) {
    // get all emojis from parent route
    const query_res = {points: "", content: ""};
    req.path = req.path.replace("/", "");

    try {
        query_res.points = await pool.query('SELECT * FROM points WHERE parent_path=$1', [req.path]);
        query_res.content = await pool.query('SELECT * FROM content WHERE full_path==$1', [req.path]);
    } catch(err) {
        console.log(err);
        return res.status(400).send("could not GET");
    }

    console.log(query_res);
    return res.status(200).send(query_res);
}

async function addPoint(req, res, next) {
    const coord = {x:req.body.x, y: req.body.y};
    const { fullPath, parentPath, clue, secret} = req.body;

    try {
        const coord_query = await pool.query('SELECT * FROM points WHERE parent_path=$1 AND location=$2', [parentPath, coord]);
        if(coord_query.rows.length === 0) {
            // hash secret

            pool.query('INSERT INTO points VALUES($1, $2, $3, $4, $5)', [fullPath, parentPath, coord, clue, secret])
                .then( result => { return res.status(200).send("great success!"); })
                .catch( err =>  { return res.status(400).send("could not add point"); });
        }
    } catch(e) {
        console.log(e);
    }
    return res.status(404).send("could not add");
}


async function addContent(req, res, next) {

    try {
        // validate clue
        if("valid clue")
            pool.query('INSERT INTO content($)')
                .then()
                .catch();
    } catch(e) {
        console.log(e);
    }

    return res.status(400).send("could not add content");
}


module.exports = {
    getPointsAndContent,
    addContent,
    addPoint,
};
