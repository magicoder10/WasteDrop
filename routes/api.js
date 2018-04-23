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
        if(error) {
            res.end(error);
            return
        }

        let scoreRows = JSON.parse(data);
        res.end(JSON.stringify(getTopFivePlayers(scoreRows)));
    })
});

router.post('/leader-board', function (req, res, next) {
    let secret = req.get('Authorization');
    if(secret !== process.env.SECRET) {
        res.status(401);
        res.end();
        return;
    }
    fs.readFile(leaderBoardDataFilename, 'utf8', (error, data) => {
        if(error) {
            res.end(error);
            return
        }

        let scoreRows = JSON.parse(data);
        scoreRows.append(JSON.parse(req.body));

        fs.writeFile(leaderBoardDataFilename, JSON.stringify(scoreRows), 'utf8', error => {
            if(error) {
                res.end(error);
                return
            }
            res.end(JSON.stringify(getTopFivePlayers(scoreRows)));
        });
    })
});

module.exports = router;
