import {EscKey} from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  // let buttonClose = this._popupElement.querySelector(".form__reset-button");
  // removeListener(e) {
  //   e.target.removeEventListener("keydown", this._handleEscClose);
  // } 

  // Close the popup by pressing the Esc key
  _handleEscClose() {
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" ||
        (e.keyCode === EscKey &&
        this._formElement.classList.contains(
          `${this._popupSelector}_visible`
        ))
      ) {
        this.close();
        e.target.removeEventListener("keydown", this._handleEscClose); 
      }
    });
  }

  //  Close the popup using the mouse
  setEventListeners() {
    this._popupElement
    .querySelector(".form__reset-button")
    .addEventListener("click", () => {
      this.close(); 
    });
    // Close the form when clicking outside the form
    this._popupElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("form")) {
        this._handleEscClose(e.key);
        this.close(e.target);
        e.target.removeEventListener("keydown", this._handleEscClose);
        }
      });
  }

  // //  Close the popup using the mouse
  // setEventListeners() {
  //   this._popupElement
  //     .querySelector(".form__reset-button")
  //     .addEventListener("click", () => {
  //       //e.preventDefault();
  //       this.close();
  //       // this._handleEscClose();
  //       // e.stopPropagation();
  //     });
  // // Close the form when clicking outside the form
  // this._popupElement.addEventListener("click", (e) => {
  //   if (e.target.classList.contains("form")) {
  //     // e.preventDefault();
  //     this._handleEscClose(e.key);
  //     this.close(e.target);
  //     }
  //   });
  // }

  
  // Open the popup
  open(e) {
    this._popupElement.classList.add("form_visible");
    document.addEventListener("keydown", (e) => {
      this._handleEscClose(e.key);
    });
    // e.target.removeEventListener("keydown", this._handleEscClose);
  }

  //Close the popup
  close() {
    this._popupElement.classList.remove("form_visible");
  }
}
