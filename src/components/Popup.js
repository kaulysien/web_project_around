export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._isOpen = false;
    this._handleEscCloseBound = this._handleEscClose.bind(this);
  }

  isOpen() {
    return this._isOpen;
  }

  open() {
    this._isOpen = true;
    this._popupElement.classList.remove("popup_closed");
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscCloseBound);
  }

  close() {
    this._isOpen = false;
    this._popupElement.classList.add("popup_closed");
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscCloseBound);
  }

  _handleEscClose(evt) {
    if (evt.key == "Escape" && this._isOpen) {
      this.close();
    }
  }

  _handleClickClose(target) {
    if (
      target.classList.contains("popup__close-icon") ||
      target.classList.contains("popup")
    ) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      this._handleClickClose(evt.target);
    });
  }
}
