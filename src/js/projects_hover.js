class ProjectsHover {
    constructor() {
        this.imgDefault = {
            top: window.innerWidth < 1280 ? -200 : -270,
            left: window.innerWidth < 1280 ? window.innerWidth / 2.7 : window.innerWidth / 2.2,
        }
        this.imgMoveCoef = {top: 0, left: 0};
        this.hoverActive = false;
        this.$projectTriggers = document.getElementsByClassName('project-hover-trigger');
        this.$projectImgHolders = document.getElementsByClassName('hover-imgs-holder');
    }

    set resetOnScroll(_reset) {
        for (var i = 0; i < this.$projectImgHolders.length; i++) {
            this.$projectImgHolders[i].classList.remove('active');
        }
        this.hoverActive = false;
    }

    imgPositionSet(_img, _event) {
        this.imgMoveCoef.top += _event.movementY / 7;
        this.imgMoveCoef.left += _event.movementX / 7;

        const transformCoefX = this.imgMoveCoef.left / 40;
        const transformCoefY = 0;

        _img.style.transform = 'perspective(600px) rotate( ' + transformCoefX + 'deg) skew(' + transformCoefY + 'deg, ' + transformCoefX + 'deg)';

        _img.style.top = this.imgDefault.top + this.imgMoveCoef.top + 'px';
        _img.style.left = this.imgDefault.left + this.imgMoveCoef.left + 'px';
    }

    resetImgMoveCoef() {
        setTimeout(() => { // to wait for the animation out
            this.imgMoveCoef.top = 0;
            this.imgMoveCoef.left = 0;
        }, 50)
    }

    activateImgHolder(_imgHolder, _projectName) {
        if (!_imgHolder || !_projectName) return;
        const _this = this;
        document.addEventListener("mousemove", function moveImgInit(event) {
            _this.hoverActive = true;
            let imgToMove = _imgHolder.children[0];
            _imgHolder.classList.add('active');
            _this.imgPositionSet(imgToMove, event)
            if (!event.target.getAttribute('data-project') || event.target.getAttribute('data-project') != _projectName) {
                _this.hoverActive = false;
                _imgHolder.classList.remove('active');
                document.removeEventListener("mousemove", moveImgInit);
            }
        });
    }

    activeProjectHolderReturn(_project) {
        let currentProject;
        for (var i = 0; i < this.$projectImgHolders.length; i++) {
            if (this.$projectImgHolders[i].getAttribute('data-project') == _project) {
                currentProject = this.$projectImgHolders[i]
            }
        }
        return currentProject
    }

    init() {
        for (var i = 0; i < this.$projectTriggers.length; i++) {
            this.$projectTriggers[i].addEventListener('mouseover', (event) => {
                let projectName = event.srcElement.getAttribute('data-project');
                this.activateImgHolder(this.activeProjectHolderReturn(projectName), projectName)
            })
        }
        for (var i = 0; i < this.$projectTriggers.length; i++) {
            this.$projectTriggers[i].addEventListener('mouseleave', (event) => {
                this.activateImgHolder(false, false)
                this.resetImgMoveCoef();
            })
        }
    }
}

export {ProjectsHover}
