import "./index.css"; 

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  listWrapper,
  editButton,
  addButton,
  defaultConfig,
  openImageFormModal,
  editFormModal,
  addFormModal,
  deleteFormSelector,
  pictureFormSelector,
  templateCardSelector,
  profilePictureContainer,
  // profileName,
  // profileJob,
  // profilePicture
} from "../utils/constants.js";

let userInfo;

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-2",
  headers: {
    Authorization: "d38c3eff-8aa3-43a2-86b1-ec6a6fc8a616",
    "Content-Type": "application/json",
  },
});

// Image Popup
const popupWithImage = new PopupWithImage(openImageFormModal);
popupWithImage.setEventListeners();

// Delete Popup
const deleteFormElement = new PopupWithForm({
  popupSelector: deleteFormSelector,
});

deleteFormElement.setEventListeners();

// Render new card
const renderCard = (cardItem) => {
  const renderNewCard = new Card(
    {
      cardItem,
      handleCardClick: ({ title, link }) => {
        popupWithImage.open(title, link);
      },
      handleDeleteClick: (card) => {
        deleteFormElement.open();
        deleteFormElement.setSubmitAction(() => {
          api
            .deleteCard(card.id())
            .then(() => {
              card.remove();
            })
            .finally(() => deleteFormElement.renderLoading(false));
        });
      },
      handleLikeClick: (LikeButtonIsActive, cardId, likeCounter) => {
        api.updateLike(LikeButtonIsActive, cardId).then((result) => {
          likeCounter.textContent = result.likes.length;
        });
      },
    },
    templateCardSelector,
    userInfo.getUserInfo().userId
  );
  return renderNewCard.generateCard();
};

// Display user info and initial cards
// const userInfo = new UserInfo({
//   userName: profileName,
//   userJob: profileJob,
//   userAvatar: profilePicture,
// });
api
  .getUserInfo()
  .then((result) => {
    userInfo = new UserInfo({
      userName: result.name,
      userJob: result.about,
      userAvatar: result.avatar,
      userId: result._id,
    });
    userInfo.setUserInfo();
  })
  .then(() => {
    api.getInitialCards().then((result) => {
      const cardList = new Section(
        {
          items: result,
          renderer: (cardItem) => {
            cardList.addItem(renderCard(cardItem));
          },
        },
        listWrapper
      );
      cardList.renderItems();
    });
  });

// Add new form
const addFormElement = new PopupWithForm({
  popupSelector: addFormModal,
  handleFormSubmit: (data) => {
    api
      .addCard(data)
      .then((result) => {
        document.querySelector(listWrapper).prepend(renderCard(result));
        addFormElement.close();
      })
      .finally(() => addFormElement.renderLoading(false));
  },
});

addFormElement.setEventListeners();

addButton.addEventListener("click", () => {
  addFormElement.open();
});

// Edit form
const editFormElement = new PopupWithForm({
  popupSelector: editFormModal,
  handleFormSubmit: (data) => {
    userInfo.updateUserInfo(data);
    userInfo.setUserInfo();
    api
      .setUserProfile(data)
      .then(() => editFormElement.close())
      .finally(() => editFormElement.renderLoading(false));
  },
});
editFormElement.setEventListeners();

editButton.addEventListener("click", () => {
  editFormElement.open();
});

// Change picture
const pictureFormElement = new PopupWithForm({
  popupSelector: pictureFormSelector,
  handleFormSubmit: (avatar) => {
    api
      .setUserAvatar(avatar)
      .then((result) => {
        userInfo.setUserAvatar(result.avatar);
        userInfo.setUserInfo();
        pictureFormElement.close();
      })
      .finally(() => pictureFormElement.renderLoading(false));
  },
});

pictureFormElement.setEventListeners();

profilePictureContainer.addEventListener("click", () => {
  pictureFormElement.open();
});

// Validate all forms
const formList = Array.from(
  document.querySelectorAll(defaultConfig.formSelector)
);
formList.forEach((formElement) => {
  const formValidate = new FormValidator(defaultConfig, formElement);
  formValidate.enableValidation();
});
