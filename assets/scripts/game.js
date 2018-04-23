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
            'can-paper',
            'can-plastic-hover',
            'can-trash-hover',
            'can-metal-hover',
            'can-paper-hover',
            'character-cup',
            'character-cup-hover',
            'character-bag',
            'character-bag-hover',
            'replay-icon'
        ];

        this._audioAssetNames = [
            'button-hover',
            'introduction',
            'level-1-background',
            'falling',
            'game-over',
            'dropping',
            'high-score'
        ];

        this._totalAssets = this._imageAssetNames.length + this._audioAssetNames.length;
        this._assetsLoaded = 0;

        this._gameContainer = document.querySelector('#game-container');
        this._currentScreenContainer = document.querySelector('#current-screen-container');
        this._nextScreenContainer = document.querySelector('#next-screen-container');


        this._points = 0;
        this._timeRemaining = 0;
    }

    _loadAsset(path, assetNames, extension, AssetType, loadedEventName, onProgress, onComplete, assets, count) {
        let assetName = assetNames[count];
        let asset = new AssetType();
        asset.addEventListener(loadedEventName, () => {
            assets[assetName] = asset;
            count++;
            onProgress();
            if (count === assetNames.length)
                onComplete(assets);
            else this._loadAsset(path, assetNames, extension, AssetType, loadedEventName, onProgress, onComplete, assets, count);
        });
        asset.src = `${path}/${assetName}.${extension}`;
    }

    _loadAllAssets(path, assetNames, extension, AssetType, loadedEventName, onProgress) {
        return new Promise((onComplete, onFail) => {
            let assets = {};
            let count = 0;

            this._loadAsset(path, assetNames, extension, AssetType, loadedEventName, onProgress, onComplete, assets, count);
        });
    }

    _loadImageAssets(path, assetNames, extension, onProgress) {
        return this._loadAllAssets(path, assetNames, extension, Image, 'load', onProgress);
    }

    _loadAudioAssets(path, assetNames, extension, onProgress) {
        return this._loadAllAssets(path, assetNames, extension, Audio, 'loadeddata', onProgress);
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

    _gameOver() {
        this._audioAssets['level-1-background'].pause();

        this._level1Screen.disableUserInteractions();

        let gameOverEl = document.createElement('div');
        gameOverEl.setAttribute('id', 'game-over');
        gameOverEl.textContent = 'game over';
        this._currentScreenContainer.appendChild(gameOverEl);

        $(gameOverEl).animate({
            opacity: 1
        }, 400, 'easeInOutExpo');

        this._audioAssets['game-over'].playbackRate = 0.9;
        this._audioAssets['game-over'].volume = 0.2;
        this._audioAssets['game-over'].play();
    }

    _addRandomCharacter() {
        let characterConfigs = [
            {
                name: 'cup',
                category: 'plastic',
                points: 10
            },
            {
                name: 'bag',
                category: 'paper',
                points: 15
            }
        ];
        let characterConfigIndex = Math.floor(Math.random() * characterConfigs.length);
        let characterConfig = characterConfigs[characterConfigIndex];
        this._level1Screen.addCharacter(this._imageAssets, this._audioAssets, characterConfig.name, characterConfig.category, characterConfig.points, 50,
            (character, targetCan, onReleaseCharacter) => {
                if (character.category !== targetCan.name) {
                    onReleaseCharacter();
                    return;
                }

                this._audioAssets['dropping'].playbackRate = 3;
                this._audioAssets['dropping'].volume = 0.5;
                this._audioAssets['dropping'].play();

                character.remove(() => {
                    this._level1Screen.removeCharacter(character);
                });

                this._points += character.points;
                this._level1Screen.updatePoints(this._points);
            });
    }

    _createCharacters() {
        let delay = 3000;
        this._addRandomCharacter();

        this._createCharactersTimer = setInterval(() => {
            this._addRandomCharacter();
        }, delay);
    }

    _startCountingDown(timeRemaining) {
        let timer = setInterval(() => {
            this._level1Screen.updateTimeRemaining(--timeRemaining);
            if (timeRemaining === 0) {
                this._gameOver();
                if (this._createCharactersTimer) clearInterval(this._createCharactersTimer);
                clearInterval(timer);

                setTimeout(() => {
                    this._level1Screen.hide();

                    setTimeout(() => {
                        this._highScoreScreen = new HighScoreScreen(this._nextScreenContainer, this._imageAssets, this._audioAssets);
                        this._highScoreScreen.show(() => {
                            this._audioAssets['high-score'].loop = true;
                            this._audioAssets['high-score'].volume = 0.2;
                            this._audioAssets['high-score'].play();
                            this.swapScreens();
                        });
                    }, 600);
                }, 8000);


            }
        }, 1000);
    }

    run() {
        this._loadingScreen = new LoadingScreen(this._currentScreenContainer);
        this._loadingScreen.updateProgress(0);

        this._loadImageAssets('assets/images', this._imageAssetNames, 'png', () => {
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
                        this._audioAssets['introduction'].volume = 0;
                        this._audioAssets['introduction'].pause();

                        this._startScreen.hide();
                        this._level1Screen = new Level1Screen(this._nextScreenContainer, this._imageAssets, this._audioAssets);

                        this._points = 0;
                        this._timeRemaining = 300;

                        this._level1Screen.updatePoints(this._points);
                        this._level1Screen.updateTimeRemaining(this._timeRemaining);

                        setTimeout(() => {
                            this._level1Screen.show(() => {
                                this.swapScreens();

                                this._audioAssets['level-1-background'].loop = true;
                                this._audioAssets['level-1-background'].volume = 0.2;
                                this._audioAssets['level-1-background'].play();

                                this._startCountingDown(this._timeRemaining);
                                this._createCharacters();
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