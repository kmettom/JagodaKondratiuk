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
  setTimeout(()=>{
    pageEnterAnimation();
    updateSectionPositions();
  }, 500);
  cursorInit();
  projectsHoverInstance.init();
  footerGoToTopBtnListen();
  scrollToContact();
};


/*************************** */
// Page enter animation
/*************************** */

const scrollToContact = () => {
  const $contactScrollBtn = document.getElementById('contactScroll');
  $contactScrollBtn.addEventListener('click' , (event) => {
    event.preventDefault();
    scrollInstance.scrollToBottomSlow = 1; //slow version

  })

}

/*************************** */
// Page enter animation
/*************************** */

const pageEnterAnimation = () => {
  document.getElementById('firstAnimationOverlay').classList.add('hide');
  setTimeout(()=>{
    document.getElementById('headerInfo').classList.add('activate');
    document.getElementById('headerText').classList.add('activate');
  }, 750);
  setTimeout(()=>{
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
  headerSection = {
    top: headerSectionEl.offsetTop ,
    height: headerSectionEl.offsetHeight
   };
  aboutInfoSection = {
     top: aboutInfoSectionEl.offsetTop ,
     height: aboutInfoSectionEl.offsetHeight,
     changePosition:  aboutInfoSectionEl.offsetTop + aboutInfoSectionEl.offsetHeight / 4
   };
   meFotoSection = {
     top: meFotoSectiolEl.offsetTop ,
     height: meFotoSectiolEl.offsetHeight ,
     changePosition:  meFotoSectiolEl.offsetTop + meFotoSectiolEl.offsetHeight / 2
   };
  footerSection = {
    top: footerSectionEl.offsetTop ,
    height: footerSectionEl.offsetHeight,
  }
};

window.onresize = function(event) {
    updateSectionPositions();
    scrollInstance.max_scroll_update = window.innerHeight;
};

/*************************** */
// Scroll interactions - CALLED FROM SCROLL CLASS -> requestAnimationFrame
/*************************** */

let scrollPos = scrollInstance.Y_pos;
const minScrollChange = 3;
const sectionsAnimateOnScroll = () => {

  if(projectsHoverInstance.hoverActive){
    if(scrollPos - minScrollChange > scrollInstance.Y_pos ||  scrollPos + minScrollChange < scrollInstance.Y_pos){
      projectsHoverInstance.resetOnScroll = true;
    }
  }

  if(scrollPos == scrollInstance.Y_pos) return;
    scrollPos = scrollInstance.Y_pos;

    if(!sectionsToActivate[sectionsToActivate.length - 1].classList.contains('activaded')){
      activateNextSection(scrollPos); // activate sections with class, to animate in elements
    }

    if(scrollPos + window.innerHeight  >  headerSection.top && scrollPos < headerSection.top + headerSection.height  ){
      headerTextMove(scrollPos); // header move lines in oposite way, different speeds
    }
    if(scrollPos + window.innerHeight > meFotoSection.top && scrollPos < meFotoSection.top + meFotoSection.height ){
      meFotoParallax(scrollPos); // me-photo section foto parallax
    }
    if( scrollPos + window.innerHeight > aboutInfoSection.top && scrollPos < aboutInfoSection.top + aboutInfoSection.height ){
      aboutInfoAni(scrollPos); // about me section - animate color change and sticky year headline
    }
    if(scrollPos + window.innerHeight  >  footerSection.top ){
      footerAnimateIn(scrollPos); // animate in the footer on scroll
    }


}

// let sectionsToActivate;
const sectionsToActivate = document.getElementsByClassName('section-activate');
let activeSectionIndex;
const activateNextSection = (_scrollPos) => {
  for (var i = 0; i < sectionsToActivate.length; i++) {
    if(_scrollPos + window.innerHeight  >   sectionsToActivate[i].offsetTop + window.innerHeight / 4 ){
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
    let moveFooterCoef =  -1*( footerSection.top - _scrollPos - window.innerHeight ) + 2; // +2 to avoid white line on the bottom
    footerSectionEl.style.height = moveFooterCoef +'px' ;
};

const footerGoToTopBtnListen = () => {
  const $goToTop = document.getElementById('scrollToTopTrigger')
  $goToTop.addEventListener('click' , () => {
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
// Zmiana koloru portfolio
/*************************** */

const  changeToLigth = () => {
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
const aboutInfoSectionEl =  document.querySelector("#aboutInfo");
const aboutInfoYear =  document.querySelector("#aboutInfoYear");
let yearPositionCoef;

const updateStickyHeaderPosition = () => {
  aboutInfoYear.style.transform = 'translate(0px, '+yearPositionCoef + 'px)';
}

let scrollPosBackup;
const aboutInfoAni = function (_scrollPos) {
  if(_scrollPos > aboutInfoSection.top && window.innerWidth > 768){
    let scrollSize = _scrollPos - scrollPosBackup;

    if(Math.abs(scrollSize) <= 1 ){
      aboutInfoYear.style.transition = 'linear all 0.1s';
    } else {
      aboutInfoYear.style.transition = 'linear all 0s';
    }

    scrollPosBackup = _scrollPos;
    yearPositionCoef = _scrollPos - aboutInfoSection.top;
    if(yearPositionCoef > aboutInfoSection.height - aboutInfoYear.offsetHeight) yearPositionCoef = aboutInfoSection.height - aboutInfoYear.offsetHeight;
    requestAnimationFrame(updateStickyHeaderPosition);
    // aboutInfoYear.style.transform = 'translate(0px, '+yearPositionCoef + 'px)';
  }

  if (aboutInfoSection.changePosition < _scrollPos && currentColorTheme == 'dark') {
    requestAnimationFrame( changeToLigth );
    // document.querySelector("body").classList.add("ligth");
    // cursorInstance.setBGColor('blue');
    // currentColorTheme = 'ligth';

  } else if(aboutInfoSection.changePosition > _scrollPos && currentColorTheme == 'ligth'){
    requestAnimationFrame( changeToDark );
    // document.querySelector("body").classList.remove("ligth");
    // cursorInstance.setBGColor('white');
    // currentColorTheme = 'dark';
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
  setHoversOnLoad(){

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
      borderColor: "#282f40",
      background: "#e2e2e2",
      mixBlendMode:  getUserAgent.isFirefox ? "difference" : "screen",
      scale: 1.6,
    });
    this.cursor.over(".howerki", {
      borderColor: getUserAgent.isFirefox ? '#e2e2e2' : '#282f40',
      mixBlendMode: getUserAgent.isFirefox ? "difference" : "screen",
      background: getUserAgent.isFirefox ? '#e2e2e2' : '#282f40',
      scale: 1.6,
    });
    this.cursor.over(".tomas-link", {
      borderColor: getUserAgent.isFirefox ? '#e2e2e2' : '#282f40',
      mixBlendMode: getUserAgent.isFirefox ? "difference" : "screen",
      background: getUserAgent.isFirefox ? '#e2e2e2' : '#282f40' ,
    });

    // this.cursor.over(".awwards-ribbon", {
    //   borderColor: getUserAgent.isFirefox ? '#282f40' : '#282f40',
    //   mixBlendMode: getUserAgent.isFirefox ? "initial" : "initial",
    //   background: getUserAgent.isFirefox ? '#282f40' : '#282f40' ,
    //   scale: 1.2,
    //
    // });

    this.setBGColor('white');

  }
  setBGColor(_color){ // options -> blue #282f40, white #e2e2e2
    let newBgColor = _color == 'white' ? '#e2e2e2' : '#282f40';
    this.cursor.updateBgColor(newBgColor);
    this.cursor.over(".vi-link", {
      borderColor: newBgColor,
      background: _color != 'white' ? '#282f40' : '#e2e2e2',
      mixBlendMode:  _color == 'white' ? "difference" : getUserAgent.isFirefox ? "difference" : "screen",
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
