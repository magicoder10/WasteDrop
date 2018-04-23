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
                </div>
            `;

        this._screen = this._container.querySelector('#high-score-screen');
        this._wallEl = this._container.querySelector('#wall');
        this._groundEl = this._container.querySelector('#ground');
        this._characterBagEl = this._container.querySelector('#character-bag');
        this._characterCupEl = this._container.querySelector('#character-cup');
        this._replayIconEl = this._container.querySelector('#replay-icon');
        this._scoreRowsEl = this._container.querySelectorAll('#scores > li');

        this._scoreRows = [
            {
                playerName: 'Jacob',
                score: 1200
            },
            {
                playerName: 'Sam',
                score: 1100
            },
            {
                playerName: 'Harry',
                score: 1000
            },
            {
                playerName: 'Taylor',
                score: 900
            },
            {
                playerName: 'Alex',
                score: 800
            }
        ];

        this._wallEl.src = imageAssets['wall'].src;
        this._groundEl.src = imageAssets['ground'].src;
        this._characterBagEl.src = imageAssets['character-bag'].src;
        this._characterCupEl.src = imageAssets['character-cup'].src;

        this._replayIconEl.src = imageAssets['replay-icon'].src;

        this._updateScores(this._scoreRows);

    }

    _updateScores(scoreRows) {
        scoreRows.forEach((scoreRow, index) => {
            let scoreRowEl = this._scoreRowsEl[index];
            let playerNameEl = scoreRowEl.querySelector('.player-name');
            let scoreEl = scoreRowEl.querySelector('.player-score');
            playerNameEl.textContent = scoreRow.playerName;
            scoreEl.textContent = scoreRow.score;
        });
    }

    show(onShown) {
        this._container.style.opacity = '1';
        setTimeout(() => {
            onShown();
        }, 600);
    }
}