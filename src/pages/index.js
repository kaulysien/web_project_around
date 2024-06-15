import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import {
  formAdd,
  formProfileElement,
  openFormButton,
  openAddButton,
  selectors,
  openAvatarButton,
  formAvatarElement,
} from "../components/utils.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web-ptbr-cohort-10",
  headers: {
    authorization: "e00364f1-af4a-4601-a0ac-2228485dc1a7",
    "Content-Type": "application/json",
  },
});

const popupSelector = ".popup-zoom-image";
const imageElement = document.querySelector(".popup__image");
const captionElement = document.querySelector(".popup__image-name");
const popupWithImage = new PopupWithImage(
  popupSelector,
  imageElement,
  captionElement,
  () => handleImageClick()
);

popupWithImage.setEventListeners();

const popupDeleteConfirmation = new PopupWithConfirmation({
  popupSelector: ".popup_delete",
  submitCallback: (card) => {
    return api
      .deleteCard(card._cardId)
      .then(() => {
        card.removeElement();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

popupDeleteConfirmation.setEventListeners();

const userInfo = new UserInfo(selectors);

api
  .getUserInfo()
  .then(({ name, about, avatar }) => {
    userInfo.setUserInfo(name, about, avatar);
  })
  .catch((err) => {
    console.log(err);
  });

const renderNewCard = (item) => {
  const card = new Card(
    item,
    "#template",
    popupWithImage,
    () => {
      popupDeleteConfirmation.open(card);
    },
    api.addLikes.bind(api),
    api.removeLikes.bind(api)
  );
  return card.generateCard();
};

api
  .getInitialCards()
  .then((result) => {
    const defaultCardList = new Section(
      {
        items: result,
        renderer: (item) => {
          defaultCardList.addItem(renderNewCard(item));
        },
      },
      ".elements"
    );
    defaultCardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const popupAddForm = new PopupWithForm({
  popupSelector: ".popup_card",
  submitCallback: () => {
    const cardData = {
      name: document.querySelector(".popup__input-text_title").value,
      link: document.querySelector(".popup__input-text_url").value,
    };

    api
      .createNewCard(cardData)
      .then((result) => {
        document.querySelector(".elements").prepend(renderNewCard(result));
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

popupAddForm.setEventListeners();

openAddButton.addEventListener("click", () => {
  popupAddForm.open();
});

const popupProfile = new PopupWithForm({
  popupSelector: ".popup",
  submitCallback: ({ name, about }) => {
    api.editProfile(name, about);
    const { avatar } = userInfo.getUserInfo();
    userInfo.setUserInfo(name, about, avatar);
  },
});

popupProfile.setEventListeners();

openFormButton.addEventListener("click", () => {
  userInfo.getUserInfo();
  popupProfile.open();
});

const editAvatar = new PopupWithForm({
  popupSelector: ".popup_edit",
  submitCallback: ({ image }) => {
    api.editAvatar({
      avatar: document.querySelector(".popup__form-input-link").value,
    });
    const { name, about } = userInfo.getUserInfo();
    userInfo.setUserInfo(name, about, image);
  },
});

editAvatar.setEventListeners();

openAvatarButton.addEventListener("click", () => {
  editAvatar.open();
});

const formConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input-text",
  submitButtonSelector: ".popup__input-submit",
  inactiveButtonClass: "popup__input-disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error",
  errorClassVisible: "popup__error_visible",
};

const formValidatorAdd = new FormValidator(formConfig, formAdd);
formValidatorAdd.enableValidation();

const formValidatorProfile = new FormValidator(formConfig, formProfileElement);
formValidatorProfile.enableValidation();

const formValidatorAvatar = new FormValidator(formConfig, formAvatarElement);
formValidatorAvatar.enableValidation();
