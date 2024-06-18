import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitCallback }) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._submitCallback = submitCallback;
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._submitButton = this._popupElement.querySelector(
      ".popup__button-submit"
    );
    this._submitButtonDefaultText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputs = this._formElement.querySelectorAll(".popup__input-text");
    const values = {};

    inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  setInputValues(values) {
    const inputs = this._formElement.querySelectorAll(".popup__input-text");
    inputs.forEach((input) => {
      input.value = values[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", async (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = "Salvando...";
      try {
        await this._submitCallback(this._getInputValues());
        this.close();
      } catch (error) {
        console.error("Erro ao salvar:", error);
      } finally {
        this._submitButton.textContent = this._submitButtonDefaultText;
      }
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
