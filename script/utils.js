import {
  profileButton,
  formEdit,
  formOpen,
  formClose,
  formElement,
  nameInput,
  jobInput,
  nameProfile,
  jobProfile,
  cardButton,
  cardOpen,
  cardClose,
  cardOut,
  zoomOpen,
  zoom,
} from './index.js';

// POPUP PROFILE //

profileButton.addEventListener("click", function(){
  formOpen.style.display = 'flex';
});

formClose.addEventListener("click", function(){
  formOpen.style.display = 'none';
});

formEdit.addEventListener("click", function(e) {
  if(e.target == formEdit) {
    formOpen.style.display = 'none';
  }
});

// POPUP CARD //

cardButton.addEventListener("click", function(){
  cardOpen.style.display = 'flex';
});

cardClose.addEventListener("click", function(){
  cardOpen.style.display = 'none';
});

cardOut.addEventListener("click", function(e) {
  if(e.target == cardOut) {
    cardOpen.style.display = 'none';
  }
});

// POPUP ZOOM //

zoom.addEventListener("click", function(e) {
  if(e.target == zoom) {
    zoomOpen.style.display = 'none';
  }
});

// ESC key

function escEventListener(event) {
  if (event.key === "Escape") {
    formOpen.style.display = 'none';
    cardOpen.style.display = 'none';
    zoomOpen.style.display = 'none';
  }
}

document.addEventListener('keydown', escEventListener);