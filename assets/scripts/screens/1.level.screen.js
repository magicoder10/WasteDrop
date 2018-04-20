class Level1Screen {
    constructor(container, imageAssets, audioAssets) {
        this._container = container;
        this._container.innerHTML = `
                <div id="level-1-screen">
                    <img id="wall" draggable="false"/>
                    <img id="ground" draggable="false"/>
                    
                    <div id="info-labels" draggable="false">
                        <div id="points-label">Points:&nbsp;<span id="points"></span></div>
                        <div id="time-remaining-label"><span id="time-remaining"></span>&nbsp;seconds&nbsp;left</div>
                    </div>
                    
                    <ul id="cans">
                        <li>
                            <img id="can-paper" draggable="false">
                        </li>
                        <li>
                            <img id="can-plastic" draggable="false">
                        </li>
                        <li>
                            <img id="can-metal" draggable="false">
                        </li>
                        <li>
                            <img id="can-trash" draggable="false">
                        </li>
                    </ul>
                    
                    <img id="assembly-line-far-side" draggable="false"/>
                    <img id="assembly-line-close-side" draggable="false"/>
                    <img id="assembly-line-rods" draggable="false">
                </div>
            `;

        this._wallEl = this._container.querySelector('#wall');
        this._groundEl = this._container.querySelector('#ground');
        this._assemblyLineFarSideEl = this._container.querySelector('#assembly-line-far-side');
        this._assemblyLineCloseSideEl = this._container.querySelector('#assembly-line-close-side');
        this._assemblyLineRodsEl = this._container.querySelector('#assembly-line-rods');

        this._canPaperEl = this._container.querySelector('#can-paper');
        this._canPlasticEl = this._container.querySelector('#can-plastic');
        this._canMetalEl = this._container.querySelector('#can-metal');
        this._canTrashEl = this._container.querySelector('#can-trash');

        this._pointsEl = this._container.querySelector('#points');
        this._timeRemainingEl = this._container.querySelector('#time-remaining');


        this._wallEl.src = imageAssets['wall'].src;
        this._groundEl.src = imageAssets['ground'].src;

        this._assemblyLineFarSideEl.src = imageAssets['assembly-line-far-side'].src;
        this._assemblyLineCloseSideEl.src = imageAssets['assembly-line-close-side'].src;
        this._assemblyLineRodsEl.src = imageAssets['assembly-line-rods'].src;

        this._canPaperEl.src = imageAssets['can-paper'].src;
        this._canPlasticEl.src = imageAssets['can-plastic'].src;
        this._canMetalEl.src = imageAssets['can-metal'].src;
        this._canTrashEl.src = imageAssets['can-trash'].src;
    }

    updateTimeRemaining(timeRemaining) {
        this._timeRemainingEl.textContent = timeRemaining;
    }

    updatePoints(points) {
        this._pointsEl.textContent = points;
    }

    show(onShown) {
        this._container.style.opacity = '1';
        setTimeout(() => {
            onShown();
        }, 600);
    }
}