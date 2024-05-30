'use strict';

// class

export class MenuElement {
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


