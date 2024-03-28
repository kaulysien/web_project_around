// Definição da classe Card
export class Card {
    constructor(data, templateSelector) {
        // Inicialização dos atributos da classe
        this._text = data.name;
        this._imageLink = data.link;
        this._templateSelector = templateSelector;
    }

    // Método privado para obter o template HTML do cartão
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.elements__card')
            .cloneNode(true);

        return cardElement;
    }

    // Método privado para configurar os ouvintes de eventos do cartão
    _setEventListeners(cardElement) {
        cardElement.querySelector('.elements__delete-icon').addEventListener('click', () => {
            this._handleDeleteButtonClick(cardElement);
        });

        cardElement.querySelector('.elements__like-icon').addEventListener('click', () => {
            this._handleLikeButtonClick(cardElement);
        });
    }

    // Método privado para lidar com o clique no ícone de exclusão
    _handleDeleteButtonClick(cardElement) {
        cardElement.remove();
    }

    // Método privado para lidar com o clique no ícone de curtir
    _handleLikeButtonClick(cardElement) {
        cardElement.querySelector('.elements__like-icon').classList.toggle('elements__like-icon_active');
    }

    // Método público para gerar um novo cartão
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners(this._element);

        this._element.querySelector('.elements__card-name').textContent = this._text;
        this._element.querySelector('.elements__card-image').src = this._imageLink;
        this._element.querySelector('.elements__card-image').alt = this._text;

        return this._element;
    }
}
