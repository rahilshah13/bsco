const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const emojiController = require('./middleware/emoji.controller');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//configure cors correctly in prod
app.use(cors());

// routes
app.get('/:emojiString?',  emojiController.validateEmojis, emojiController.getEmojiList);
app.post('/:emojiString?', emojiController.validateEmojis, emojiController.addEmoji)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
