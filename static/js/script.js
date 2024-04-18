'use strict'; 


const deadline = '2024-04-04',
    server_url = 'http://127.0.0.1:5000/';

function zeroToTomeNumber (numb) {
    if (0 < numb && numb < 10) {
        return `0${numb}`;
    }

    if (numb < 0) {
        return '00'
    }

    return numb;
}

window.addEventListener('DOMContentLoaded', () => {

    // tabs 
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

            days.textContent = zeroToTomeNumber(timeInterval.days);           
            hours.textContent = zeroToTomeNumber(timeInterval.hours);
            minutes.textContent = zeroToTomeNumber(timeInterval.minutes);
            seconds.textContent = zeroToTomeNumber(timeInterval.seconds);

        }
    }

    setTimer(deadline,'.promotion__timer');

    // modal windows

    const modalWindow = document.querySelector('.modal'),
        contactBottons = document.querySelectorAll('[data-modal]'),        
        contactUsTimer = setTimeout(openCloseContactUs, 20000);

    let doNotShowModal;

    function openCloseContactUs () { 
        if (!doNotShowModal) {
            clearInterval(contactUsTimer);
            window.removeEventListener('scroll', scrollHendler);
        }  
        
        doNotShowModal = true;
        modalWindow.classList.toggle('showModal');

        (document.body.style.overflow == 'hidden') ? document.body.style.overflow = '' : document.body.style.overflow = 'hidden'
    }

    function scrollHendler (event) {
        const target = event.target;

        if (target && (document.documentElement.scrollTop + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
            openCloseContactUs();
        }   
    }
    
    contactBottons.forEach( (item) => {
        item.addEventListener('click', openCloseContactUs)
    });

    modalWindow.addEventListener('click', (event) => { 
        const target = event.target;

        if (target && target.classList.contains('showModal')) {            
            openCloseContactUs();
        }
    });

    window.addEventListener('keydown', (event) => {      
        if (event.target && event.code == 'Escape') {
            openCloseContactUs();
        }
    });
    
    window.addEventListener('scroll', scrollHendler);


    // class

    class MenuElement {
        constructor(src, alt, subtitle, desription, price, parent_selector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.desription = desription;
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
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                    <div class="menu__item-descr">${this.desription}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>`;
            this.item_container.append(item);
        }
    }

    const menuCard1 = new MenuElement(
        "/static/img/tabs/vegy.jpg",
        "vegy", 
        'Меню "Фитнес"', 
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. 
        Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`, 
        229,
        '.menu .container',
        'menu__item', 
        'big'
        ),
        
        menuCard2 = new MenuElement(
            "/static/img/tabs/post.jpg",
            "post",
            'Меню "Постное"',
            `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, 
            молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. `,
            430,
            '.menu .container'
        ),

        menuCard3 = new MenuElement(
            "/static/img/tabs/post.jpg",
            "post",
            'Меню "Постное"',
            `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, 
            молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. `,
            430,
            '.menu .container'
        );

    menuCard1.render();
    menuCard2.render();
    menuCard3.render();

    //Forms

    const forms = document.querySelectorAll('form');
        

    function postForm(form, url) {
        const statusForm = document.createElement('div'),
            statusFields = {
                loading: 'Загрузка',
                success: 'Успех',
                failure: 'Ошибка'
            };
            
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const formData = new FormData(form),
                data_object = {},
                request = new XMLHttpRequest;

            statusForm.classList.add('status');
            statusForm.textContent = statusFields.loading;
            form.append(statusForm);

            request.open('POST', url);
            request.setRequestHeader('Content-type', 'application/json');
            formData.forEach(function(key, value) {
                data_object[key] = value;
            });
            request.send(JSON.stringify(data_object));
            request.addEventListener('load', (event) => {
                if (request.status == 200) {
                    form.reset();
                    statusForm.textContent = statusFields.success;
                    console.log(request.response);
                    setTimeout(() => {
                        statusForm.remove();
                    }, 3000)
                } else {
                    statusForm.textContent = statusFields.failure;
                    console.log('error sending');
                }
            });
        });
    }

    forms.forEach((form) => {
        postForm(form, server_url);
    });

});