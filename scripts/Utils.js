import Card from "./Card.js";

export const popup = document.querySelector(".popup");
export const titleHeader = document.querySelector(".header__title");
export const subtitle = document.querySelector(".header__subtitle");


export const inputName = document.querySelector(".popup__input-name");
export const inputWork = document.querySelector(".popup__input-work");


export const originalTwoTitle = popup.querySelector(".popup__title").textContent;
export const twoTitle = popup.querySelector(".popup__title");

export let isEditMode = false;

export  const modal = document.querySelector(".modal");
export  const modalImg = document.querySelector(".modal__content");
export  const images = document.querySelectorAll('.main__images');
export  const span = document.querySelector(".modal__close");

export  const buttonAdd = document.querySelector(".header__container-button");
export  const edit = document.querySelector(".header__icono");
export  const hidden = document.querySelector(".popup__close");
export  const saveInfo = document.querySelector(".popup__button-container");


export const mainContainer = document.querySelector('.main__container');
export const cardTemplate = '.template-card';
  


  function open() {
    isEditMode = true;
    popup.classList.toggle("popup_show");
    const titleCapture = titleHeader.textContent;
    inputName.value = titleCapture;
            
    const subtitleCapture = subtitle.textContent;
    inputWork.value = subtitleCapture;
    twoTitle.textContent = originalTwoTitle;

    if (!isEditMode) {
      inputWork.removeAttribute('pattern');
    }
  }
        
  function closee() {
    popup.classList.remove("popup_show");
    inputWork.removeAttribute('pattern'); 
  }

        
  function save(){
    if(isEditMode) {
      const nameCapture = inputName.value
      titleHeader.textContent = nameCapture         
      const workCapture = inputWork.value
      subtitle.textContent = workCapture

    } else {
      inputWork.removeAttribute('pattern');   
      const newCard = new Card(inputName.value,inputWork.value, cardTemplate);
      mainContainer.prepend(newCard.generateCard());
    }
            
    popup.classList.remove("popup_show"); 
  }
        
  function addCard() {
    isEditMode = false;
    popup.classList.toggle("popup_show");
            
    inputName.value = "";
    twoTitle.textContent = "New Place";
    inputWork.value = "";
    inputWork.setAttribute("pattern", "https?://.+");
    inputName.placeholder = "Title";
    inputWork.placeholder = "Image URL";
    inputName.setAttribute('maxlength', '30');
    inputWork.removeAttribute("minlength");
    inputWork.removeAttribute("maxlength");
  }


  function handleKeyPress(event) {
    if (event.key === 'Enter' && popup.classList.contains("popup_show") && areInputsValid()) {
      save();
    }
  }

  function areInputsValid() {
    return isValidInput(inputName) && isValidInput(inputWork);
  }

  function isValidInput(input) {
    return input.validity.valid;
  }

     
        
  function closeModal() { 
    modal.classList.remove("modal_show");
  }
        


  const popupOverlay =document.querySelector(".popup__overlay")
  let popupShowParent;
  
   function closeWindows() {
    popupOverlay.addEventListener('click', function(event) {
      if (event.target === popupOverlay) {
        popupShowParent = popupOverlay.closest('.popup_show');
        popupShowParent.classList.remove('popup_show');
      }
    });
    
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.classList.remove('modal_show');
      }
    });  
  }
  


    export {open, closee , save, handleKeyPress, addCard,closeModal,closeWindows}