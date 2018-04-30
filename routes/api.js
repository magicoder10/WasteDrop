const express = require('express');
const router = express.Router();

const fs = require('fs');

const leaderBoardDataFilename = 'data/leader-board.data.json';

function getTopFivePlayers(scoreRows) {
    scoreRows.sort((row1, row2) => row2.score - row1.score);
    return scoreRows.slice(0, 5);
}

router.get('/leader-board', function (req, res, next) {
    fs.readFile(leaderBoardDataFilename, 'utf8', (error, data) => {
        if (error) {
            res.end(error);
            return
        }

        let scoreRows = JSON.parse(data);
        res.end(JSON.stringify(getTopFivePlayers(scoreRows)));
    })
});

const scores = {
    'cup': 10,
    'paper-bag': 12,
    'plastic-bag': 16,
    'metal-can': 14,
    'banana-peel': 13
};

router.post('/leader-board', function (req, res, next) {
    let secret = req.get('Authorization');
    if (secret !== process.env.SECRET) {
        res.status(401);
        res.end();
        return;
    }
    fs.readFile(leaderBoardDataFilename, 'utf8', (error, data) => {
        if (error) {
            res.end(error);
            return
        }

        let scoreRows = JSON.parse(data);

        let body = req.body;

        if (!body.correctCharacters ||
            !body.playerName ||
            (typeof body.playerName) !== "string" ||
            !Array.isArray(body.correctCharacters) ||
            body.playerName.length >= 10) {
            res.end(JSON.stringify(getTopFivePlayers(scoreRows)));
        } else {
            let score = body.correctCharacters.filter(name => scores.hasOwnProperty(name))
                .reduce((sum, name) => sum + scores[name], 0);

            fs.writeFile(leaderBoardDataFilename, JSON.stringify(scoreRows), 'utf8', error => {
                if (error) {
                    res.end(error);
                    return
                }

                let scoreRow = {
                    playerName: body.playerName,
                    score: score
                };
                scoreRows.push(scoreRow);
                res.end(JSON.stringify(getTopFivePlayers(scoreRows)));
            });
        }
    })
});

module.exports = router;
