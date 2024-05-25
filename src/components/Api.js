export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers; 
    }

    getAppInfo(){
        return Promise.all([this.getInitialCards(), this.getUserInfo()]);
    }

    // Load Cards from the Server
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers,
        })
          .then((res) =>
            (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
          )
          .catch((err) => {
            console.log(err);
          });
    }

    // Load User Information from the Server
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers,
        })
          .then((res) =>
            (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
          )
          .catch((err) => {
            console.log(err);
          });
    }

    // Update Profile Picture
    setUserAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
          headers: this._headers,
          method: "PATCH",
          body: JSON.stringify(
            { avatar: avatar.imageLink }
          ),
        })
          .then((res) =>
            (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
          )
          .catch((err) => {
            console.log(err);
          });
    }

    // Edit Profile
    setUserProfile(data) {
        return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers,
          method: "PATCH",
          body: JSON.stringify({
            name: data.name,
            about: data.job,
          }),
        })
          .then((res) =>
            (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
          )
          .catch((err) => {
            console.log(err);
          });
    }

    // Add New Card
    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers,
          method: "POST",
          body: JSON.stringify({
            name: data.title,
            link: data.link,
          }),
        })
          .then((res) =>
            (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
          )
          .catch((err) => {
            console.log(err);
          });
    }
    
    // Delete Card
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
          headers: this._headers,
          method: "DELETE",
        })
          .then((res) =>
            (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
          )
          .catch((err) => {
            console.log(err);
          });
    }
    
    // Add and Remove Likes
//     updateLike({LikeButtonIsActive, cardId}) {
//         return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
//           headers: this._headers,
//           method: LikeButtonIsActive ? "PUT" : "DELETE",
//           // method: LikeButtonIsActive ? "DELETE" : "PUT",
//         })
//           .then((res) =>
//             res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
//           )
//           .catch((err) => {
//             console.log(err);
//           });
//     }
// }

  // Add and Remove Likes
  updateLike(LikeButtonIsActive, cardId){
    if(LikeButtonIsActive) {
      //unlike heart button
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else {
      //like heart button
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
}