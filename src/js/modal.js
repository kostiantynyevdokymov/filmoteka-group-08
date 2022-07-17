import storage from "./storage";

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






/* -----------------------

Modal buttons functionality

----------------------- */

const addToWatchedBtn = backdrop.querySelector('.modal-movie__watched');
const addToQueueBtn = backdrop.querySelector('.modal-movie__queue');

const modalButtons = backdrop.querySelector('.modal-movie__buttons')

modalButtons.addEventListener('click', addMovieToLibrary);

function addMovieToLibrary(e){
  if(e.target.nodeName === 'BUTTON'){
    let action = 'save';
    const data = [];

    const key = e.target.dataset?.modalAddTo + '-list';
    const movieId = modalButtons.closest('.modal-movie').dataset.modalMovieId;

    const value = storage.load('movies')?.find(movie => movie.id.toString() === movieId);
    console.dir(value.id);

    let currentList = storage.load(key) || [];
    console.dir(currentList);


    if(storage.load(key) && storage.load(key).some(movie => movie.id === value.id)) {
      console.log('has');
      currentList = currentList.filter(movie => movie.id.toString() != value.id);
      // console.dir(storage.load(key));
      // console.dir(currentList);
    }
    else {
      console.log('add');
      currentList.push(value);
      // console.dir(currentList);
    }

      storage.save(key, currentList);
  }
}