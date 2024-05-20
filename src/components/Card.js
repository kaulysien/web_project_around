import { addLikeCard, deleteLikeCard } from "../pages/index.js";

import { owner } from "../utils/constants.js";

export default class Card {
  constructor({ item, templateSelector, deleteCard }) {
    this._templateSelector = templateSelector;
    this._like = item.likes;
    this._id = item._id;
    this._title = item.name;
    this._url = item.link;
    this._owner = item.owner;
    this.deleteCard = deleteCard;
  }

  getTemplate() {
    const cardTemplate = document
      .querySelector("#gallery__card")
      .content.querySelector(".place")
      .cloneNode(true);

    return cardTemplate;
  }

  generateCard() {
    this._element = this.getTemplate();
    this._element.setAttribute("id", this._id);
    this._element.setAttribute("owner._id", this._owner._id);
    this._element.querySelector(".place__image").setAttribute("src", this._url);
    this._element
      .querySelector(".place__image")
      .setAttribute("alt", this._title);
    this._element.querySelector(".place__title").textContent = this._title;
    this._element.querySelector(".place__like-number").textContent =
      this._like.length.toString();

    this._buttonLikeElement = this._element.querySelector(
      ".place__button-like"
    );
    this._buttonDeleteCard = this._element.querySelector(
      ".place__button-delete"
    );

    if (this._owner._id === owner._id) {
      this._buttonDeleteCard.style.display = "block";
    } else {
      this._buttonDeleteCard.style.display = "none";
    }
    this.setEventListeners();
    return this._element;
  }

  likeCounter(event) {
    const likeNumberElement = this._buttonLikeElement
      .closest(".place")
      .querySelector(".place__like-number");
    const isLiked = this._buttonLikeElement.classList.toggle(
      "place__button-like_active"
    );

    if (isLiked) {
      addLikeCard(this._id);
      likeNumberElement.textContent =
        parseInt(likeNumberElement.textContent) + 1;
    } else {
      deleteLikeCard(this._id);
      likeNumberElement.textContent =
        parseInt(likeNumberElement.textContent) - 1;
    }
  }

  openPopupConfirmDelete() {
    popupDelete.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  removeCard() {
    this.deleteCard(this._id);
  }

  setEventListeners() {
    this._buttonLikeElement.addEventListener("click", (event) => {
      this.likeCounter(event);
    });

    this._buttonDeleteCard.addEventListener("click", (event) => {
      this.removeCard();
    });
  }
}
