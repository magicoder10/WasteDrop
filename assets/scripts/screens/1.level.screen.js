class Level1Screen {
    constructor(container, imageAssets, audioAssets) {
        this._container = container;
        this._container.innerHTML = `
                <div id="level-1-screen">
                    <img id="wall"/>
                    <img id="ground"/>
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

        this._wallEl.src = imageAssets['wall'].src;
        this._groundEl.src = imageAssets['ground'].src;
        this._assemblyLineFarSideEl.src = imageAssets['assembly-line-far-side'].src;
        this._assemblyLineCloseSideEl.src = imageAssets['assembly-line-close-side'].src;
        this._assemblyLineRodsEl.src = imageAssets['assembly-line-rods'].src;
    }

    show(onShown) {
        this._container.style.opacity = '1';
        setTimeout(() => {
            onShown();
        }, 600);
    }
}