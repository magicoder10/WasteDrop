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

        this._screen = this._container.querySelector('#level-1-screen');
        this._wallEl = this._container.querySelector('#wall');
        this._groundEl = this._container.querySelector('#ground');
        this._assemblyLineFarSideEl = this._container.querySelector('#assembly-line-far-side');
        this._assemblyLineCloseSideEl = this._container.querySelector('#assembly-line-close-side');
        this._assemblyLineRodsEl = this._container.querySelector('#assembly-line-rods');

        this._cansEl = this._container.querySelector('#cans');
        this._canPaperEl = this._container.querySelector('#can-paper');
        this._canPlasticEl = this._container.querySelector('#can-plastic');
        this._canMetalEl = this._container.querySelector('#can-metal');
        this._canTrashEl = this._container.querySelector('#can-trash');

        this._cans = [
            {
                el: this._canPaperEl,
                name: 'paper'
            },
            {
                el: this._canPlasticEl,
                name: 'plastic'
            },
            {
                el: this._canMetalEl,
                name: 'metal'
            },
            {
                el: this._canTrashEl,
                name: 'trash'
            }
        ];

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

        this._characters = [];

        this._lastUpdateAt = null;

        this._rodHeight = 114;

        this._screen.addEventListener('mousemove', (event) => {
            if (!this._characterDragging) return;

            let left = event.x - this._container.offsetLeft;
            let top = event.y - this._container.offsetTop;
            let availableHeight = this._container.offsetHeight - this._rodHeight;

            this._characterDragging.updateLocation(left, top, availableHeight);

            this._cans.forEach(can => {

                if (this._isInside(event.x, event.y, can))
                    can.el.src = imageAssets[`can-${can.name}-hover`].src;
                else
                    can.el.src = imageAssets[`can-${can.name}`].src;
            });
        });

        this._characterDragging = null;

        requestAnimationFrame(this._moveCharacters.bind(this));
    }

    _isInside(x, y, can) {
        let left = x - this._container.offsetLeft;
        let top = y - this._container.offsetTop;

        let canLeft = can.el.offsetLeft + this._cansEl.offsetLeft;
        let canTop = can.el.offsetTop + this._cansEl.offsetTop;

        return left > canLeft && top > canTop && left < canLeft + can.el.offsetWidth && top < canTop + can.el.offsetHeight
    }

    addCharacter(imageAssets, type, speed) {

        let character = new Character(
            this._container.offsetWidth,
            this._rodHeight,
            speed,
            imageAssets[`character-${type}`],
            imageAssets[`character-${type}-hover`],
            (character) => {
                this._characterDragging = character;
            },
            () => {
                this._cans.forEach(can => {
                    can.el.src = imageAssets[`can-${can.name}`].src;
                });
                this._characterDragging = null;
            },
        );
        this._characters.push(character);
        character.addTo(this._screen);

    }

    _moveCharacters(timestamp) {
        if (!this._lastUpdateAt)
            this._lastUpdateAt = timestamp;
        else {

            let timeElapsed = timestamp - this._lastUpdateAt;

            this._characters.filter(character => !character.dragging && !character.releasing)
                .forEach(character => {
                    if (character.left < -character.width) {
                        character.removeFrom(this._screen);
                        character.removed = true;
                    } else character.act(timeElapsed);
                });

            this._characters = this._characters.filter(character => !character.removed);

            this._lastUpdateAt = timestamp;
        }

        requestAnimationFrame(this._moveCharacters.bind(this));
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