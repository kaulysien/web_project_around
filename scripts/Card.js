export default class Card {
    constructor(data, templateSelector) {
      this._text = data.name;
      this._imageLink = data.link;
      this._templateSelector = templateSelector;
    }
  
    _getTemplate() {
      const templateElement = document
        .querySelector(this._templateSelector)
        .content.querySelector(".elements__card")
        .cloneNode(true);
  
      return templateElement;
    }
  
    _setEventListeners(cardElement) {
      const imageElement = cardElement.querySelector(".elements__card-image");
      imageElement.addEventListener("click", () => {
        // Lógica para manipular o clique na imagem, se necessário
      });
    }
  
    _fillCardData(cardElement) {
      const textElement = cardElement.querySelector(".elements__card-name");
      const imageElement = cardElement.querySelector(".elements__card-image");
  
      textElement.textContent = this._text;
      imageElement.src = this._imageLink;
      imageElement.alt = this._text;
    }
  
    generateCard() {
      const cardElement = this._getTemplate();
      this._fillCardData(cardElement);
      this._setEventListeners(cardElement);
      return cardElement;
    }
  }
  