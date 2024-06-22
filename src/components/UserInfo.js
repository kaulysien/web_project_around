export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector, api }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._api = api;
  }

  getUserInfo() {
    return this._api
      .getLoggedUser()
      .then((res) => res)
      .catch(console.log);
  }

  setAvatar(avatar) {
    this._avatarElement.src = avatar;
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }
}
