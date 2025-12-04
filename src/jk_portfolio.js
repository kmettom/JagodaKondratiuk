import styles from './scss/main.scss';
import cursorDot from './js/cursor.js';
import {Scroll} from './js/scroll.js';
import {ProjectsHover} from './js/projects_hover.js';

import {getUserAgent} from './js/useragent.js';


let projectsHoverInstance = new ProjectsHover;
let scrollInstance = new Scroll;

/*************************** */
// INIT
/*************************** */

const init = function () {
    setTimeout(() => {
        pageEnterAnimation();
        updateSectionPositions();
        setYear();
    }, 500);
    cursorInit();
    projectsHoverInstance.init();
    footerGoToTopBtnListen();
    scrollToContact();
    projectPageNavItemsListen();
    projectPageScreenLockInit();
};

const darkColor = '#333232';
const lightColor = '#E9E9DF';


/*************************** */
// Copyright Date Set
/*************************** */

const setYear = () => {
    const date = new Date();
    const $setYear = document.getElementsByClassName('setYear');
    for (let i = 0; i < $setYear.length; i++) {
        $setYear[i].innerHTML = date.getFullYear();
    }
}


/*************************** */
// Page enter animation
/*************************** */

const scrollToContact = () => {
    const $contactScrollBtn = document.getElementById('contactScroll');
    if (!$contactScrollBtn) return
    $contactScrollBtn.addEventListener('click', (event) => {
        event.preventDefault();
        scrollInstance.scrollToBottomSlow = 1; //slow version

    })

}

/*************************** */
// Page enter animation
/*************************** */

const pageEnterAnimation = () => {
    document.getElementById('firstAnimationOverlay').classList.add('hide');
    setTimeout(() => {
        document.getElementById('headerInfo').classList.add('activate');
        document.getElementById('headerText').classList.add('activate');
    }, 750);
    setTimeout(() => {
        scrollInstance.init(sectionsAnimateOnScroll);
    }, 1500);
};

/*************************** */
// load positions of sections and update them on window resize
/*************************** */

let headerSection;
let aboutInfoSection;
let meFotoSection;
let footerSection;
const updateSectionPositions = () => {
    if (headerSectionEl) {
        const headerSectionElRect = headerSectionEl.getBoundingClientRect()
        headerSection = {
            top: headerSectionElRect.top,
            height: headerSectionElRect.height
        };
    }
    if (aboutInfoSectionEl) {
        const aboutInfoSectionElRect = aboutInfoSectionEl.getBoundingClientRect()
        const isProjectPage = aboutInfoSectionEl.classList.contains('project-content-wrapper');
        aboutInfoSection = {
            top: aboutInfoSectionElRect.top,
            height: aboutInfoSectionElRect.height,
            isProjectPage: isProjectPage,
            changePosition: isProjectPage ? aboutInfoSectionElRect.top : aboutInfoSectionElRect.top + aboutInfoSectionElRect.height / 4
        };
    }
    if (meFotoSectiolEl) {
        const meFotoSectiolElRect = meFotoSectiolEl.getBoundingClientRect()
        meFotoSection = {
            top: meFotoSectiolElRect.top,
            height: meFotoSectiolElRect.height,
            changePosition: meFotoSectiolElRect.top + meFotoSectiolElRect.height / 2
        };
    }
    if (footerSectionEl) {
        const footerSectionElRect = footerSectionEl.getBoundingClientRect()
        footerSection = {
            top: footerSectionElRect.top,
            height: footerSectionElRect.height,
        }
    }
};

window.onresize = function (event) {
    updateSectionPositions();
    scrollInstance.max_scroll_update = window.innerHeight;
};

/*************************** */
// Scroll interactions - CALLED FROM SCROLL CLASS -> requestAnimationFrame
/*************************** */

