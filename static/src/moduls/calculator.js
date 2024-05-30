'use strict'; 
    
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

    export {getInputData, getStaticChooses};