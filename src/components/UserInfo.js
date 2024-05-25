import { profileName, profileJob, profilePicture } from "../utils/constants.js";

export default class UserInfo {
    constructor({ userName, userJob, userAvatar, userId }) {
        this._userName = userName;
        this._userJob = userJob;
        this._userAvatar = userAvatar;
        this._userId = userId;
    }
    // Returns object with user info
    getUserInfo() {
        return {
          userName: this._userName,
          userJob: this._userJob,
          userAvatar: this._userAvatar,
          userId: this._userId,
        };
    }

    // Take new user data to add it to page
    setUserInfo() {
        profileName.textContent = this._userName;
        profileJob.textContent = this._userJob;
        profilePicture.src = this._userAvatar;
    }    

    updateUserInfo(data) {
        this._userName = data.name;
        this._userJob = data.job;
  }

    setUserAvatar(imageLink) {
        this._userAvatar = imageLink;
    }
}