const { EMOJI_SET, PERCENT_ENCODINGS, STR_LEN_SET }  = require('../helpers/emojiSet');

function validateEmojis(req, res, next) {

    let emojiString = req.path.replace("/", "");
    console.log(emojiString);
    console.log(emojiString.length);

    while(STR_LEN_SET.has(emojiString.length)) {
        if(PERCENT_ENCODINGS.has(emojiString.substring(0, 12))) {
            emojiString = emojiString.substring(12);
        } else if(PERCENT_ENCODINGS.has(emojiString.substring(0, 9))) {
            emojiString = emojiString.substring(9);
        }

        console.log(emojiString.length);
    }

    if(emojiString.length == 0)
        return next();

    return res.status(404).send("<p>deez nuts</p>");
}


async function getEmojiList(req, res, next) {
    res.send("GREAT SUCCESS");
}

async function addEmoji(req, res, next) {

}



module.exports = {
    validateEmojis,
    getEmojiList,
    addEmoji,
};
