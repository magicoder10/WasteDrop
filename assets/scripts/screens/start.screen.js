class StartScreen {
    constructor(container, imageAssets, audioAssets) {
        this._container = container;
        this._container.innerHTML = `
                <div id="start-screen">
                    <img id="wall"/>
                    <img id="ground"/>
                    <img id="title"/>

                    <div id="buttons">
                        <div id="start-button"></div>
                        <div id="credit-button"></div>
                    </div>
                </div>
            `;

        this.onStartButtonClick = () => {
        };

        this._wallEl = this._container.querySelector('#wall');
        this._groundEl = this._container.querySelector('#ground');
        this._titleEl = this._container.querySelector('#title');

        this._startButtonEl = this._container.querySelector('#start-button');
        this._creditButtonEl = this._container.querySelector('#credit-button');

        this._wallEl.src = imageAssets['wall'].src;
        this._groundEl.src = imageAssets['ground'].src;
        this._titleEl.src = imageAssets['title'].src;

        this._startButtonEl.style.backgroundImage = `url(${imageAssets['start-button'].src})`;
        this._creditButtonEl.style.backgroundImage = `url(${imageAssets['credit-button'].src})`;

        this._startButtonEl.onmouseover = () => {
            this._startButtonEl.style.backgroundImage = `url(${imageAssets['start-button-hover'].src})`;
            audioAssets['button-hover'].play();
        };

        this._startButtonEl.onmouseout = () => {
            this._startButtonEl.style.backgroundImage = `url(${imageAssets['start-button'].src})`;
        };

        this._startButtonEl.onclick = () => {
            audioAssets['button-click'].volume = 0.3;
            audioAssets['button-click'].play();

            this.onStartButtonClick();
        };

        this._creditButtonEl.onmouseover = () => {
            this._creditButtonEl.style.backgroundImage = `url(${imageAssets['credit-button-hover'].src})`;
            audioAssets['button-hover'].play();
        };

        this._creditButtonEl.onmouseout = () => {
            this._creditButtonEl.style.backgroundImage = `url(${imageAssets['credit-button'].src})`;
        };
    }

    show(onShown) {
        this._container.style.opacity = '1';
        setTimeout(() => {
            onShown();
        }, 1000);
    }

    hide() {
        this._container.style.opacity = '0';
    }
}