import Popup from "./Popup.js";

import { getDescriptionPerfil } from "../pages/index.js";

import {
  inputName,
  infoName,
  inputAbout,
  infoAbout,
  openPopupEditButton,
  buttonSave,
} from "../utils/constants.js";

export default class UserInfo extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.setEventListeners();
  }

  getUserInfo() {
    const userName = document.querySelector(".edit__input-name").value;
    const userWork = document.querySelector(".edit__input-about").value;
    return { newName: userName, newWork: userWork };
  }

  setUserInfo() {
    const { newName, newWork } = this.getUserInfo();
    infoName.textContent = newName;
    infoAbout.textContent = newWork;
  }

  open() {
    super.open();
    inputName.value = infoName.textContent;
    inputAbout.value = infoAbout.textContent;
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

  setEventListeners() {
    super.setEventListeners();
    openPopupEditButton.addEventListener("click", () => {
      this.open();
    });
    buttonSave.addEventListener("click", (evt) => {
      evt.preventDefault();
      setTimeout(() => {
        this.close(evt);
      }, 1000);
      this.getUserInfo();
      this.setUserInfo();
      getDescriptionPerfil();
    });
  }
}
