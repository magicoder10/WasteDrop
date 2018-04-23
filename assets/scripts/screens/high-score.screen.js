class HighScoreScreen {
    constructor(container, imageAssets, audioAssets) {
        this._container = container;
        this._container.innerHTML = `
                <div id="high-score-screen">
                    <img id="wall" draggable="false"/>
                    <img id="ground" draggable="false"/>
                    
                    <div id="leader-board">
                        <div id="title">high score</div>
                    </div>
                    
                    <div id="replay-button" title="Replay">
                        <img id="replay-icon">
                    </div>
                </div>
            `;

        this._screen = this._container.querySelector('#high-score-screen');
        this._wallEl = this._container.querySelector('#wall');
        this._groundEl = this._container.querySelector('#ground');
        this._replayIconEl = this._container.querySelector('#replay-icon');

        this._wallEl.src = imageAssets['wall'].src;
        this._groundEl.src = imageAssets['ground'].src;
        this._replayIconEl.src = imageAssets['replay-icon'].src;

    }

    show(onShown) {
        this._container.style.opacity = '1';
        setTimeout(() => {
            onShown();
        }, 600);
    }
}