// Definição da classe FormValidator
export class FormValidator {
    constructor(config, formElement) {
        // Inicialização dos atributos da classe
        this._config = config;
        this._formElement = formElement;
    }

    // Método privado para exibir mensagem de erro no input
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
    }

    // Método privado para ocultar mensagem de erro no input
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._config.errorClass);
    }

    // Método privado para verificar a validade do input
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    // Método privado para alternar o estado do botão de envio do formulário
    _toggleButtonState() {
        const isValid = this._inputList.every(inputElement => inputElement.validity.valid);

        if (isValid) {
            this._buttonElement.removeAttribute('disabled');
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        } else {
            this._buttonElement.setAttribute('disabled', true);
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
        }
    }

    // Método privado para configurar ouvintes de eventos para os inputs do formulário
    _setEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);

        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });

        this._toggleButtonState();
    }

    // Método público para habilitar a validação do formulário
    enableValidation() {
        this._formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });

        this._setEventListeners();
    }
}
