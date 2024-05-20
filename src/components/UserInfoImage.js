import Popup from "./Popup.js";

import {
  buttonSaveImageProfile,
  buttonOpenEditImageProfile,
  inputImageProfile,
} from "../utils/constants.js";

import { getUrlNewAvatar, updateUsers } from "../pages/index.js";

export default class UserInfoImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.setEventListeners();
  }

  open() {
    super.open();
    inputImageProfile.value = "";
  }

  close(evt) {
    super.close(evt);
    updateUsers();
  }
  _handleEscClose(evt) {
    super._handleEscClose(evt);
  }

  renderLoading(isLoading) {
    super.renderLoading(isLoading);
  }

  setEventListeners() {
    super.setEventListeners();
    buttonOpenEditImageProfile.addEventListener("click", () => {
      this.open();
    });

    buttonSaveImageProfile.addEventListener("click", (evt) => {
      evt.preventDefault();
      getUrlNewAvatar();
      setTimeout(() => {
        this.close(evt);
      }, 1000);
    });
  }
}
