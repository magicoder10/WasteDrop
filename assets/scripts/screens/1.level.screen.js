class Level1Screen {
    constructor(container, imageAssets, audioAssets) {
        this._container = container;
        this._container.innerHTML = `
                <div id="level-1-screen">
                    <img id="wall"/>
                    <img id="ground"/>
                    <img id="assembly-line-far-side"/>
                    <img id="assembly-line-close-side"/>
                </div>
            `;

        this._wallEl = this._container.querySelector('#wall');
        this._groundEl = this._container.querySelector('#ground');

        this._wallEl.src = imageAssets['wall'].src;
        this._groundEl.src = imageAssets['ground'].src;
    }

    show(onShown) {
        this._container.style.opacity = '1';
        setTimeout(() => {
            onShown();
        }, 600);
    }
}