export default class FormValidator {
  constructor(options, popupContainer) {
    this._inputErrorClass = options.inputErrorClass;
    this._editButtonSave = options.editButtonSave;
    this._includeButtonSave = options.includeButtonSave;
    this._photographButtonSave = options.photographButtonSave;
    this._inactiveButtonSaveClass = options.inactiveButtonSaveClass;
    this._inactiveButtonIncludeClass = options.inactiveButtonIncludeClass;
    this._inactiveButtonPhotographClass = options.inactiveButtonPhotographClass;
    this.enableValidation();
  }

  enableValidation() {
    const inputFieldsValidation = (input) => {
      input.addEventListener("input", (event) => {
        const element = event.target;
        const messageSpan = document.querySelector(
          `.span_${element.name}-message`
        );
        if (!element.validity.valid) {
          input.classList.add(this.inputErrorClass);
          if (element.type === "url" && element.value.trim() !== "") {
            messageSpan.textContent = "Por favor, insira um endereço web.";
          } else {
            messageSpan.textContent = element.validationMessage;
          }
          this.disableButtons;
        } else {
          input.classList.remove(this.inputErrorClass);
          messageSpan.textContent = "";
          if (this.isValidForm) {
            this.enableButtons;
          }
        }
      });
    };

    const disableButtons = () => {
      const saveButtonEdit = document.querySelector(this._editButtonSave);
      const saveButtonInclude = document.querySelector(this._includeButtonSave);
      const saveButtonPhotograph = document.querySelector(
        this._photographButtonSave
      );
      saveButtonEdit.setAttribute("disabled", true);
      saveButtonInclude.setAttribute("disabled", true);
      saveButtonPhotograph.setAttribute("disabled", true);
      saveButtonEdit.classList.add(this._inactiveButtonSaveClass);
      saveButtonInclude.classList.add(this._inactiveButtonIncludeClass);
      saveButtonPhotograph.classList.add(this._inactiveButtonPhotographClass);
    };

    const enableButtons = () => {
      const saveButtonEdit = document.querySelector(this._editButtonSave);
      const saveButtonInclude = document.querySelector(this._includeButtonSave);
      const saveButtonPhotograph = document.querySelector(
        this._photographButtonSave
      );
      saveButtonEdit.removeAttribute("disabled");
      saveButtonInclude.removeAttribute("disabled");
      saveButtonPhotograph.removeAttribute("disabled");
      saveButtonEdit.classList.remove(this._inactiveButtonSaveClass);
      saveButtonInclude.classList.remove(this._inactiveButtonIncludeClass);
      saveButtonPhotograph.classList.remove(
        this._inactiveButtonPhotographClass
      );
    };

    const allForms = Array.from(document.forms);
    for (const form of allForms) {
      const inputs = Array.from(form.elements);
      const isValidForm = () => inputs.every((input) => input.validity.valid);
      inputs.forEach((element) => {
        inputFieldsValidation(element);
        element.addEventListener("input", (event) => {
          if (isValidForm()) {
            enableButtons();
          } else {
            disableButtons();
          }
        });
      });
    }
  }
}
