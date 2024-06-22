import Popup from "./Popup";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmationClick) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._buttonConfirmationElement = this._popupElement.querySelector(
      ".popup__btn-confirmation"
    );
    this._handleConfirmationClick = handleConfirmationClick;
  }

  _confirmationClick() {
    this._handleConfirmationClick();
    super.close();
  }

  open() {
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonConfirmationElement.addEventListener("click", (evt) => {
      this._confirmationClick();
    });
  }
}
