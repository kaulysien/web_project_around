import Popup from "./Popup.js";
import { cardsContainer, popupImage, popupTitle } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.url = null;
    this.title = null;
    this._container = document.querySelector(".screen");
    this._closePopup = this._popup.querySelector(".button-close-popup");
    this.setEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close(evt);
    }
  }

  clear() {
    this._container.innerHTML = "";
  }

  open() {
    this._popup.classList.add("screen__image_opened");
    document.addEventListener("keydown", this._handleEscClose);
    popupImage.src = this._url;
    popupImage.alt = this._title;
    popupTitle.textContent = this._title;
  }

  close(evt) {
    this._popup.classList.add("screen__image_closing");
    setTimeout(() => {
      this._popup.classList.remove("screen__image_closing");
      this._popup.classList.remove("screen__image_opened");
    }, 200);
    evt.preventDefault();
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    cardsContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("place__image")) {
        const imageURL = event.target.src;
        this._url = imageURL;
        const titleElement = event.target
          .closest(".place")
          .querySelector(".place__title");
        this._title = titleElement.textContent;

        this.open();
      }
    });

    this._closePopup.addEventListener("click", (evt) => {
      this.close(evt);
    });

    this._popup.addEventListener("click", (evt) => {
      const elementStyle = window.getComputedStyle(evt.target);
      if (elementStyle.backgroundColor === "rgba(0, 0, 0, 0.5)") {
        this.close(evt);
      }
    });
  }
}
