class Card {
    constructor(cardData, templateSelector) {
      this._cardData = cardData;
      this._template = document.querySelector(templateSelector);
    }
  
    #_getTemplateContent() {
      return this._template.content.querySelector('.elements__card').cloneNode(true);
    }
  
    #_addName(cardElement) {
      cardElement.querySelector('.elements__card-name').textContent = this._cardData.name;
    }
  
    #_addImage(cardElement) {
      const image = cardElement.querySelector('.elements__card-image');
      image.setAttribute('src', this._cardData.link);
      image.setAttribute('alt', this._cardData.name);
    }
  
    #_addLikeToggle(cardElement) {
      const likeIcon = cardElement.querySelector('.elements__like-icon');
      likeIcon.addEventListener('click', () => {
        likeIcon.src = likeIcon.src === './images/like-button.png' ? './images/like-button-clicked.png' : './images/like-button.png';
      });
    }
  
    #_addDeleteFunctionality(cardElement) {
      const deleteIcon = cardElement.querySelector('.elements__delete-icon');
      deleteIcon.addEventListener('click', () => {
        const elements = document.querySelector('.elements');
        elements.removeChild(cardElement);
      });
    }
  
    renderCard() {
      const cardElement = this.#_getTemplateContent();
      this.#_addName(cardElement);
      this.#_addImage(cardElement);
      this.#_addLikeToggle(cardElement);
      this.#_addDeleteFunctionality(cardElement);
      return cardElement;
    }
  }
  
  export default Card;
  