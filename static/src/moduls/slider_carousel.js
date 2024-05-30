'use strict'; 

import { zeroToTomeNumber } from "./utils";

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
totalSlides.textContent = `${zeroToTomeNumber(countSliders)}`; 
currentSlide.textContent = `${zeroToTomeNumber(sliderIndex)}`;  

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
    currentSlide.textContent = `${zeroToTomeNumber(sliderIndex)}`;
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
    currentSlide.textContent = `${zeroToTomeNumber(sliderIndex)}`;
    setDotOpacity(dotsArray, sliderIndex - 1);
}

function initCarousel() {
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
}

export default initCarousel;
