import "./index.css";

import PopupWithForm from "../components/PopupWithForm.js";
import {
  api,
  createPosts,
  enableValidationForm,
  getAllCards,
  resetValidationForm,
  setInputsProfile,
} from "../utils/utils.js";
import { userInfo } from "../utils/utils.js";

getAllCards();

userInfo
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res);
    userInfo.setAvatar(res.avatar);
  })
  .catch(console.log);

// submits
function submitPost(form) {
  const post = {
    name: form.title.value,
    link: form.image.value,
  };

  const buttonSubmit = form.querySelector("button[type=submit]");
  buttonSubmit.textContent = "Criando...";

  return api
    .postCard(post)
    .then((res) => {
      createPosts([res], "prepend");
      resetValidationForm(form);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      buttonSubmit.textContent = "Criar";
    });
}

function submitProfile(form) {
  const newUserInfo = {
    name: form.name.value,
    about: form.about.value,
  };

  const buttonSubmit = form.querySelector("button[type=submit]");
  buttonSubmit.textContent = "Salvando...";

  return api
    .editUser(newUserInfo)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .catch(console.log)
    .finally(() => {
      buttonSubmit.textContent = "Salvar";
    });
}

function submitAvatar(form) {
  const buttonSubmit = form.querySelector("button[type=submit]");
  buttonSubmit.textContent = "Salvando...";
  return api
    .editAvatar({ avatar: form.link.value })
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      resetValidationForm(form);
    })
    .catch(console.log)
    .finally(() => {
      buttonSubmit.textContent = "Salvar";
    });
}

const popupFormPost = new PopupWithForm(".popup_add-place", {
  triggerSelector: ".profile__btn-add",
  submitForm: (form) => {
    submitPost(form).then(() => {
      popupFormPost.close();
    });
  },
  onClose: () => {
    resetValidationForm(popupFormPost.getForm());
  },
  onStart: () => {
    enableValidationForm(popupFormPost.getForm());
  },
});
popupFormPost.setPopup();

const popupFormProfile = new PopupWithForm(".popup_edit-profile", {
  triggerSelector: ".profile__btn-edit",
  submitForm: (form) => {
    submitProfile(form).then(() => {
      popupFormProfile.close();
    });
  },
  onOpen: () => {
    resetValidationForm(popupFormProfile.getForm());
    setInputsProfile(popupFormProfile.getPopup());
  },
  onStart: () => {
    enableValidationForm(popupFormProfile.getForm());
  },
});
popupFormProfile.setPopup();

const popupFormAvatar = new PopupWithForm(".popup_edit-avatar", {
  triggerSelector: ".profile__btn-avatar-edit",
  submitForm: (form) => {
    submitAvatar(form).then(() => {
      popupFormAvatar.close();
    });
  },
  onOpen: () => {
    resetValidationForm(popupFormAvatar.getForm());
  },
  onStart: () => {
    enableValidationForm(popupFormAvatar.getForm());
  },
});
popupFormAvatar.setPopup();
