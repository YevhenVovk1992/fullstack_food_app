'use strict'; 

import tabs from "./moduls/tabs";
import { getRequest } from "./moduls/utils";
import setTimer from "./moduls/timer";
import createModalWindows from "./moduls/modals";
import { MenuElement } from "./moduls/menu";
import initCarousel from "./moduls/slider_carousel";
import { getInputData, getStaticChooses } from "./moduls/calculator";
import postForm from "./moduls/forms";

const deadline = '2024-05-30',
    server_url = 'http://127.0.0.1:5000/',
    forms = document.querySelectorAll('form');

window.addEventListener('DOMContentLoaded', () => {    
    getRequest(server_url + 'get_menu/')    
    .then((data) => {   
        let menuObj = JSON.parse(data).menu;
        
        menuObj.forEach(({img, altimg, title, descr, price}) => {
            new MenuElement(img, altimg, title, descr, price, '.menu .container').render();
        });
    });
    tabs();
    initCarousel();
    setTimer(deadline,'.promotion__timer');
    createModalWindows();
    getStaticChooses('#gender', 'calculating__choose-item_active');
    getStaticChooses('#active', 'calculating__choose-item_active');
    getInputData('.calculating__choose_medium');    
    forms.forEach((form) => {
        postForm(form, server_url);
    });   
});

