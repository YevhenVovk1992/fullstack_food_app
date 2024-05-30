'use strict';

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

export default createModalWindows;
export {openModal, closeModal}; 