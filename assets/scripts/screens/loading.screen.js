class LoadingScreen {
    constructor(container) {
        this._container = container;
        this._container.innerHTML = `
                <div id="loading-screen">
                    <div id="progress-bar">
                        <div id="progress"></div>
                    </div>
                    <div id="loading-label"><span id="percentage"></span>% Loading...</div>
                </div>
            `;

        this._progressEl = this._container.querySelector('#progress');
        this._percentageEl = this._container.querySelector('#percentage');
    }

    updateProgress(progress) {
        let percentage = progress * 100;
        this._progressEl.style.width = `${percentage}%`;
        this._percentageEl.textContent = Math.floor(percentage);
    }

    hide() {
        this._container.style.opacity = '0';
    }

    waitAndHide() {
        setTimeout(() => {
            this.hide();
        }, 400);
    }
}