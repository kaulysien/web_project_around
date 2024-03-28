// Função para abrir um modal
export const openModal = (modalSelector) => {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('popup_opened');
    document.addEventListener('keydown', closeModalOnEscape);
}

// Função para fechar um modal
export const closeModal = (modalSelector) => {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeModalOnEscape);
}

// Função para fechar o modal quando a tecla Esc for pressionada
const closeModalOnEscape = (evt) => {
    if (evt.key === 'Escape') {
        const openedModal = document.querySelector('.popup_opened');
        closeModal(`.${openedModal.classList[0]}`);
    }
}

