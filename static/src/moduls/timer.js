'use strict';

//timer

import { zeroToTomeNumber } from "./utils";

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

        days.textContent = zeroToTomeNumber(timeInterval.days);           
        hours.textContent = zeroToTomeNumber(timeInterval.hours);
        minutes.textContent = zeroToTomeNumber(timeInterval.minutes);
        seconds.textContent = zeroToTomeNumber(timeInterval.seconds);

    }
}

export default setTimer;
