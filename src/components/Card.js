export default class Card {
  constructor({ cardItem, handleCardClick, handleDeleteClick, handleLikeClick }, cardTemplateSelector, userId) {
    this._name = cardItem.name;
    this._link = cardItem.link;
    this._likes = cardItem.likes;
    this._cardItem = cardItem;
    this._userId = userId;
    this._id = cardItem._id;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }
  
_getCardTemplate() {
  const cardTemplate = document
    .querySelector(this._cardTemplateSelector)
    .content.querySelector(".card")
    .cloneNode(true);
    
  return cardTemplate;
}

_setEventListeners() {
  const listItem = this._card
    .querySelector(".card__delete-button")
    .closest(".card");
    //delete button
    this._card
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
        // this._card.remove();
        // this._card = null;
      });
    //like button
    this._card
      .querySelector(".card__like-button")
      .addEventListener("click", (e) => {
        const LikeButtonIsActive = this._card
          .querySelector(".card__like-button")
          .classList.contains("card__like-button_active");
        this._handleLikeClick(
          LikeButtonIsActive,
          this._cardItem._id,
          this._card.querySelector(".card__like-counter")
        );
        e.target.classList.toggle("card__like-button_active");
      });

    //image popup
    this._card.querySelector(".card__image")
      .addEventListener("click", () => {
      this._handleCardClick({
        title: this._name,
        link: this._link,
      });
    });
  }

  //Update card view: delete button, likes number
  _updateCardView() {
    const buttonItem = this._card.querySelector(".card__delete-button");

    //likes counter
    this._card.querySelector(".card__like-counter").textContent = this._likes.length;
    this._likes.forEach((card) => {
      if (this._userId === card.cardId) {
        this._card
          .querySelector(".card__like-button")
          .classList.toggle("card__like-button_active");
      }
    });
    //show delete icon if the card was created by the user
    if(this._userId === this._cardItem.owner._id) {
      buttonItem.classList.add("card__delete-button_active");
    }
  }

  // Remove card from DOM
  remove() {
    this._card.remove()
  }

  id() {
    return this._id;
  }

  generateCard() {
    this._card = this._getCardTemplate();

    this._card.querySelector(
      ".card__image"
    ).style.backgroundImage = `url('${this._link}')`;
    this._card.querySelector(".card__title")
    .textContent = this._name;

    // if (this._isOwner) {
    //   this._buttonItem.classList.remove("card__delete-button_active");
    // }

    this._setEventListeners();
    this._updateCardView();
    return this._card;
  }
}