let scrollPos = scrollInstance.Y_pos;
const minScrollChange = 3;
const sectionsAnimateOnScroll = () => {

    if (projectsHoverInstance.hoverActive) {
        if (scrollPos - minScrollChange > scrollInstance.Y_pos || scrollPos + minScrollChange < scrollInstance.Y_pos) {
            projectsHoverInstance.resetOnScroll = true;
        }
    }

    if (scrollPos == scrollInstance.Y_pos) return;
    scrollPos = scrollInstance.Y_pos;

    if (!sectionsToActivate[sectionsToActivate.length - 1].classList.contains('activaded')) {
        activateNextSection(scrollPos); // activate sections with class, to animate in elements
    }
    if (headerSection) {
        if (scrollPos + window.innerHeight > headerSection.top && scrollPos < headerSection.top + headerSection.height) {
            headerTextMove(scrollPos); // header move lines in opposite way, different speeds
        }
    }
    if (meFotoSection) {
        if (scrollPos + window.innerHeight > meFotoSection.top && scrollPos < meFotoSection.top + meFotoSection.height) {
            meFotoParallax(scrollPos); // me-photo section foto parallax
        }
    }
    if (aboutInfoSection) {
        if (scrollPos + window.innerHeight > aboutInfoSection.top && scrollPos < aboutInfoSection.top + aboutInfoSection.height) {
            aboutInfoAni(scrollPos); // about me section - animate color change and sticky year headline
            if (projectPageNavItems && projectPageNavItems.length > 0) {
                projectPageNavigationTrack(scrollPos);
            }
        }
    }
    if (footerSection) {
        if (scrollPos + window.innerHeight > footerSection.top) {
            footerAnimateIn(scrollPos); // animate in the footer on scroll
        }
    }
}

// let sectionsToActivate;
const sectionsToActivate = document.getElementsByClassName('section-activate');
let activeSectionIndex;
const activateNextSection = (_scrollPos) => {
    for (var i = 0; i < sectionsToActivate.length; i++) {
        if (_scrollPos + window.innerHeight > sectionsToActivate[i].offsetTop + window.innerHeight / 4) {
            sectionsToActivate[i].classList.add('activaded');
            // activeSectionIndex = i;
            // requestAnimationFrame( addClassToSection );
        }
    }
};

// const addClassToSection = () => {
//   sectionsToActivate[activeSectionIndex].classList.add('activaded');
// };

/*************************** */
// FOOTER animate in
/*************************** */

const footerSectionEl = document.getElementById('footerParallax');
const footerAnimateIn = (_scrollPos) => {
    let moveFooterCoef = -1 * (footerSection.top - _scrollPos - window.innerHeight) + 2; // +2 to avoid white line on the bottom
    footerSectionEl.style.height = moveFooterCoef + 'px';
};

const footerGoToTopBtnListen = () => {
    const $goToTop = document.getElementById('scrollToTopTrigger')
    $goToTop.addEventListener('click', () => {
        scrollInstance.scrollToTopSlow = 0; //slow version
        // scrollInstance.Y_dest_update = 0; //fast version
    });
};

/*************************** */
// HEADLINE text move to side
/*************************** */

const headerLines = document.getElementsByClassName('header-line-group');
const headerSectionEl = document.getElementById('headerText');
const headerTextMove = (_scrollPos) => {
    let moveCoeficient = _scrollPos / 10;
    for (var i = 0; i < headerLines.length; i++) {
        let move = headerLines[i].getAttribute('data-direction') == 'left' ? -moveCoeficient : moveCoeficient;
        move = move * headerLines[i].getAttribute('data-movecoef');
        headerLines[i].style.transform = 'translate(' + move + 'px , 0px)';
    }
}


/*************************** */
// Portfolio menu tracking and scroll
/*************************** */

