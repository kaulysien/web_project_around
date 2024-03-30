import Card from './Card.js';
import FormValidator from './FormValidator.js';

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


const renderCard = (cardData) => {
  const card = new Card(cardData, '#template');
  return card.renderCard();
};

const elements = document.querySelector('.elements');

initialCards.forEach((card) => {
  elements.append(renderCard(card));
});

// popup open/close functionality (same as before)

const editProfileForm = document.querySelector('.popup__form');
const addCardForm = document.querySelector('.popup__add-card-form');
const profileName = document.querySelector('.profile__name');
const profileRole = document.querySelector('.profile__role');

// Form validation setup (same as before)

const handleSaveProfileInformation = (input1, input2) => {
  // ... (same logic as before)
};

// Event listener for submitting new card form
addCardForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newCard = renderCard({
    name: document.querySelector('#input-location-name').value,
    link: document.querySelector('#input-image').value,
  });

  document.querySelector('.elements').prepend(newCard);

  document.querySelector('#input-image').value = '';
  document.querySelector('#input-location-name').value = '';

  handleViewImageOnPopup(); // Call to update image click handlers
});

// Initializing form validation instances
const editProfileValidator = new FormValidator(validationConfig1, editProfileForm);
const addCardValidator = new FormValidator(validationConfig2, addCardForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
