const backdrop = document.querySelector('[data-modal]');
const closeButton = document.querySelector('[data-modal-close]');


const cardsContainer = document.querySelector('.home-container');
cardsContainer.addEventListener('click', e =>{
  //Тиць по 'js-modal-open' -> відкриває модалку
  if(e.target.closest('.js-modal-open')) openModal();
})


// Тиць по 'data-modal-close' ->закриває модалку
closeButton.addEventListener('click', closeModal);

//Press по Esc ->закриває модалку
function pressEsc(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

// Тиць по backdrop -> закриває модалку
backdrop.addEventListener('click', BackdropClick);
function BackdropClick(e) {
  if (e.currentTarget === e.target) {
    closeModal();
  }
}

// Якщо модалка відкрита -> кидаємо AddEventListener
function openModal() {
  document.addEventListener('keydown', pressEsc);
  backdrop.classList.remove('is-hidden');
}

// Як тільки закривається модалка -> знімаємо EventListener
function closeModal() {
  document.addEventListener('keydown', pressEsc);
  backdrop.classList.add('is-hidden');
}
