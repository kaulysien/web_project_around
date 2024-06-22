import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    { submitForm, triggerSelector, onOpen, onClose, onStart }
  ) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._form = this._popupElement.querySelector(".popup__form");
    this._submitForm = submitForm;
    this._triggerElement = document.querySelector(triggerSelector);
    this._onOpen = onOpen ?? null;
    this._onClose = onClose ?? null;
    this._onStart = onStart ?? null;
  }

  close() {
    super.close();
    if (this._onClose) {
      this._onClose();
    }
  }

  open() {
    super.open();
    if (this._onOpen) {
      this._onOpen();
    }
  }

  getForm() {
    return this._form;
  }

  getPopup() {
    return this._popupElement;
  }

  _getInputValues(evt) {
    const form = evt.target;
    this._submitForm(form);
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._getInputValues(evt);
    });

    this._triggerElement.addEventListener("click", () => {
      this.open();
    });
  }

  setPopup() {
    this.setEventListeners();
    if (this._onStart) this._onStart();
  }
}
