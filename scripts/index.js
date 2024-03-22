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
/*                           Form Validation Functions                       */
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

function checkUrl(input) {
  const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
  if (!urlPattern.test(input.value.trim())) {
    showError(input, 'Por favor, insira um endereço web');
    return false;
  } else {
    hideError(input);
    return true;
  }
}

function validateForm() {
  const isTitleValid = checkRequired(cardTitleInput) && checkLength(cardTitleInput, 2, 30);
  const isUrlValid = checkRequired(cardUrlInput) && checkUrl(cardUrlInput);

  const isFormValid = isTitleValid && isUrlValid;

  if (isFormValid) {
    addCardCreateButton.removeAttribute('disabled');
  } else {
    addCardCreateButton.setAttribute('disabled', 'true');
  }
}

/* -------------------------------------------------------------------------- */
/*                           Event Listeners for Validation                  */
/* -------------------------------------------------------------------------- */

cardTitleInput.addEventListener('input', validateForm);
cardUrlInput.addEventListener('input', validateForm);


/* -------------------------------------------------------------------------- */
/*                           Event Listeners for Validation                  */
/* -------------------------------------------------------------------------- */

cardTitleInput.addEventListener('input', validateForm);
cardUrlInput.addEventListener('input', validateForm);

/* -------------------------------------------------------------------------- */
/*                       Close Pop-up by Clicking Overlay                     */
/* -------------------------------------------------------------------------- */

addCardModal.addEventListener('click', event => {
  if (event.target === addCardModal) {
    closeModal(addCardModal);
  }
});

/* -------------------------------------------------------------------------- */
/*                       Close Pop-up by Pressing Esc                         */
/* -------------------------------------------------------------------------- */

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal(addCardModal);
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const profileEditForm = document.getElementById('profile-edit-form');
  const profileTitleInput = document.getElementById('profile-title-input'); 
  const profileDescriptionInput = document.getElementById('profile-description-input');
  const profileSaveButton = document.getElementById('profile-save-button');

  profileEditForm.addEventListener('input', function() {
    const profileTitleError = document.getElementById('profile-title-error');
    const profileDescriptionError = document.getElementById('profile-description-error');
    
    // Validação do campo de nome
    if (profileTitleInput.value.length < 2 || profileTitleInput.value.length > 40) {
      profileTitleError.textContent = 'Nome deve conter entre 2 e 40 caracteres.';
    } else {
      profileTitleError.textContent = ''; // Limpa a mensagem de erro
    }

    // Configurações de validação do formulário de edição de perfil
    enableValidation({
      formSelector: "#profile-edit-form",
      inputSelector: ".modal__input",
      submitButtonSelector: "#profile-save-button",
      inactiveButtonClass: "modal__button_disabled",
      inputErrorClass: "modal__input_type_error",
      errorClass: "modal__error_visible"
    });

    // Configurações de validação do formulário de adição de cartão
    enableValidation({
      formSelector: "#add-card-form",
      inputSelector: ".modal__input",
      submitButtonSelector: "#add-card-create-button",
      inactiveButtonClass: "modal__button_disabled",
      inputErrorClass: "modal__input_type_error",
      errorClass: "modal__error_visible"
    });
  });
});

// Ouvinte de evento para fechar o pop-up clicando na sobreposição
const modals = document.querySelectorAll('.modal');
modals.forEach(modal => {
  modal.addEventListener('click', event => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const profileTitleInput = document.getElementById('profile-title-input');
  const profileTitleError = document.getElementById('profile-title-error');

  // Ouvinte de evento para verificar quando o conteúdo do campo de entrada é alterado
  profileTitleInput.addEventListener('input', function() {
    // Verifica se o campo de entrada está vazio
    if (profileTitleInput.value.trim() === '') {
      profileTitleError.textContent = 'Preencha esse campo'; // Exibe a mensagem de erro
    } else {
      profileTitleError.textContent = ''; // Limpa a mensagem de erro se o campo não estiver vazio
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const profileDescriptionInput = document.getElementById('profile-description-input');
  const profileDescriptionError = document.getElementById('profile-description-error');
  const profileSaveButton = document.getElementById('profile-save-button');

  // Ouvinte de evento para verificar quando o conteúdo do campo de descrição é alterado
  profileDescriptionInput.addEventListener('input', function() {
    // Verifica se o campo de descrição está vazio
    if (profileDescriptionInput.value.trim() === '') {
      profileDescriptionError.textContent = 'Preencha esse campo'; // Exibe a mensagem de erro
    } else {
      profileDescriptionError.textContent = ''; // Limpa a mensagem de erro se o campo não estiver vazio
    }

    // Verifica se ambos os campos estão preenchidos para habilitar o botão de salvar
    validateProfileForm();
  });

  // Função para validar o formulário de perfil
  function validateProfileForm() {
    const titleValid = profileTitleInput.value.trim() !== '';
    const descriptionValid = profileDescriptionInput.value.trim() !== '';

    // Verifica se ambos os campos estão preenchidos para habilitar o botão de salvar
    if (titleValid && descriptionValid) {
      profileSaveButton.removeAttribute('disabled');
    } else {
      profileSaveButton.setAttribute('disabled', 'true');
    }
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const cardTitleInput = document.getElementById('card-title-input');
  const cardUrlInput = document.getElementById('card-url-input');
  const cardTitleError = document.getElementById('card-title-error');
  const cardUrlError = document.getElementById('card-url-error');
  const addCardCreateButton = document.getElementById('add-card-create-button');

  cardTitleInput.addEventListener('input', function() {
    if (cardTitleInput.value.trim() === '') {
      cardTitleError.textContent = 'Please enter the place name';
    } else {
      cardTitleError.textContent = '';
    }
    validateForm();
  });

  cardUrlInput.addEventListener('input', function() {
    if (cardUrlInput.value.trim() === '') {
      cardUrlError.textContent = 'Please enter the place URL';
    } else {
      cardUrlError.textContent = '';
    }
    validateForm();
  });

  function validateForm() {
    const titleValid = cardTitleInput.value.trim() !== '';
    const urlValid = cardUrlInput.value.trim() !== '';

    if (titleValid && urlValid) {
      addCardCreateButton.removeAttribute('disabled');
    } else {
      addCardCreateButton.setAttribute('disabled', 'true');
    }
  }
});

