// likeButton
const handleLikeButtons = () => {
  const likeButtons = document.querySelectorAll(".elements__like-icon");

  likeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (button.getAttribute("src") === "./images/like-button.png") {
        return button.setAttribute("src", "./images/like-button-clicked.png");
      }

      return button.setAttribute("src", "./images/like-button.png");
    });
  });
};

const handleNewLikeButton = (button) => {
  button.addEventListener("click", (e) => {
    if (button.getAttribute("src") === "./images/like-button.png") {
      return button.setAttribute("src", "./images/like-button-clicked.png");
    }

    return button.setAttribute("src", "./images/like-button.png");
  });
};

// deleteButton
const handleDeleteButtons = () => {
  const deleteButton = document.querySelectorAll(".elements__delete-icon");

  deleteButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      const elements = document.querySelector(".elements");
      const card = e.target.offsetParent;

      elements.removeChild(card);
    });
  });
};

const handleNewDeleteButton = (button) => {
  button.addEventListener("click", (e) => {
    const elements = document.querySelector(".elements");
    const card = e.target.offsetParent;

    elements.removeChild(card);
  });
};

// initialCards
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

const cardImgs = document.querySelectorAll(".elements__card-image");
const cardTitles = document.querySelectorAll(".elements__card-name");

initialCards.forEach((card, index) => {
  cardImgs[index].setAttribute("src", card.link);
  cardImgs[index].setAttribute("alt", `Imagem do ${card.name}`);
  cardTitles[index].innerText = card.name;
});

handleLikeButtons();
handleDeleteButtons();

// popupAddCardOpenAndCloseButton
const addCardButton = document.querySelector(".profile__add-card-icon");
const popupAddCards = document.querySelector(".popup-add-card");
const closePopupAddCardButton = document.querySelector(
  ".popup-add-card__close-button"
);

addCardButton.addEventListener("click", () => {
  popupAddCards.classList.add("popup-add-card_opened");
});

closePopupAddCardButton.addEventListener("click", () => {
  popupAddCards.classList.remove("popup-add-card_opened");
});

// popupOpenAndCloseButton
const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__close-button");

editButton.addEventListener("click", () => {
  popup.classList.add("popup_opened");
});

closePopupButton.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
});

// popupViewImage
const popupViewImage = document.querySelector(".popup-view-image");
const closePopupViewImageButton = document.querySelector(
  ".popup-view-image__close-button"
);

const handleViewImageOnPopup = () => {
  const elementsCards = document.querySelectorAll(".elements__card");

  elementsCards.forEach((card) => {
    const image = card.childNodes[3];
    const title = card.childNodes[5].children[0].textContent;
    const popupImage = document.querySelector(
      ".popup-view-image__render-image"
    );
    const poputTitle = document.querySelector(".popup-view-image__image-title");

    image.addEventListener("click", (e) => {
      popupViewImage.classList.add("popup-view-image_opened");

      const imageSource = image.getAttribute("src");
      const imageAlt = image.getAttribute("alt");
      popupImage.setAttribute("src", imageSource);
      popupImage.setAttribute("alt", imageAlt);
      poputTitle.textContent = title;
    });

    closePopupViewImageButton.addEventListener("click", () => {
      popupViewImage.classList.remove("popup-view-image_opened");
    });
  });
};

handleViewImageOnPopup();

// handlerEditProfileForm
const editProfileForm = document.querySelector(".popup__form");
const profileName = document.querySelector(".profile__name");
const profileRole = document.querySelector(".profile__role");

const inputName = document.querySelector("#input-name");
const inputRole = document.querySelector("#input-role");
const saveButton = document.querySelector(".popup__save-button");

editProfileForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

saveButton.addEventListener("click", () => {
  const newName = inputName.value;
  const newRole = inputRole.value;

  profileName.innerText = newName;
  profileRole.innerText = newRole;

  inputName.value = newName;
  inputRole.value = newRole;

  popup.classList.remove("popup_opened");
});

// handlerCreateNewCardForm
const addCardForm = document.querySelector(".popup-add-card");
const title = document.querySelector(".profile__name");
const image = document.querySelector(".profile__role");

const inputTitle = document.querySelector("#input-location-name");
const inputImage = document.querySelector("#input-image");
const createButton = document.querySelector(".popup-add-card__create-button");

const cards = document.querySelector(".elements").children;

addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newCard = cards[0].cloneNode(true);

  newCard.childNodes[2].nextSibling.src = inputImage.value;
  newCard.childNodes[2].nextSibling.alt = `Imagem do ${inputTitle.value}`;
  newCard.childNodes[5].children[0].innerText = inputTitle.value;

  document.querySelector(".elements").prepend(newCard);

  const likeButton = document.querySelector(".elements__like-icon");
  const deleteButton = document.querySelector(".elements__delete-icon");

  inputImage.value = "";
  inputTitle.value = "";

  handleNewLikeButton(likeButton);
  handleNewDeleteButton(deleteButton);
  handleViewImageOnPopup();
});

createButton.addEventListener("click", () => {
  addCardForm.classList.remove("popup-add-card_opened");
});
