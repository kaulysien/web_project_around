function openPopup(popupSelector) {
    const popup = document.querySelector(popupSelector);
    popup.classList.add(`${popupSelector}_opened`);
  }
  
  function closePopup(popupSelector) {
    const popup = document.querySelector(popupSelector);
    popup.classList.remove(`${popupSelector}_opened`);
  }
  
  function addPopupCloseListeners(popupSelectors) {
    popupSelectors.forEach((popupSelector) => {
      const popup = document.querySelector(popupSelector);
      popup.addEventListener('click', (event) => {
        if (event.target.classList.contains(`${popupSelector}_opened`)) {
          closePopup(popupSelector);
        }
      });
    });
  }
  
  function addEscapeKeyCloseListener(callback) {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        callback();
      }
    });
  }
  
  function showImagePopup(imageSrc, imageAlt) {
    const popupImage = document.querySelector('.popup-view-image__render-image');
    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    openPopup('.popup-view-image');
  }
  
  function addImageClickListeners(elementsSelector, cardSelector) {
    const elements = document.querySelectorAll(elementsSelector);
    elements.forEach((element) => {
      const image = element.querySelector(cardSelector);
      image.addEventListener('click', () => {
        showImagePopup(image.src, image.alt);
      });
    });
  }
  
  function addLikeFunctionality(elementsSelector, likeIconSelector) {
    const elements = document.querySelectorAll(elementsSelector);
    elements.forEach((element) => {
      const likeIcon = element.querySelector(likeIconSelector);
      likeIcon.addEventListener('click', () => {
        likeIcon.classList.toggle('elements__like-icon_active');
      });
    });
  }
  
  function removeCard(cardElement) {
    cardElement.parentNode.removeChild(cardElement);
  }
  
  function addDeleteFunctionality(elementsSelector, deleteIconSelector) {
    const elements = document.querySelectorAll(elementsSelector);
    elements.forEach((element) => {
      const deleteIcon = element.querySelector(deleteIconSelector);
      deleteIcon.addEventListener
    });
}