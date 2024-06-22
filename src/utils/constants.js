export const aboutSelector = ".profile__about";
export const nameSelector = ".profile__name";
export const avatarSelector = ".profile__avatar";

export const postListSelector = ".posts__list";
export const cardSelector = "#posts__item";

// images
import imgPaoDeAcucar from "../images/pao-de-acucar-rj.jpg";
import imgDedoDeDeus from "../images/dedo-de-deus-rj.jpg";
import imgCristoRedentor from "../images/cristo-redentor-rj.jpg";
import imgBuzios from "../images/buzios-rj.jpg";
import imgSaoPaulo from "../images/sao-paulo-sp.jpg";
import imgArraialDoCabo from "../images/arraial-do-cabo-rj.jpg";

// cards iniciais
export const initialCards = [
  {
    name: "Pão de Açúcar, RJ",
    link: imgPaoDeAcucar,
  },
  {
    name: "Dedo de Deus, RJ",
    link: imgDedoDeDeus,
  },
  {
    name: "Cristo Redentor, RJ",
    link: imgCristoRedentor,
  },
  {
    name: "Búzios, RJ",
    link: imgBuzios,
  },
  {
    name: "São Paulo",
    link: imgSaoPaulo,
  },
  {
    name: "Arraial do Cabo, RJ",
    link: imgArraialDoCabo,
  },
];

// opções de validação de formulário
export const validateOptions = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn-submit",
  inactiveButtonClass: "popup__btn-submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error",
  errorClassVisible: "popup__error_visible",
};
