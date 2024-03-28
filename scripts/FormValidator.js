export default class FormValidator {
    constructor(config, formElement) {
      this.form = formElement;
      this.inputList = Array.from(this.form.querySelectorAll(config.inputSelector));
      this.saveInfo = this.form.querySelector(config.submitButtonSelector);
      this.inactiveButtonClass = config.inactiveButtonClass;
      this.inputErrorClass = config.inputErrorClass;
      this.errorClass = config.errorClass;
    }
  
    handleInput(event) {
      const target = event.target;
      const errorNode = this.form.querySelector(`.${this.errorClass}_${target.name}`);
      if (target.validity.valid) {
        target.classList.remove(this.inputErrorClass);
        errorNode.textContent = "";
      } else {
        target.classList.add(this.inputErrorClass);
        errorNode.textContent = target.validationMessage;
      }
  
      this.saveInfo.disabled = !this.isValid();
      if (this.saveInfo.disabled) {
        this.saveInfo.classList.add(this.inactiveButtonClass);
      } else {
        this.saveInfo.classList.remove(this.inactiveButtonClass);
      }
    }
  
    isValid() {
      return this.inputList.every((item) => {
        return item.validity.valid;
      });
    }
  
    enableValidation() {
      this.form.addEventListener("input", (event) => {
        this.handleInput(event);
      });
  
      this.form.addEventListener("submit", (event) => {
        event.preventDefault();
      });
    }
  
  }