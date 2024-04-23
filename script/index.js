import FormValidator from './FormValidator.js';
import Card from './card.js';

//INITIAL CARDS//

 const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
];

//Constantes//

export const profileButton = document.querySelector('.profile__info-button');
export const formEdit = document.querySelector('.popup');
export const formOpen = document.querySelector('.popup-opened');
export const formClose = document.querySelector('.popup__close');
export const formElement = document.querySelector('.form__fieldset');
export const nameInput = document.querySelector('.form__input-name');
export const jobInput = document.querySelector('.form__input-job');
export const nameProfile = document.querySelector('.profile__info-name');
export const jobProfile = document.querySelector('.profile__info-text');
export const cardButton = document.querySelector('.profile__button');
export const cardOpen = document.querySelector('.overlay-open');
export const cardClose = document.querySelector('.overlay__close');
export const cardOut = document.querySelector('.overlay');
export const zoomOpen = document.querySelector('.zoom-open');
export const zoom = document.querySelector('.zoom');


formElement.addEventListener("submit", function(evt){
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  formOpen.style.display = 'none';
})

// Gerador de cards //

const elements = document.querySelector(".elements");

initialCards.forEach((card) => {
  const cardInstance = new Card(card, document.querySelector("#template"));
  const generatedCard = cardInstance.generateCard();
  elements.append(generatedCard);
});

const formAddCard = document.querySelector('.formcard__fieldset');

formAddCard.addEventListener("submit", function(evt) {
  evt.preventDefault();

  const inputTitle = formAddCard.querySelector('.formcard__input-title');
  const inputImage = formAddCard.querySelector('.formcard__input-link');

  const newCard = new Card({
    name: inputTitle.value,
    link: inputImage.value,
  });

  const generatedCard = newCard.generateCard();

  document.querySelector(".elements").prepend(generatedCard);

  formAddCard.reset();

  cardOpen.style.display = 'none';
});

// Objetos //

new FormValidator({
  formSelector: ".formcard__fieldset",
  inputSelectorOne: ".formcard__input-title",
  inputSelectorTwo: ".formcard__input-link",
  submitButtonSelector: ".formcard__submit",
  errorClassOne: ".formcard__input-title-error",
  errorClassTwo: ".formcard__input-link-error",
}, formAddCard).enableValidation();

new FormValidator({
  formSelector: ".form__fieldset",
  inputSelectorOne: ".form__input-name",
  inputSelectorTwo: ".form__input-job",
  submitButtonSelector: ".form__submit",
  errorClassOne: ".form__input-name-error",
  errorClassTwo: ".form__input-job-error",
}, formElement).enableValidation();