'use strict';

import { postRequest } from "./utils";
import { closeModal, openModal } from "./modals"

//Forms
        
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

    openModal();
    messageModal.classList.add('modal__dialog');
    messageModal.innerHTML = `
        <div class="modal__content">            
            <div class="modal__close" data-modal="0">×</div>
            <div class="modal__title">${message}</div>
        </div>`;
    prevModalWindow.classList.add('hide');
    prevModalWindow.parentNode.append(messageModal);
    setTimeout(() => {
        closeModal();
        prevModalWindow.classList.remove('hide');
        messageModal.remove();
    }, 4000);
}

export default postForm;
