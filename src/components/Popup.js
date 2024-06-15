export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this.close = this.close.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    this._popupElement.classList.add("popup__zoom_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    this._popupElement.classList.remove("popup__zoom_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleClickClose(target) {
    if (
      target.classList.contains("popup__close-button") ||
      target.classList.contains("popup")
    ) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".popup__close-button")
      .addEventListener("click", this.close);

    this._popupElement.addEventListener("click", (evt) => {
      this._handleClickClose(evt.target);
    });
  }
}
