import "./index.css";

import UserInfoImage from "../components/UserInfoImage.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWhithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupDeleteCard from "../components/PopupDeleteCard";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  owner,
  cardsContainer,
  popupCard,
  popupContainerScreen,
  popupEdit,
  photographPopup,
  configValidator,
  inputTitleInclude,
  inputUrlInclude,
  popupDelete,
} from "../utils/constants.js";

const clientAPI = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_ptbr_05",
  token: "e2bad784-3e1f-478a-b640-635d640e7341",
});

setTimeout(updateLikeData, 120);
updateUsers();

export function updateUsers() {
  clientAPI.getUsers().then((res) => {
    const imagePerfil = document.querySelector(".profile__image");
    const profileName = document.querySelector(".profile__info-name");
    const profileAbout = document.querySelector(".profile__info-discription");
    imagePerfil.src = res.avatar;
    profileName.textContent = res.name;
    profileAbout.textContent = res.about;
  });
}

const popupWhithForm = new PopupWhithForm((item) => {
  popupWhithForm.renderLoading(true);
  clientAPI
    .createCards({
      likes: [],
      name: inputTitleInclude.value,
      link: inputUrlInclude.value,
      owner: owner,
      createdAt: new Date().toISOString(),
    })
    .then((res) => {
      const newCard = new Card({
        item: {
          likes: res.likes,
          _id: res._id,
          name: res.name,
          link: res.link,
          owner,
        },
        templateSelector: ".place",
        deleteCard: deleteCard,
      });
      const card = newCard.generateCard();
      const cardsContainer = document.querySelector(".gallery");
      cardsContainer.appendChild(card);
    })
    .finally(() => {
      setTimeout(() => {
        popupWhithForm.renderLoading(false);
      }, 1000);
    });
}, popupCard);

updatePageData();
export function updatePageData() {
  clientAPI.getCards().then((res) => {
    const cardList = new Section(
      {
        items: res,
        render: (item) => {
          const card = new Card({
            item: item,
            templateSelector: ".place",
            deleteCard: deleteCard,
          });
          const cardElement = card.generateCard();
          cardList.addItem(cardElement);
        },
      },
      cardsContainer
    );
    cardList.renderer();
  });
}

function deleteCard(id) {
  popupDeleteCard.openConfirmDeleteCard(id);
}

export function deleteCardApi(idItem) {
  popupDeleteCard.renderLoading(true);
  console.log(idItem);
  clientAPI
    .deleteCard(idItem)
    .then(() => {
      const elementToDelete = document.getElementById(idItem);
      if (elementToDelete) {
        elementToDelete.remove();
      }
    })
    .finally(() => {
      setTimeout(() => {
        popupDeleteCard.renderLoading(false);
      }, 1000);
    });
}

export function updateLikeData() {
  const idUser = owner._id;
  clientAPI.getCards().then((cards) => {
    cards.forEach((card) => {
      if (card.likes.length > 0) {
        const userLiked = card.likes.some((like) => like._id === idUser);

        if (userLiked) {
          const cardElement = document.getElementById(card._id);

          if (cardElement) {
            const likeButton = cardElement.querySelector(".place__button-like");
            likeButton.classList.add("place__button-like_active");
          }
        }
      }
    });
  });
}

export function deleteLikeCard(idItem) {
  clientAPI.deleteLike(idItem);
}

export function addLikeCard(idItem) {
  clientAPI.addLike(idItem);
}

export function getUrlNewAvatar() {
  userInfoImage.renderLoading(true);
  const newUrl = document.querySelector(".photograph__input-link").value;
  const newAvatar = {
    avatar: newUrl,
  };
  clientAPI.getProfilePicture(newAvatar).finally(() => {
    setTimeout(() => {
      userInfoImage.renderLoading(false);
    }, 1000);
  });
}

export function getDescriptionPerfil() {
  const profileName = document.querySelector(".edit__input-name").value;
  const profileAbout = document.querySelector(".edit__input-about").value;
  const newDescriptionrData = {
    name: profileName,
    about: profileAbout,
  };
  userInfo.renderLoading(true);
  clientAPI.updateDescriptionPerfil(newDescriptionrData).finally(() => {
    setTimeout(() => {
      userInfo.renderLoading(false);
    }, 1000);
  });
}

new PopupWithImage(popupContainerScreen);

const userInfo = new UserInfo(popupEdit);

const userInfoImage = new UserInfoImage(photographPopup);

const popupDeleteCard = new PopupDeleteCard(popupDelete);

new FormValidator(configValidator, popupEdit);

new FormValidator(configValidator, popupCard);

new FormValidator(configValidator, photographPopup);
