/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./static/src/moduls/menu.js":
/*!***********************************!*\
  !*** ./static/src/moduls/menu.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MenuElement: () => (/* binding */ MenuElement)
/* harmony export */ });


// class

class MenuElement {
    constructor(img, altimg, title, descr, price, parent_selector, ...classes) {
        this.img = img;
        this.altimg = altimg;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.item_container = document.querySelector(parent_selector);
    }

    render() {
        let item = document.createElement('div');

        if (this.classes.length === 0) {
            item.classList.add('menu__item')
        } else {
            this.classes.forEach((className) => {
                item.classList.add(className)
            })
        }

        item.innerHTML = `                
                <img src=${this.img} alt=${this.altimg}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
        this.item_container.append(item);
    }
}




/***/ }),

/***/ "./static/src/moduls/modals.js":
/*!*************************************!*\
  !*** ./static/src/moduls/modals.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });


// modal windows

const modalWindow = document.querySelector('.modal'),
contactBottons = document.querySelectorAll('[data-modal]'),     
closeButton = document.querySelector('.modal__content'),   
contactUsTimer = setTimeout(openModal, 20000);

let doNotShowModal;

function openModal() {
    if (!doNotShowModal) {
        clearInterval(contactUsTimer);
        window.removeEventListener('scroll', scrollHendler);
    }  

    doNotShowModal = true;
    modalWindow.classList.add('showModal');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalWindow.classList.remove('showModal');
    document.body.style.overflow = '';
}

function scrollHendler (event) {
    const target = event.target;

    if (target && (document.documentElement.scrollTop + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
        openModal();
    }   
}

function createModalWindows() {
    contactBottons.forEach( (item) => {
        item.addEventListener('click', openModal)
    });
    
    modalWindow.addEventListener('click', (event) => { 
        const target = event.target;
    
        if ((target && target === modalWindow) || target.classList.contains('modal__close')) {            
            closeModal();
        }
    });
    
    window.addEventListener('keydown', (event) => {      
        if (event.target && event.code == 'Escape') {
            closeModal();
        }
    });
    
    window.addEventListener('scroll', scrollHendler);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createModalWindows);
 

/***/ }),

/***/ "./static/src/moduls/tabs.js":
/*!***********************************!*\
  !*** ./static/src/moduls/tabs.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


// tabs 

function tabs() {
    const tabsContent = document.querySelectorAll('.tabcontent'),
    tabs = document.querySelectorAll('.tabheader__item'),
    tabsParent = document.querySelector('.tabheader__items');


    function hideTab() {
    tabsContent.forEach((item) => {
        item.classList.add('hideTab');            
    });
    tabs.forEach((tab) => {
        tab.classList.remove('tabheader__item_active');
    });

    }

    function showTab(i = 0) {
    tabsContent[i].classList.remove('hideTab');
    tabs[i].classList.add('tabheader__item_active');
    }

    hideTab();
    showTab();

    tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
            if (item == target) {
                hideTab();
                showTab(i);
            }
        });
    }
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./static/src/moduls/timer.js":
/*!************************************!*\
  !*** ./static/src/moduls/timer.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./static/src/moduls/utils.js");


//timer



function timeToDeadline (time) {
    const nowDate = new Date(),
        total = Date.parse(time) - Date.parse(nowDate),
        days = Math.floor(total / 86400000),
        hours = Math.floor(total / (1000 * 60 * 60) % 24),
        minutes = Math.floor(total / (1000 * 60 ) % 60),
        seconds = Math.floor(total / 1000 % 60);
       
    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

function setTimer(endTime, cssSelector) {
    const timerBlock = document.querySelector(cssSelector),
        days = timerBlock.querySelector('#days'),
        hours = timerBlock.querySelector('#hours'),
        minutes = timerBlock.querySelector('#minutes'),
        seconds = timerBlock.querySelector('#seconds'),
        promotionTimer = setInterval(updateTimerInterval, 1000);
    
    updateTimerInterval();
    
    function updateTimerInterval () {
        const timeInterval = timeToDeadline(endTime);

        if (timeInterval && timeInterval.total < 0) {
            clearInterval(promotionTimer);               
        }

        days.textContent = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.zeroToTomeNumber)(timeInterval.days);           
        hours.textContent = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.zeroToTomeNumber)(timeInterval.hours);
        minutes.textContent = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.zeroToTomeNumber)(timeInterval.minutes);
        seconds.textContent = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.zeroToTomeNumber)(timeInterval.seconds);

    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setTimer);


/***/ }),

/***/ "./static/src/moduls/utils.js":
/*!************************************!*\
  !*** ./static/src/moduls/utils.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRequest: () => (/* binding */ getRequest),
/* harmony export */   zeroToTomeNumber: () => (/* binding */ zeroToTomeNumber)
/* harmony export */ });


function zeroToTomeNumber (numb) {
    if (0 < numb && numb < 10) {
        return `0${numb}`;
    }

    if (numb < 0) {
        return '00'
    }

    return numb;
}

async function getRequest(url) {
    const options = {
        method: 'GET',
        headers: {}      
        },
        request = await fetch(url, options);

    if (!request.ok) {
        throw new Error(`Error to connect to ${url} with ${request.status}`)
    }

    return await request.json();
    
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./static/src/script.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _moduls_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moduls/tabs */ "./static/src/moduls/tabs.js");
/* harmony import */ var _moduls_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moduls/utils */ "./static/src/moduls/utils.js");
/* harmony import */ var _moduls_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./moduls/timer */ "./static/src/moduls/timer.js");
/* harmony import */ var _moduls_modals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./moduls/modals */ "./static/src/moduls/modals.js");
/* harmony import */ var _moduls_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./moduls/menu */ "./static/src/moduls/menu.js");
 








const deadline = '2024-05-30',
    server_url = 'http://127.0.0.1:5000/';




async function postRequest(url, method, body) {
    const options = {
        method: method,
        headers: {'content-type': 'application/json; charset=utf8'}      
        };

    options.body = JSON.stringify(body);

    return await fetch(url, options);
}



window.addEventListener('DOMContentLoaded', () => {

    (0,_moduls_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_moduls_timer__WEBPACK_IMPORTED_MODULE_2__["default"])(deadline,'.promotion__timer');
    (0,_moduls_modals__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_moduls_utils__WEBPACK_IMPORTED_MODULE_1__.getRequest)(server_url + 'get_menu/')    
    .then((data) => {   
        let menuObj = JSON.parse(data).menu;
        
        menuObj.forEach(({img, altimg, title, descr, price}) => {
            new _moduls_menu__WEBPACK_IMPORTED_MODULE_4__.MenuElement(img, altimg, title, descr, price, '.menu .container').render();
        });
    });
    
    

    //Forms

    const forms = document.querySelectorAll('form');
        

    function postForm(form, url) {
        const statusForm = document.createElement('img'),
            statusFields = {
                loading: 'Загрузка',
                loadingSpinner: '/static/icons/spinner.svg',
                success: 'Успех',
                failure: 'Ошибка'
            };

        statusForm.src = statusFields.loadingSpinner; 
        statusForm.style.cssText = `
            display: block;
            margin: 0px auto;
        `;             
            
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const formData = new FormData(form),                
                data_object = {};          
                           
            formData.forEach(function(value, key) {
                data_object[key] = value;
            });           
            form.append(statusForm);            
            postRequest(url, 'POST', data_object)
                .then((response) => {
                    if (response.ok) {
                        showMessageModal(statusFields.success);
                        setTimeout(() => {
                            statusForm.remove();
                        }, 1000);
                        return response.json();
                    } else {
                        console.log(response.status);
                    }
                })
                .catch((error) => {
                    showMessageModal(statusFields.failure);
                    statusForm.remove();
                    console.log(error.message);
                })
                .finally(() => {
                    form.reset();    
                })
                .then((data) => {                   
                    console.log(data);
                });      
        });
    }

    function showMessageModal(message) {
        const prevModalWindow = document.querySelector('.modal__dialog'),
            messageModal = document.createElement('div');     

        (0,_moduls_modals__WEBPACK_IMPORTED_MODULE_3__.openModal)();
        messageModal.classList.add('modal__dialog');
        messageModal.innerHTML = `
            <div class="modal__content">            
                <div class="modal__close" data-modal="0">×</div>
                <div class="modal__title">${message}</div>
            </div>`;
        prevModalWindow.classList.add('hide');
        prevModalWindow.parentNode.append(messageModal);
        setTimeout(() => {
            (0,_moduls_modals__WEBPACK_IMPORTED_MODULE_3__.closeModal)();
            prevModalWindow.classList.remove('hide');
            messageModal.remove();
        }, 4000);
    }

    forms.forEach((form) => {
        postForm(form, server_url);
    });
    

    // Slider carousel


    const sliderWrapper = document.querySelector('.offer__slider-wrapper'),
        sliderInner = document.querySelector('.offer__slider-inner'),
        sliders = document.querySelectorAll('.offer__slide'),
        nextSlide = document.querySelector('.offer__slider-next'),
        prevSlide = document.querySelector('.offer__slider-prev'),
        totalSlides = document.querySelector('#total'),
        currentSlide = document.querySelector('#current'),
        sliderWidth = window.getComputedStyle(sliderWrapper).width,
        countSliders = sliders.length,
        sliderNavigator = document.createElement('ol'),
        dotsArray = [];

    let sliderIndex = 1,
        sliderWidthInNum = Number.parseInt(sliderWidth),
        sliderOffset = 0;

    sliderInner.style.width = 100 * countSliders + '%';
    sliders.forEach((slider) => {
        slider.style.width = sliderWidth;
    })  
    sliderInner.classList.add('carousel-inner');
    sliderWrapper.style.overflow = 'hidden';  
    sliderWrapper.style.position = 'relative';     
    totalSlides.textContent = `${(0,_moduls_utils__WEBPACK_IMPORTED_MODULE_1__.zeroToTomeNumber)(countSliders)}`; 
    currentSlide.textContent = `${(0,_moduls_utils__WEBPACK_IMPORTED_MODULE_1__.zeroToTomeNumber)(sliderIndex)}`;  
    
    for (let i = 0; i < countSliders; i++) {
        let dot = document.createElement('li');   
        
        if (i === 0) {
            dot.style.opacity = '1';
        } else {
            dot.style.opacity = '0.5';
        }
        
        dot.setAttribute('data-slick-to', i);
        dot.classList.add('dot');
        sliderNavigator.append(dot);
        dotsArray.push(dot);
    }

    sliderNavigator.classList.add('carousel-indicators');
    sliderWrapper.append(sliderNavigator);   

    function setDotOpacity(array, n) {
        array.forEach((dot, i) => {
            if (i === n) {
                dot.style.opacity = '1';
            } else {
                dot.style.opacity = '0.5';
            }
        })
    }

    function toNextSlide() { 
        sliderIndex += 1;     
        sliderOffset -= sliderWidthInNum;   

        if (sliderOffset <= (-sliderWidthInNum * countSliders)) {
            sliderOffset = 0;
            sliderIndex = 1;
        }

        sliderInner.style.transform = `translateX(${sliderOffset}px)`;
        currentSlide.textContent = `${(0,_moduls_utils__WEBPACK_IMPORTED_MODULE_1__.zeroToTomeNumber)(sliderIndex)}`;
        setDotOpacity(dotsArray, sliderIndex - 1);
    }

    function toPrevSlide() { 
        sliderIndex -= 1;       
        sliderOffset += sliderWidthInNum;  
        
        if (sliderOffset > 0) {
            sliderOffset = -sliderWidthInNum * (countSliders - 1);
            sliderIndex = countSliders;
        }
        
        sliderInner.style.transform = `translateX(${sliderOffset}px)`;
        currentSlide.textContent = `${(0,_moduls_utils__WEBPACK_IMPORTED_MODULE_1__.zeroToTomeNumber)(sliderIndex)}`;
        setDotOpacity(dotsArray, sliderIndex - 1);
    }

    nextSlide.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target === nextSlide) {
            toNextSlide();
        }
    }); 

    prevSlide.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target === prevSlide) {
            toPrevSlide();
        }
    }); 

        
    // Calculator


    let sex, height, weight, age, activity;

    function calculateCalorieNeeds (sex, height, weight, age, activity, selector) {
        const calculatingResult = document.querySelector(selector);

        let result;

        if (!age || !height || !sex || !weight || !activity) {
            calculatingResult.textContent = '----';
            return;
        }                
        
        if (sex === 'man') {
            result = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity);
        } else {
            result = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity);
        }
        calculatingResult.textContent = result;            
    }

    function getStaticChooses (id, activeClass) {
        const elements = document.querySelectorAll(`${id} div`),
            sexSet = new Set(['man', 'women']);

        document.querySelector(id).addEventListener('click', (event) => {   
            const target = event.target;

            if (target.getAttribute('id') === id.slice(1)) {
                return;
            }
            
            if (sexSet.has(target.getAttribute('id'))) {                
                sex = target.id;  
            } 
            
            if (target.getAttribute('data-ratio')) {
                activity = target.getAttribute('data-ratio');  
            }          

            elements.forEach((item => {
                item.classList.remove(activeClass);
            }));
            target.classList.add(activeClass);
            calculateCalorieNeeds(sex, height, weight, age, activity, '.calculating__result span');
        }); 
    }

    function getInputData (parent_selector) {
        const inputParent = document.querySelector(parent_selector);

        inputParent.addEventListener('change', (event) => {
            const target = event.target;          

            switch (target.getAttribute('id')) {
                case 'age': 
                    age = +target.value;
                    break;
                case 'height': 
                    height = +target.value;
                    break;
                case 'weight': 
                    weight = +target.value;
                    break;
            } 
            
            calculateCalorieNeeds(sex, height, weight, age, activity, '.calculating__result span'); 
        });   
    }
  
    getStaticChooses('#gender', 'calculating__choose-item_active');
    getStaticChooses('#active', 'calculating__choose-item_active');
    getInputData('.calculating__choose_medium'); 
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map