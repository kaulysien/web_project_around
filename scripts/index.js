// Importação das classes e funções necessárias
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openModal, closeModal } from './utils.js';

// Constantes e variáveis globais
const editProfileForm = document.querySelector('.popup__form');
const addCardForm = document.querySelector('.popup__add-card-form');
const profileName = document.querySelector('.profile__name');
const profileRole = document.querySelector('.profile__role');
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-card-icon');
const elementsContainer = document.querySelector('.elements');

// Funções para manipulação de formulários
const handleSaveProfileInformation = (input1, input2) => {
    profileName.innerText = input1.value;
    profileRole.innerText = input2.value;
    closeModal('.popup');
}

// Instância da classe FormValidator para validação do formulário de edição do perfil
const editProfileFormValidator = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active'
}, editProfileForm);
editProfileFormValidator.enableValidation();

// Instância da classe FormValidator para validação do formulário de adição de cartão
const addCardFormValidator = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__create-button',
    inactiveButtonClass: 'popup__create-button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active'
}, addCardForm);
addCardFormValidator.enableValidation();

// Event listener para abrir o modal de edição do perfil
editButton.addEventListener('click', () => {
    openModal('.popup');
});

// Event listener para fechar o modal de edição do perfil
document.querySelector('.popup__close-button_edit').addEventListener('click', () => {
    closeModal('.popup');
});

// Event listener para abrir o modal de adição de cartão
addCardButton.addEventListener('click', () => {
    openModal('.popup-add-card');
});

// Event listener para fechar o modal de adição de cartão
document.querySelector('.popup-add-card__close-button').addEventListener('click', () => {
    closeModal('.popup-add-card');
});

// Inserir as imagens na página
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

// Função para criar e renderizar um novo cartão
const createAndRenderCard = (cardData) => {
    const newCard = new Card(cardData, '#template').generateCard();
    elementsContainer.prepend(newCard);
}

// Adicionar cada cartão inicial à página
initialCards.forEach(cardData => {
    createAndRenderCard(cardData);
});
