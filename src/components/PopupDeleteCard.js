import Popup from "./Popup.js";
import { deleteCardApi } from "../pages/index.js";
export default class PopupDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.idItem = null;
    this.setEventListeners();
  }

  open() {
    super.open();
  }

  close(evt) {
    super.close(evt);
  }

  _handleEscClose(evt) {
    super._handleEscClose(evt);
  }

  renderLoading(isLoading) {
    super.renderLoading(isLoading);
  }
  openConfirmDeleteCard(id) {
    this.open();
    this.idItem = id;

    const deleteButton = document.getElementById("delete-button");
    const deleteHandler = (evt) => {
      deleteCardApi(this.idItem);
      evt.preventDefault();
      setTimeout(() => {
        this.close(evt);
      }, 1000);
      deleteButton.removeEventListener("click", deleteHandler);
      this.idItem = null;
    };
    deleteButton.addEventListener("click", deleteHandler);
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
