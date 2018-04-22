class Character {
    constructor(left, bottom, speed, normalImage, hoverImage) {
        this.left = left;
        this.bottom = bottom;
        this.speed = speed;
        this.removed = false;

        this.moving = true;


        this.dragging = false;

        this._el = document.createElement('img');
        this._el.src = normalImage.src;
        this._el.setAttribute('class', 'character');

        this._el.style.left = `${left}px`;
        this._el.style.bottom = `${bottom}px`;

        this._el.addEventListener('mouseover', ()=>{
            this.moving = false;
            this._el.src = hoverImage.src;
        });

        this._el.addEventListener('mouseout', ()=>{
            this.moving = true;
            this._el.src = normalImage.src;
        });

        this._el.addEventListener('dragstart', ()=>{
           console.log('dragstart');
        });
    }

    addTo(container) {
        container.appendChild(this._el);
    }

    removeFrom(container) {
        container.removeChild(this._el);
    }

    drag() {
        this.dragging = true;
    }

    act(timeElapsed) {
        if(!this.moving) return;

        this.left -= this.speed * timeElapsed / 1000;
        this._el.style.left = `${this.left}px`;
    }
}

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

        this._characters = [];

        this._lastUpdateAt = null;

        requestAnimationFrame(this._moveCharacters.bind(this));
    }

    addCharacter(imageAssets, type, speed) {
        let rodHeight = 114;

        let character = new Character(
            this._container.offsetWidth,
            rodHeight,
            speed,
            imageAssets[`character-${type}`],
            imageAssets[`character-${type}-hover`]
        );
        this._characters.push(character);
        character.addTo(this._screen);

    }

    _moveCharacters(timestamp) {
        if (!this._lastUpdateAt)
            this._lastUpdateAt = timestamp;
        else {

            let timeElapsed = timestamp - this._lastUpdateAt;

            this._characters.filter(character => !character.dragging).forEach(character => {
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