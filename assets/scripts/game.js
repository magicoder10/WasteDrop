class WasteDropGame {
    constructor() {
        this._imageAssetNames = [
            'wall',
            'ground',
            'title',
            'start-button',
            'credit-button',
            'start-button-hover',
            'credit-button-hover',
            'assembly-line-close-side',
            'assembly-line-far-side',
            'assembly-line-rods',
            'can-plastic',
            'can-trash',
            'can-metal',
            'can-paper'
        ];

        this._audioAssetNames = [
            'button-hover',
            'button-click',
            'introduction',
            'level-1-background'
        ];

        this._totalAssets = this._imageAssetNames.length + this._audioAssetNames.length;
        this._assetsLoaded = 0;

        this._gameContainer = document.querySelector('#game-container');
        this._currentScreenContainer = document.querySelector('#current-screen-container');
        this._nextScreenContainer = document.querySelector('#next-screen-container');
    }

    _loadImageAssets(path, assetNames, extension, onProgress) {
        return new Promise((onComplete, onFail) => {
            let assets = {};

            let count = 0;

            assetNames.forEach(assetName => {
                let image = new Image();
                image.onload = () => {
                    assets[assetName] = image;
                    count++;
                    onProgress();
                    if (count === assetNames.length)
                        onComplete(assets);
                };
                image.src = `${path}/${assetName}.${extension}`;
            });
        });
    }

    _loadAudioAssets(path, assetNames, extension, onProgress) {
        return new Promise((onComplete, onFail) => {
            let assets = {};

            let count = 0;

            assetNames.forEach(assetName => {
                let audio = new Audio();
                audio.addEventListener('loadeddata', () => {
                    assets[assetName] = audio;
                    count++;
                    onProgress();
                    if (count === assetNames.length)
                        onComplete(assets);
                });
                audio.src = `${path}/${assetName}.${extension}`;
            });
        });
    }

    swapScreens() {
        this._gameContainer.removeChild(this._currentScreenContainer);
        this._nextScreenContainer.setAttribute('id', 'current-screen-container');
        this._currentScreenContainer.setAttribute('id', 'next-screen-container');
        this._gameContainer.appendChild(this._currentScreenContainer);

        let currentContainer = this._currentScreenContainer;
        this._currentScreenContainer = this._nextScreenContainer;
        this._nextScreenContainer = currentContainer;
    }

    run() {
        this._loadingScreen = new LoadingScreen(this._currentScreenContainer);
        this._loadingScreen.updateProgress(0);

        this._loadImageAssets('assets/images', this._imageAssetNames, 'svg', () => {
            this._assetsLoaded++;
            this._loadingScreen.updateProgress(this._assetsLoaded / this._totalAssets)
        })
            .then(imageAssets => {
                this._imageAssets = imageAssets;
                this._loadAudioAssets('assets/audios', this._audioAssetNames, 'ogg', () => {
                    this._assetsLoaded++;
                    this._loadingScreen.updateProgress(this._assetsLoaded / this._totalAssets);
                }).then(audioAssets => {
                    this._audioAssets = audioAssets;
                    this._loadingScreen.waitAndHide();
                    this._startScreen = new StartScreen(this._nextScreenContainer, this._imageAssets, this._audioAssets);

                    this._startScreen.onStartButtonClick = () => {
                        this._audioAssets['introduction'].pause();

                        this._startScreen.hide();
                        this._level1Screen = new Level1Screen(this._nextScreenContainer, this._imageAssets, this._audioAssets);

                        setTimeout(()=>{
                            this._level1Screen.show(()=>{
                                this.swapScreens();

                                this._audioAssets['level-1-background'].loop = true;
                                this._audioAssets['level-1-background'].volume = 0.2;
                                this._audioAssets['level-1-background'].play();
                            });
                        }, 400);
                    };

                    this._startScreen.show(() => {
                        this.swapScreens();

                        this._audioAssets['introduction'].loop = true;
                        this._audioAssets['introduction'].volume = 0.2;
                        this._audioAssets['introduction'].play();
                    });
                })
            });
    }
}