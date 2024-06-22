export default class Card {
  constructor({ data, cardSelector, handleCardClick, handleTrashClick, api }) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick ?? null;
    this._handleTrashClick = handleTrashClick;
    this._api = api;
    this._isOwner = false;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".posts__item")
      .cloneNode(true);

    return cardElement;
  }

  _setOwner() {
    this._api
      .getLoggedUser()
      .then((res) => {
        this._isOwner = res._id === this._data.owner._id;
        this._isLiked = this._data.likes.find((like) => like._id === res._id);
        if (this._isOwner) {
          this._trashButton.classList.remove("posts__trash-btn_hidden");
        }
        if (this._isLiked) {
          this._likeButton.classList.add("posts__btn-like_actived");
        }
      })
      .catch(console.log);
  }

  _setButtons() {
    this._likeButton = this._card.querySelector(".posts__btn-like");
    this._trashButton = this._card.querySelector(".posts__trash-btn");
    this._cardImage = this._card.querySelector(".posts__image");
  }

  getCard() {
    this._card = this._getTemplate();
    this._setButtons();
    this._setOwner();
    this._setEventListeners();
    this._likeNumberElement = this._card.querySelector(".posts__like-number");

    this._card.querySelector(".posts__image").src = this._data.link;
    this._card.querySelector(".posts__image").alt = this._data.name;
    this._card.querySelector(".posts__title").textContent = this._data.name;
    this._likeNumberElement.textContent = this._data.likes.length;

    return this._card;
  }

  _handleLikeButton() {
    if (this._likeButton.classList.contains("posts__btn-like_actived")) {
      this._api
        .deleteLikeCardById(this._data._id)
        .then((res) => {
          this._likeButton.classList.remove("posts__btn-like_actived");
          this._likeNumberElement.textContent = res.likes.length;
        })
        .catch(console.log);
    } else {
      this._api
        .likeCardById(this._data._id)
        .then((res) => {
          this._likeButton.classList.add("posts__btn-like_actived");
          this._likeNumberElement.textContent = res.likes.length;
        })
        .catch(console.log);
    }
  }

  confirmDeleteCard() {
    return this._api
      .deleteCardById(this._data._id)
      .then(() => {
        this._card.remove();
      })
      .catch((err) => Promise.reject(err));
  }

  _handleTrashButton() {
    this._handleTrashClick(this._data);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    this._trashButton.addEventListener("click", () => {
      this._handleTrashButton();
    });

    if (this._handleCardClick) {
      this._cardImage.addEventListener("click", (evt) => {
        this._handleCardClick(this._data);
      });
    }
  }
}
