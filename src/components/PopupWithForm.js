import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector(".form__container");
    this._buttonValue = this._popupElement.querySelector('.form__submit-button').value;
    this._inputList = this._popupElement.querySelectorAll(".form__input");
    [this._name, this._job] = this._inputList;
  }

  // Collect data from all the input fields
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((inputElement) => this._formValues[inputElement.name] = inputElement.value);
    return this._formValues;
  }

  // Add click event listener to the close button and add submit event handler
  setEventListeners(){
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this.renderLoading(true);
      this._handleFormSubmit(
        this._getInputValues(),
        this._listItem,
        this._cardId
      );
      this.close();
    });
  }

  // Reset the form when the popup is closed
  close() {
    super.close();
    this._formElement.reset();
  }
  
  open(data) {
    if (data) {
      this._name.value = data.name;
      this._job.value = data.job;
    }
    super.open();
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._popupElement.querySelector(
        ".form__submit-button").value =
        "Saving...";
    }
    else {
      this._popupElement.querySelector(
        ".form__submit-button"
      ).value = this._buttonValue;
    }
  }

  // Handle Form Submit for modal
  setSubmitAction (action) {
    this._handleFormSubmit = action;
  }

}
