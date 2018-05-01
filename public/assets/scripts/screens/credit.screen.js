class CreditScreen {
    constructor(container, imageAssets, audioAssets) {
        this._container = container;
        this._container.innerHTML = `
                <div id="credit-screen">
                    <img id="wall" draggable="false"/>
                    <img id="ground" draggable="false"/>
                    
                    <div id="credits">
                        <div id="title">credit</div>
                        <div>
                            <div id="sound-effects">Sound Effects</div>
                            <div><a href="http://soundimage.org" target="_blank">soundimage.org</a></div>
                            <div><a href="http://freesound.org" target="_blank">freesound.org</a></div>
                        </div>
                    </div>
                    
                    <img id="character-bag">
                    <img id="character-cup">
                    
                    <div id="go-back-button" title="Go Back">
                        <img id="go-back-icon">
                    </div>
                </div>
            `;

        this._screen = this._container.querySelector('#high-score-screen');
        this._wallEl = this._container.querySelector('#wall');
        this._groundEl = this._container.querySelector('#ground');
        this._characterBagEl = this._container.querySelector('#character-bag');
        this._characterCupEl = this._container.querySelector('#character-cup');
        this._goBackButtonEl = this._container.querySelector('#go-back-button');
        this._goBackIconEl = this._container.querySelector('#go-back-icon');

        this._wallEl.src = imageAssets['wall'].src;
        this._groundEl.src = imageAssets['ground'].src;
        this._characterBagEl.src = imageAssets['character-plastic-bag'].src;
        this._characterCupEl.src = imageAssets['character-cup'].src;
        this._goBackIconEl.src = imageAssets['go-back-icon'].src;

        this.onGoBackButtonClick = () => {
        };
        this._goBackButtonEl.addEventListener('click', ()=>{
            this.onGoBackButtonClick();
        });

        this._goBackButtonEl.addEventListener('mouseenter', ()=> {
            audioAssets['button-hover'].play();
        });
    }

    show(onShown) {
        this._container.style.opacity = '1';
        setTimeout(() => {
            onShown();
        }, 600);
    }

    hide() {
        this._container.style.opacity = '0';
    }
}