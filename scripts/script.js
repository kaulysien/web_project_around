/** @format */

import Card from "./Card.js";
import { closeByOverlay } from "./utils.js";
import { FormValidator } from "./FormValidator.js";

export const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const formPlaces = document.querySelector(".form-places");
const placesContainer = document.querySelector(".places__grid");

formPlaces.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const inputTitle = document.querySelector(".form-places__input_title").value;
  const inputUrl = document.querySelector(".form-places__input_url").value;

  const newCardData = {
    name: inputTitle,
    link: inputUrl,
  };

  const newCard = new Card(newCardData);

  const newCardElement = newCard.generateCard(newCardData);

  placesContainer.appendChild(newCardElement);
});

initialCards.forEach((cardData) => {
  const newCard = new Card(cardData);
  const newCardElement = newCard.generateCard(cardData);
  placesContainer.appendChild(newCardElement);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" || event.key === "Esc") {
    closeByOverlay();
  }
});

const configProfile = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__input_submit",
  inactiveButtonClass: "form__input_submit_disabled",
  inputErrorClass: "form__message",
  errorClass: "form__error_visible",
};

const configPlaces = {
  formSelector: ".form-places",
  inputSelector: ".form-places__input",
  submitButtonSelector: ".form-places__submit",
  inactiveButtonClass: "form-places__submit_disabled",
  inputErrorClass: "form-places__message",
  errorClass: "form-places__error_visible",
};

const profileForm = document.querySelector(".form");
const placesForm = document.querySelector(".form-places");

const profileFormValidator = new FormValidator(configProfile, profileForm);
profileFormValidator.enableValidation();

const placesFormValidator = new FormValidator(configPlaces, placesForm);
placesFormValidator.enableValidation();
