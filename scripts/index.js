const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = document.querySelector("#profile-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#card-add-modal");
const addCardCreateButton = addCardModal.querySelector(".modal__button");
const addCardCloseButton = document.querySelector("#card-close-button");
const addCardForm = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardForm.querySelector(".modal__input_type_title");
const cardUrlInput = addCardForm.querySelector(".modal__input_type_url");

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageCloseButton =
  previewImageModal.querySelector(".modal__close");
const previewImageTitle = document.querySelector(".modal__preview-title");
const previewImageCard = document.querySelector(".modal__preview-image");
/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEl.addEventListener("click", () => {
    openModal(previewImageModal);
    previewImageTitle.textContent = cardData.name;
    previewImageCard.alt = cardData.name;
    previewImageCard.src = cardData.link;
  });
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}
/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  addCardForm.reset();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  renderCard(cardData, cardListEl);
});

//add new card button
addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});
addCardCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

//preview image modal
previewImageCloseButton.addEventListener("click", () => {
  closeModal(previewImageModal);
});

/* -------------------------------------------------------------------------- */
/*                            Form Validation Functions                       */
/* -------------------------------------------------------------------------- */

function showError(input, message) {
  const formField = input.parentElement;
  const errorMessage = formField.querySelector('.error-message');
  formField.classList.add('error');
  errorMessage.textContent = message;
}

function hideError(input) {
  const formField = input.parentElement;
  formField.classList.remove('error');
}

function checkRequired(input) {
  if (input.value.trim() === '') {
    showError(input, 'Preencha esse campo');
    return false;
  } else {
    hideError(input);
    return true;
  }
}

function checkLength(input, min, max) {
  if (input.value.length < min || input.value.length > max) {
    showError(input, `O campo deve conter entre ${min} e ${max} caracteres`);
    return false;
  } else {
    hideError(input);
    return true;
  }
}

function validateForm() {
  const isNameValid = checkRequired(profileTitleInput) && checkLength(profileTitleInput, 2, 40);
  const isDescriptionValid = checkRequired(profileDescriptionInput) && checkLength(profileDescriptionInput, 2, 200);

  const isFormValid = isNameValid && isDescriptionValid;

  if (isFormValid) {
    profileEditModal.querySelector('.modal__button').removeAttribute('disabled');
  } else {
    profileEditModal.querySelector('.modal__button').setAttribute('disabled', 'true');
  }
}

/* -------------------------------------------------------------------------- */
/*                           Event Listeners for Validation                  */
/* -------------------------------------------------------------------------- */

profileTitleInput.addEventListener('input', validateForm);
profileDescriptionInput.addEventListener('input', validateForm);