const projectPageNavItems = document.querySelectorAll(".jk-nav-track");
const projectPageNavSections = document.querySelectorAll(".jk-section-track");
let currentActiveIndex = null;
const activeMarginTop = 50
const projectPageNavigationTrack = (_scrollPos) => {
    for (let i = 0; i < projectPageNavSections.length; i++) {
        if (projectPageNavSections[i].getBoundingClientRect().top < activeMarginTop && projectPageNavSections[i].getBoundingClientRect().bottom > activeMarginTop) {
            if (currentActiveIndex !== i) {
                currentActiveIndex = i;
                projectPageNavItems[i].classList.add('active')
            }
        } else {
            projectPageNavItems[i].classList.remove('active')
        }
    }
}

const projectPageNavItemsListen = () => {
    if (projectPageNavItems && projectPageNavItems.length > 0) {
        for (let i = 0; i < projectPageNavItems.length; i++) {
            projectPageNavItems[i].addEventListener('click', (event) => {
                const destination = projectPageNavSections[i].offsetTop;
                scrollInstance.Y_dest_update = destination;
            })
        }
    }
}

const projectUnlock = (content) => {
    console.log("projectUnlock")
    const screenLock = document.querySelector('#screenLock');
    screenLock.style.display = 'none';
    // const lockContentWrapperEl = document.querySelector('#lockContentWrapper');
    // lockContentWrapperEl.appendChild(content);
    const lockContentEl = document.querySelector('#lockContent');

    // lockContentEl.style.display = 'block';
    // lockContentEl.style.visibility = 'initial';
    // init();

}

const projectPageScreenLockInit = () => {
    const screenLockPassSubmit = document.querySelector('#screenLockPassSubmit');
    const screenLockInput = document.querySelector('#screenLockInput');
    const lockContentEl = document.querySelector('#lockContent');

    if (screenLockPassSubmit && lockContentEl) {
        // lockContentEl.style.display = 'none';
        // lockContentEl.style.visibility = 'none';

        screenLockPassSubmit.addEventListener('click', (event) => {
            // if (screenLockInput.value === 'x') {
            //     projectUnlock(lockContentEl);
            // }
            projectUnlock(lockContentEl);
        })
    }
}

/*************************** */
// Zmiana koloru portfolio
/*************************** */

const changeToLigth = () => {
    document.querySelector("body").classList.add("ligth");
    cursorInstance.setBGColor('blue');
    currentColorTheme = 'ligth';
};

const changeToDark = () => {
    document.querySelector("body").classList.remove("ligth");
    cursorInstance.setBGColor('white');
    currentColorTheme = 'dark';
};


let currentColorTheme = 'dark';
const aboutInfoSectionEl = document.querySelector("#aboutInfo");
const aboutInfoYear = document.querySelector("#aboutInfoYear");
let yearPositionCoef;

const updateStickyHeaderPosition = () => {
    aboutInfoYear.style.transform = 'translate(0px, ' + yearPositionCoef + 'px)';
}

let scrollPosBackup;
const aboutInfoAni = function (_scrollPos) {

    if (_scrollPos > aboutInfoSection.top && window.innerWidth > 768) {
        let scrollSize = _scrollPos - scrollPosBackup;

        if (Math.abs(scrollSize) <= 1) {
            aboutInfoYear.style.transition = 'linear all 0.1s';
        } else {
            aboutInfoYear.style.transition = 'linear all 0s';
        }

        scrollPosBackup = _scrollPos;
        yearPositionCoef = _scrollPos - aboutInfoSection.top;
        if (yearPositionCoef > aboutInfoSection.height - aboutInfoYear.offsetHeight) yearPositionCoef = aboutInfoSection.height - aboutInfoYear.offsetHeight;
        requestAnimationFrame(updateStickyHeaderPosition);
        // aboutInfoYear.style.transform = 'translate(0px, '+yearPositionCoef + 'px)';
    }

    if (aboutInfoSection.changePosition < _scrollPos && currentColorTheme == 'dark') {
        requestAnimationFrame(changeToLigth);

    } else if (aboutInfoSection.changePosition > _scrollPos && currentColorTheme == 'ligth') {
        requestAnimationFrame(changeToDark);
    }

};

