import storage from './storage';

const backdrop = document.querySelector('[data-modal]');
const closeButton = document.querySelector('[data-modal-close]');
const cardsContainer = document.querySelector('.home-container');

cardsContainer.addEventListener('click', e => {
  //Тиць по 'js-modal-open' -> відкриває модалку
  if (e.target.closest('.js-modal-open'))
    openModal(e.target.closest('.js-modal-open').dataset.cardMovieId);
});

// Тиць по 'data-modal-close' ->закриває модалку
closeButton.addEventListener('click', closeModal);

//Press по Esc ->закриває модалку
function pressEsc(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

// Тиць по backdrop -> закриває модалку
backdrop.addEventListener('click', backdropClick);

function backdropClick(e) {
  if (e.currentTarget === e.target) {
    closeModal();
    return;
  }
  if (e.target.nodeName === 'BUTTON') {
    addMovieToLibrary(e.target);
  }
}

// Якщо модалка відкрита -> кидаємо AddEventListener
function openModal(movieId) {
  document.addEventListener('keydown', pressEsc);

  backdrop.querySelector('.modal-movie').dataset.modalMovieId = movieId;
  backdrop.querySelector('.modal-movie').innerHTML = getModalMovieMarkup(movieId);
  backdrop.classList.remove('is-hidden');
}

// Як тільки закривається модалка -> знімаємо EventListener
function closeModal() {
  document.addEventListener('keydown', pressEsc);
  backdrop.classList.add('is-hidden');
}

function getModalMovieMarkup(movieId) {
  const {
    poster_path,
    title,
    original_title,
    genres_ids,
    release_date,
    vote_average,
    vote_count,
    popularity,
    overview,
  } = storage.load('movies')?.find(movie => movie.id.toString() === movieId);

  return `<img class="modal-movie__poster" src='https://image.tmdb.org/t/p/w500${poster_path}' alt="${title}" />
            <div class="modal-movie__info">
                <h2 class="modal-movie__title">${title}</h2>
                <table class="movie-table">
                    <tr>
                        <td class="movie-table__title">Vote / Votes</td>
                        <td class="movie-table__info">
                            <span class="vote">${vote_average}</span>
                            <span>/</span>
                            <span class="votes">${vote_count}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="movie-table__title">Popularity</td>
                        <td class="movie-table__info">${popularity}</td>
                    </tr>
                    <tr>
                        <td class="movie-table__title">Original Title</td>
                        <td class="movie-table__info">${original_title}</td>
                    </tr>
                    <tr>
                        <td class="movie-table__title">Genre</td>
                        <td class="movie-table__info">${genres_ids}</td>
                    </tr>
                </table>
                <div class="modal-movie__about">
                    <p class="modal-movie__description">ABOUT</p>
                    <p class="modal-movie__text">${overview}</p>
                </div>
                <div class="modal-movie__buttons">
                    <button class="modal-movie__watched" data-modal-add-to="watched">ADD TO<br>WATCHED</button>
                    <button class="modal-movie__queue" data-modal-add-to="queue">ADD TO <br> QUEUE</button>
                </div>
            </div>`;
}

/* -----------------------

Modal buttons functionality

----------------------- */

function addMovieToLibrary(button) {
  const key = button.dataset?.modalAddTo + '-list';
  const movieId = button.closest('.modal-movie').dataset.modalMovieId;

  const value = storage.load('movies')?.find(movie => movie.id.toString() === movieId);
  // console.dir(value.id);

  let currentList = storage.load(key) || [];
  console.dir(currentList);

  if (storage.load(key) && storage.load(key).some(movie => movie.id === value.id)) {
    console.log('has');
    currentList = currentList.filter(movie => movie.id.toString() != value.id);
  } else {
    console.log('add');
    currentList.push(value);
  }

  storage.save(key, currentList);
}
