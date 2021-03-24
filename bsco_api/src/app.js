const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const inputController = require('./middleware/input.controller');
const dbController = require('./middleware/db.controller');
const { hash_secret, initTables } = require('./helpers/db');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//configure cors correctly in prod
app.use(cors());

hash_secret("chungus", initTables);
console.log("tables initialized");

// routes

// get all emojis and Content for given ES
app.get('/:emojiString?', dbController.getPointsContentAndClue);

// add an emoji to given ES
app.post('/:emojiString?', inputController.validatePoint, dbController.addPoint);

// add content to path
app.post('/new', inputController.validateContent, dbController.addContent);
app.post('/:emojiString/new', inputController.validateContent, dbController.addContent);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
