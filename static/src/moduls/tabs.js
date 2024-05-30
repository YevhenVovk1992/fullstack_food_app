'use strict';

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

export default tabs;
