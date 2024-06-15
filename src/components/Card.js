export default class Card {
  constructor(
    dataCard,
    templateSelector,
    popupWithImage,
    handleDeleteClick,
    handleAddLike,
    handleRemoveLike
  ) {
    this._link = dataCard.link;
    this._name = dataCard.name;
    this._data = dataCard;
    this.owner = dataCard.owner._id;
    this._cardId = dataCard._id;
    this._likes = dataCard.likes;
    this._templateSelector = templateSelector;
    this._popupWithImage = popupWithImage;
    this._handleDeleteClick = handleDeleteClick;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector("#template")
      .content.querySelector(".elements__card")
      .cloneNode(true);

    return cardElement;
  }

  removeElement() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this.likeClick();
    this._element.querySelector(".elements__image").src = this._link;
    this._element.querySelector(".elements__title").alt = this._name;
    this._element.querySelector(".elements__title").textContent = this._name;
    this._element.querySelector(".elements__like-count").textContent =
      this._likes.length;

    const trashDeleteOwner = () => {
      const myId = "0ff285d6131bbd4e8d5bc25d";
      if (this.owner === myId) {
        this._element.querySelector(".elements__button-trash");
        return true;
      }
    };

    trashDeleteOwner();

    if (this.isLiked()) {
      const likeButton = this._element.querySelector(".elements__like-button");
      likeButton.classList.add("active");
    }

    return this._element;
  }

  isLiked() {
    const myId = "0ff285d6131bbd4e8d5bc25d";

    return this._likes.find((res) => res._id === myId);
  }

  likeClick() {
    const likeButton = this._element.querySelector(".elements__like-button");
    const likeCount = this._element.querySelector(".elements__like-count");

    const liked = () => {
      if (!this.isLiked()) {
        this._handleAddLike(this._cardId).then((res) => {
          likeButton.classList.add("active");

          const active = this._element.querySelector(".active");

          localStorage.setItem(active, likeButton);

          likeCount.textContent = parseInt(++this._likes.length);

          this._likes = res.likes;
        });
      } else {
        this._handleRemoveLike(this._cardId).then((res) => {
          likeButton.classList.remove("active");
          this._likes = res.likes;
          likeCount.textContent = this._likes.length;
        });
      }
    };

    likeButton.addEventListener("click", liked, () => {
      const active = likeButton.classList.add("active");
      sessionStorage.getItem(active);
    });
  }

  _trash() {
    const trashButton = this._element.querySelector(".elements__button-trash");
    trashButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });
  }

  _setEventListeners() {
    this._trash();
    this._element
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._handleImageClick();
      });
  }

  _handleImageClick() {
    this._popupWithImage.open(this._link, this._name);
  }
}
