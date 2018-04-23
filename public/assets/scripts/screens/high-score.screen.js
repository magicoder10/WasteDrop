class HighScoreScreen {
    constructor(container, imageAssets, audioAssets) {
        this._container = container;
        this._container.innerHTML = `
                <div id="high-score-screen">
                    <img id="wall" draggable="false"/>
                    <img id="ground" draggable="false"/>
                    
                    <div id="leader-board">
                        <div id="title">high score</div>
                        <ul id="scores">
                            <li id="first-place"><div class="player-name"></div><div class="player-score"></div></li>
                            <li id="second-place"><div class="player-name"></div><div class="player-score"></div></li>
                            <li id="third-place"><div class="player-name"></div><div class="player-score"></div></li>
                            <li id="forth-place"><div class="player-name"></div><div class="player-score"></div></li>
                            <li id="fifth-place"><div class="player-name"></div><div class="player-score"></div></li>
                        </ul>
                    </div>
                    
                    <img id="character-bag">
                    <img id="character-cup">
                    
                    <div id="replay-button" title="Replay">
                        <img id="replay-icon">
                    </div>
                    
                    <div id="blurry-background">
                    </div>
                    
                    <div id="fill-name-dialog">
                        <div id="player-score"></div>
                        <input type="text" id="player-name-text-field" placeholder="your name">
                        <div id="close-button">
                            <img id="close-icon">
                        </div>
                    </div>
                </div>
            `;

        this._screen = this._container.querySelector('#high-score-screen');
        this._wallEl = this._container.querySelector('#wall');
        this._groundEl = this._container.querySelector('#ground');
        this._characterBagEl = this._container.querySelector('#character-bag');
        this._characterCupEl = this._container.querySelector('#character-cup');
        this._replayIconEl = this._container.querySelector('#replay-icon');
        this._scoreRowsEl = this._container.querySelectorAll('#scores > li');
        this._playerNameTextField = this._container.querySelector('#player-name-text-field');
        this._closeIconEl = this._container.querySelector('#close-icon');
        this._closeButtonEl = this._container.querySelector('#close-button');
        this._playerScoreEl = this._container.querySelector('#player-score');
        this._blurryBackgroundEl = this._container.querySelector('#blurry-background');
        this._fillNameDialogEl = this._container.querySelector('#fill-name-dialog');

        this._wallEl.src = imageAssets['wall'].src;
        this._groundEl.src = imageAssets['ground'].src;
        this._characterBagEl.src = imageAssets['character-bag'].src;
        this._characterCupEl.src = imageAssets['character-cup'].src;
        this._closeIconEl.src = imageAssets['close-icon'].src;
        this._replayIconEl.src = imageAssets['replay-icon'].src;

        this._playerNameTextField.focus();

        this._score = 0;
        this._getScores();

        this._closeButtonEl.addEventListener('click', () => {
            let playerName = this._playerNameTextField.value || "Player";
            if (playerName.length >= 30) {
                alert('Player name has to be less than 30 characters');
                return;
            }
            this._uploadScoreToServer(playerName, this._score, () => {
                $(this._blurryBackgroundEl)
                    .animate({
                        opacity: 0
                    }, 200, 'easeOutExpo', () => {
                        this._container.removeChild(this._blurryBackgroundEl);
                    });

                $(this._fillNameDialogEl)
                    .animate({
                        opacity: 0
                    }, 200, 'easeOutExpo', () => {
                        this._container.removeChild(this._fillNameDialogEl);
                    });
            });
        });
    }

    _updateScores(scoreRows) {
        scoreRows.forEach((scoreRow, index) => {
            let scoreRowEl = this._scoreRowsEl[index];
            let playerNameEl = scoreRowEl.querySelector('.player-name');
            let scoreEl = scoreRowEl.querySelector('.player-score');
            playerNameEl.textContent = scoreRow.playerName;
            scoreEl.textContent = scoreRow.score;
        })
    }

    _getScores() {
        fetch('/api/leader-board')
            .then(response => response.json())
            .then(this._updateScores.bind(this));
    }

    setScore(score) {
        this._score = score;
        this._playerScoreEl.textContent = `${this._score}`;
    }

    _uploadScoreToServer(playerName, score, onScoreUploaded) {
        let scoreRow = {
            playerName: playerName,
            score: score
        };

        fetch('/api/leader-board', {
            body: JSON.stringify(scoreRow),
            method: 'POST',
            headers: {
                'Authorization': 'waste-drop',
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(scoreRows => {
                this._updateScores(scoreRows);
                onScoreUploaded();
            });
    }

    show(onShown) {
        this._container.style.opacity = '1';
        setTimeout(() => {
            onShown();
        }, 600);
    }
}