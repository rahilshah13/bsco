const { EMOJI_SET, PERCENT_ENCODINGS, STR_LEN_SET } = require('../helpers/emojiSet');
const haiku_detector = require('haiku-detect');
const request = require("request");

function validatePoint(req, res, next) {

    let validationRes = 'emoji';

    try {
        const {emoji, x, y, clue, secret} = req.body;

        if (EMOJI_SET.has(emoji)) {
            validationRes = validateCoordAndClue(x, y, clue, secret);

            if(validationRes === 'valid') {
                let emojiString = req.path.replace("/", "");

                req.body.parentPath = emojiString === "" ? "/" : emojiString;
                req.body.fullPath = emojiString + encodeURIComponent(emoji);

                console.log("parent emoji path: "+req.body.parentPath);
                console.log("full emoji path: "+req.body.fullPath);

                while (STR_LEN_SET.has(emojiString.length)) {
                    if (PERCENT_ENCODINGS.has(emojiString.substring(0, 12))) {
                        emojiString = emojiString.substring(12);
                    } else if (PERCENT_ENCODINGS.has(emojiString.substring(0, 9))) {
                        emojiString = emojiString.substring(9);
                    }
                }

                if (emojiString.length == 0) {
                    console.log("valid emoji string");
                    return next();
                }
            }
        }
    } catch (e) {
        console.log(e);
        return res.status(400).send(validationRes);
    }

    return res.status(400).send(validationRes === "valid" ? "max depth reached": "idk");
}


function validateCoordAndClue(xCoord, yCoord, clue, secret) {

    let x = parseInt(xCoord);
    let y = parseInt(yCoord);

    if (x > 100 || y > 100 || x < 0 || y < 0)
        return "coord";

    if (clue.length > 69 || clue.length < 3)
        return "clue";

    if (clue.includes("*") || clue.toLowerCase().includes("insert"))
        return "clue";

    if (secret.length > 24 || secret.length < 7)
        return "answer";

    return "valid";
}

function validateContent(req, res, next) {
    const {haiku, url, secret} = req.body;
    req.body.fullPath = req.path === '/new/content' ? "/" : req.path.split("/")[2];
    console.log("Full path: "+ req.body.fullPath);

    try {
        //validate url
        urlExists(url, (err, exists) => {
            // validate haiku
            if(exists) {
                if(haiku_detector.detect(haiku) === true)
                    return next();
            }
        });
    } catch(e) {
        console.log(e);
        return res.status(400).send("bad haiku");
    }

}

// from url-exists npm module
function urlExists(url, cb) {
     request({ url: url, method: 'HEAD' }, function(err, res) {
        if (err) return cb(null, false);
        cb(null, /4\d\d/.test(res.statusCode) === false);
    });
}

module.exports = {
    validatePoint,
    validateContent
};
