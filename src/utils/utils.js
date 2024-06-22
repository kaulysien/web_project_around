import { Api } from "../components/Api";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import {
  validateOptions,
  cardSelector,
  postListSelector,
  nameSelector,
  aboutSelector,
  avatarSelector,
} from "./constants";

const api = new Api("https://around.nomoreparties.co/v1/web_ptbr_09", {
  headers: {
    authorization: "1146a04f-7181-45eb-9b96-3a5b76f79b15",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector,
  aboutSelector,
  avatarSelector,
  api: api,
});

function enableValidationForm(form) {
  new FormValidator({
    formElement: form,
    options: validateOptions,
  }).enableValidation();
}

function createPosts(posts, insertMethod = "append") {
  function trashClick(card) {
    const popupConfirmation = new PopupWithConfirmation(
      ".popup_confirmation",
      () => {
        card
          .confirmDeleteCard()
          .then(() => {
            popupConfirmation.close();
            newPost.isEmpty();
          })
          .catch(console.log);
      }
    );
    popupConfirmation.open();
    popupConfirmation.setEventListeners();
  }

  function handleCardClick(data) {
    const popup = new PopupWithImage(".popup_image");
    popup.open(data);
    popup.setEventListeners();
  }

  function renderer(item) {
    const card = new Card({
      data: item,
      cardSelector,
      handleCardClick,
      handleTrashClick: () => {
        trashClick(card);
      },
      api: api,
    });
    newPost.addItem(card.getCard());
  }

  const newPost = new Section(
    {
      items: posts,
      insertMethod,
      emptySelector: ".posts__empty-text",
      renderer,
    },
    postListSelector
  );
  newPost.renderItems();
}

function getAllCards() {
  api
    .getInitialCards()
    .then((res) => {
      createPosts(res);
    })
    .catch((err) => console.log(err));
}

function setInputsProfile(popup) {
  const form = popup.querySelector(".popup__form");
  userInfo.getUserInfo().then((res) => {
    form.name.value = res.name;
    form.about.value = res.about;
  });
}

function resetValidationForm(form) {
  if (form) {
    // remover todas as mensagens de erro da tela
    const inputList = form.querySelectorAll(validateOptions.inputSelector);
    inputList.forEach((inputElement) => {
      const errorElement = form.querySelector(
        `#${inputElement.id} + .${validateOptions.errorClass}`
      );
      inputElement.classList.remove(validateOptions.inputErrorClass);
      errorElement.classList.remove(validateOptions.errorClassVisible);
      errorElement.textContent = "";
    });

    // desativar botão de submit
    const buttonForm = form.querySelector(validateOptions.submitButtonSelector);
    buttonForm.disabled = true;
    buttonForm.classList.add(validateOptions.inactiveButtonClass);

    form.reset();
  }
  return;
}

export {
  resetValidationForm,
  setInputsProfile,
  enableValidationForm,
  createPosts,
  getAllCards,
  api,
  userInfo,
};
