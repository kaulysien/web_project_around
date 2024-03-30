class FormValidator {
    constructor(validationConfig, formElement) {
      this._validationConfig = validationConfig;
      this._formElement = formElement;
      this._submitButton = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    }
  
    #_hasError() {
      return this._formElement.querySelectorAll(this._validationConfig.inputErrorClass).length > 0;
    }
  
    #_toggleButtonState() {
      this._submitButton.disabled = this.#_hasError();
    }
  
    #_setInputListeners() {
      const inputList = this._formElement.querySelectorAll(this._validationConfig.inputSelector);
      inputList.forEach((input) => {
        input.addEventListener('input', () => {
          this.#_toggleButtonState();
          this.#validateField(input);
        });
      });
    }
  
    #_validateField(input) {
      const errorElement = this._formElement.querySelector(`.${this._validationConfig.getErrorElement(input)}`);
      errorElement.textContent = this._validationConfig.validationRules(input.value) || '';
      input.classList.toggle(this._validationConfig.inputErrorClass, !!errorElement.textContent);
    }
  
    enableValidation() {
      this.#_setInputListeners();
      this.#_toggleButtonState();
    }
  }
  
  export default FormValidator;
  