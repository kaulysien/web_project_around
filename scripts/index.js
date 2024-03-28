import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { openPopup, closePopup, handleViewImageOnPopup } from './utils.js';

// Criação de instâncias das classes Card
const initialCards = [
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
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const elementsContainer = document.querySelector('.elements');
const cardTemplateSelector = '#template'; // Suponha que #template é o seletor do template de cada card

initialCards.forEach(cardData => {
  const card = new Card(cardData, cardTemplateSelector);
  const cardElement = card.generateCard();
  elementsContainer.appendChild(cardElement);
});

// Criação de instância da classe FormValidator para o formulário de edição de perfil
const profileFormElement = document.querySelector('.popup__form');
const profileFormConfig = {
  // Configurações para a validação do formulário de edição de perfil
};
const profileFormValidator = new FormValidator(profileFormConfig, profileFormElement);
profileFormValidator.enableValidation();

// Criação de instância da classe FormValidator para o formulário de adição de cartão
const addCardFormElement = document.querySelector('.popup-add-card__form');
const addCardFormConfig = {
  // Configurações para a validação do formulário de adição de cartão
};
const addCardFormValidator = new FormValidator(addCardFormConfig, addCardFormElement);
addCardFormValidator.enableValidation();

// Configuração dos manipuladores de eventos para abrir e fechar pop-ups
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-card-icon');
const closePopupButtons = document.querySelectorAll('.popup__close-button');

editButton.addEventListener('click', () => {
  openPopup('.popup');
});

addCardButton.addEventListener('click', () => {
  openPopup('.popup-add-card');
});

closePopupButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});

// Configuração do manipulador de evento para visualizar imagens em um pop-up
handleViewImageOnPopup();

