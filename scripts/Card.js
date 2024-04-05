/** @format */

import {
  overlayTrue,
  overlayFalse,
  formAddDesative,
  closeFormDesative,
} from "./utils.js";

export default class Card {
  constructor(data, cardArray) {
    this.data = data;
    this.cardArray = cardArray;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector("#card-template");
    const cardClone = document.importNode(cardTemplate.content, true);
    const cardElement = cardClone.querySelector(".places__container");

    const imageElement = cardElement.querySelector(".places__image");
    imageElement.src = this.data.link;
    imageElement.alt = this.data.name;

    const nameElement = cardClone.querySelector(".places__title");
    nameElement.textContent = this.data.name;

    return cardElement;
  }

  generateCard(cardData) {
    this.data = cardData;
    this._element = this._getTemplate();
    this._setEventListeners();
    this._handleDeleteClick(this._element);
    return this._element;
  }

  _updateCardInDOM(index) {
    const cardContainer = document.querySelector(".places__grid");
    const cardElements = cardContainer.querySelectorAll(".places__container");
    const card = this._initialCards[index];
    const cardElement = cardElements[index];

    const imageElement = cardElement.querySelector(".places__image");
    const nameElement = cardElement.querySelector(".places__title");

    imageElement.src = card.link;
    imageElement.alt = card.name;
    nameElement.textContent = card.name;
  }

  _submitAddCard() {
    const inputTitle = document.querySelector(".form-places__input_title");
    const inputUrl = document.querySelector(".form-places__input_url");

    if (this.cardArray && this.currentCardIndex < this.cardArray.length) {
      this.cardArray[this.currentCardIndex] = {
        name: inputTitle.value,
        link: inputUrl.value,
      };

      this._updateCardInDOM(this.currentCardIndex);

      this.currentCardIndex++;
    }

    const footer = document.querySelector(".footer__content");
    footer.classList.add("footer__card_added");

    formAddDesative();
    closeFormDesative();
    overlayFalse();
  }

  _handleLikeClick() {
    const likeButton = this._element.querySelector(".places__like-button");
    if (likeButton.src.includes("like_button.svg")) {
      likeButton.src = "./styles/assets/like_button__active.svg";
    } else {
      likeButton.src = "./styles/assets/like_button.svg";
    }
  }

  _handleDeleteClick(cardElement) {
    cardElement
      .querySelector(".places__delete-image")
      .addEventListener("click", () => {
        cardElement.remove();
      });
    console.log("remove card");
  }

  _handleImageClick() {
    const clickedImageUrl = this.data.link;

    const enlargedImageContainer = document.querySelector(
      ".enlarged__image-container"
    );
    const enlargedImage = document.querySelector("#enlarged__image");
    const closeButtonEnlarged = document.querySelector(
      "#enlarged__close-button"
    );

    enlargedImage.src = clickedImageUrl;
    enlargedImage.classList.add("enlarged__image_active");
    enlargedImage.classList.remove("enlarged__image");
    enlargedImageContainer.classList.add("enlarged__container_active");
    closeButtonEnlarged.classList.remove("enlarged__close-button");
    closeButtonEnlarged.classList.add("enlarged__close-button_active");

    overlayTrue();
  }

  _closeButtonEnlarged() {
    const clickedImageUrl = this.data.link;

    const enlargedImageContainer = document.querySelector(
      ".enlarged__image-container"
    );
    const enlargedImage = document.querySelector("#enlarged__image");
    const closeButtonEnlarged = document.querySelector(
      "#enlarged__close-button"
    );

    enlargedImage.src = clickedImageUrl;
    enlargedImage.classList.remove("enlarged__image_active");
    enlargedImage.classList.add("enlarged__image");
    enlargedImageContainer.classList.add("enlarged__image-container");
    enlargedImageContainer.classList.remove("enlarged__container_active");
    closeButtonEnlarged.classList.add("enlarged__close-button");
    closeButtonEnlarged.classList.remove("enlarged__close-button_active");

    overlayFalse();
    console.log("teste closeButton");
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".places__like-button");
    const deleteButton = this._element.querySelector(".places__delete-image");
    const imageElement = this._element.querySelector(".places__image");
    const formPlaces = document.querySelector("#form-places");
    const closeButtonEnlarged = document.querySelector(
      "#enlarged__close-button"
    );

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" || event.key === "Esc") {
        this._closeButtonEnlarged();
        console.log("close esc enlarged");
      }
    });

    closeButtonEnlarged.addEventListener("click", () => {
      this._closeButtonEnlarged();
    });

    likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    deleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    imageElement.addEventListener("click", () => {
      this._handleImageClick();
    });

    formPlaces.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitAddCard();
      console.log("toguro");
    });
  }
}
