/** @format */

const overlay = document.querySelector(".overlay");
const buttonChangeHandler = document.querySelector(".profile__square");
const closeButton = document.querySelector(".form__close-button");
const rectangleAdd = document.querySelector(".profile__rectangle");
const formAdd = document.querySelector(".form-places__container");
const formClose = document.querySelector(".form-places__close");
const form = document.querySelector(".form__container");

export const overlayTrue = () => {
  overlay.classList.remove("overlay");
  overlay.classList.add("overlay__active");
};

export const overlayFalse = () => {
  overlay.classList.remove("overlay__active");
  overlay.classList.add("overlay");
};

const formTrue = () => {
  form.classList.remove("form__container");
  form.classList.add("form__container_active");
  console.log("teste formTrue");
};

export const formFalse = () => {
  form.classList.remove("form__container_active");
  form.classList.add("form__container");
  console.log("teste formFalse");
};

export const closeButtonTrue = () => {
  closeButton.classList.remove("form__close-button");
  closeButton.classList.add("form__close-button_active");
};

export const closeButtonFalse = () => {
  closeButton.classList.remove("form__close-button_active");
  closeButton.classList.add("form__close-button");
};

export const formAddActive = () => {
  formAdd.classList.remove("form-places__container");
  formAdd.classList.add("form-places__container_active");
};

export const formAddDesative = () => {
  formAdd.classList.remove("form-places__container_active");
  formAdd.classList.add("form-places__container");
};

export const closeFormActive = () => {
  formClose.classList.remove("form-places__close");
  formClose.classList.add("form-places__close_active");
};

export const closeFormDesative = () => {
  formClose.classList.remove("form-places__close_active");
  formClose.classList.add("form-places__close");
};

buttonChangeHandler.addEventListener("click", () => {
  formTrue();
  overlayTrue();
  closeButtonTrue();
});

rectangleAdd.addEventListener("click", () => {
  overlayTrue();
  formAddActive();
  closeFormActive();
});

closeButton.addEventListener("click", () => {
  overlayFalse();
  formFalse();
  closeButtonFalse();
  closeFormDesative();
});

formClose.addEventListener("click", () => {
  overlayFalse();
  formAddDesative();
  closeFormDesative();
});

export const closeByOverlay = () => {
  overlayFalse();
  formAddDesative();
  formFalse();
  closeButtonFalse();
  closeFormDesative();
  console.log("teste overlay");
};