/*************************** */
// meFotoParallax foty .me-photo
/*************************** */

const fotoEl = document.querySelector(".me-photo img");
const meFotoSectiolEl = document.querySelector(".main-intro");
const meFotoParallax = function (_scrollPos) {
    let scrollowanko = _scrollPos + window.innerHeight / 2;
    let paraxik = (scrollowanko - meFotoSection.changePosition) / 30;
    fotoEl.style.top = -120 + paraxik + "%";
};

/*************************** */

// Cursor
/*************************** */
class Cursor {
    constructor() {
        this.cursor = cursorDot({
            easing: 4,
            diameter: 50,
            borderWidth: 1,
            borderColor: "#e2e2e2",
            background: "transparent",
        });
    }

    setHoversOnLoad() {

        this.cursor.over("#footerParallax", {
            borderColor: "#e2e2e2",
        });
        this.cursor.over("#scrollToTopTrigger", {
            borderColor: "#e2e2e2",
            background: "#e2e2e2",
            mixBlendMode: "difference",
            scale: 1.6,
        });
        this.cursor.over(".vi-link", {
            borderColor: darkColor,
            background: "#e2e2e2",
            mixBlendMode: getUserAgent.isFirefox ? "difference" : "screen",
            scale: 1.6,
        });
        this.cursor.over(".howerki", {
            borderColor: getUserAgent.isFirefox ? '#e2e2e2' : darkColor,
            mixBlendMode: getUserAgent.isFirefox ? "difference" : "screen",
            background: getUserAgent.isFirefox ? lightColor : darkColor,
            scale: 1.6,
        });
        this.cursor.over(".tomas-link", {
            borderColor: getUserAgent.isFirefox ? lightColor : darkColor,
            mixBlendMode: getUserAgent.isFirefox ? "difference" : "screen",
            background: getUserAgent.isFirefox ? lightColor : darkColor,
        });

        // this.cursor.over(".awwards-ribbon", {
        //   borderColor: getUserAgent.isFirefox ? darkColor : darkColor,
        //   mixBlendMode: getUserAgent.isFirefox ? "initial" : "initial",
        //   background: getUserAgent.isFirefox ? darkColor : darkColor ,
        //   scale: 1.2,
        //
        // });

        this.setBGColor('white');

    }

    setBGColor(_color) { // options -> blue darkColor, white #e2e2e2
        let newBgColor = _color == 'white' ? lightColor : darkColor;
        this.cursor.updateBgColor(newBgColor);
        this.cursor.over(".vi-link", {
            borderColor: newBgColor,
            background: _color != 'white' ? darkColor : lightColor,
            mixBlendMode: _color == 'white' ? "difference" : getUserAgent.isFirefox ? "difference" : "screen",
            scale: 1.6,
        });
    }
};

var cursorInstance;
var cursorInit = function () {
    cursorInstance = new Cursor();
    cursorInstance.setHoversOnLoad();
};

/*************************** */
// DOCUMENT LOADED -> INIT
/*************************** */

document.addEventListener("DOMContentLoaded", function (event) {
    init();
});


//TODO MAIN PAGE
// 1- Project thumbs refactor style and layout - 8
// 1- Header navigation layout and functionality - anchor to contact - 4

//TODO PROJECT PAGE - MOIIZO
// 1- Password for case study - 8


// - Moiizo RWD - 4
// - Moiizo animations adjust with conditions - 4


// - Side menu active tabs - add anchors to sections - 2 - DONE
// - Side menu - on Click scroll to functionality - 4 - DONE
// - Moiizo layout style finish - 4 - DONE


//TODO PROJECT PAGE - OTHER (2 projects)
// - COPY Moiizo file and adjust the project content - 4

//TODO NICE TO HAVE - About and Projects navigation menu tabs with scroll anchors
// - Header navigation layout and functions - MVP - no About and Projects - 2



