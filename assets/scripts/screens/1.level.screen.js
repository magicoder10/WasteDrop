class Level1Screen {
    constructor(container, imageAssets, audioAssets) {
        this._container = container;
        this._container.innerHTML = `
                <div id="level-1-screen">
                    <img id="wall"/>
                    <img id="ground"/>
                    
                    <div id="info-labels">
                        <div id="points-label">Points:&nbsp;<span id="points">100</span></div>
                        <div id="time-remaining-label"><span id="time-remaining">120</span>&nbsp;seconds&nbsp;left</div>
                    </div>
                    
                    <ul id="cans">
                        <li>
                            <img id="can-paper">
                        </li>
                        <li>
                            <img id="can-plastic">
                        </li>
                        <li>
                            <img id="can-metal">
                        </li>
                        <li>
                            <img id="can-trash">
                        </li>
                    </ul>
                    
                    <img id="assembly-line-far-side"/>
                    <img id="assembly-line-close-side"/>
                    <img id="assembly-line-rods">
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

    show(onShown) {
        this._container.style.opacity = '1';
        setTimeout(() => {
            onShown();
        }, 600);
    }
}