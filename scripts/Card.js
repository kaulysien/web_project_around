import { modal, modalImg } from "./utils.js";

export default class Card {
    constructor(title, imageLink, templateSelector) {
      this.title = title;
      this.imageLink = imageLink;
      this.templateSelector = templateSelector;     
    }

    _getTemplate() {
      const template = document.querySelector(this.templateSelector);
      const newCard = template.content.cloneNode(true);
      const titleCard = newCard.querySelector('.main__title');
      const imageCard = newCard.querySelector('.main__images');
  
      titleCard.textContent = this.title;
      imageCard.src = this.imageLink;
      imageCard.alt = this.title;
      return newCard;
    }

    _like(event) {
      if (event.target.src.endsWith("corazon-negro.svg")) {
        event.target.src = "./images/icono-corazon.svg";
      } else {
        event.target.src = "./images/corazon-negro.svg";
      }
    }
  
    _eliminate(event) {
      const card = event.target.closest(".main__element");
      if (card) {
        card.remove();
      }
    }
  
    _openModal() {
      
      modal.classList.toggle("modal_show");
      modalImg.src = this.imageLink;
      const imageNameElement = document.querySelector(".modal__image-name");
      imageNameElement.textContent = this.title;
      
    }

    _setEvenListener(){

      const iconHeart = this._element.querySelector(".main__icono");
      const iconEliminar = this._element.querySelector(".main__icon-eliminar");
      const image = this._element.querySelector('.main__images');
    
      iconHeart.addEventListener("click", this._like.bind(this));
      iconEliminar.addEventListener("click", this._eliminate.bind(this));
      image.addEventListener("click", this._openModal.bind(this));
    }

    generateCard(){
      this._element = this._getTemplate();
      this._setEvenListener();
      return this._element;
    }

  }
  