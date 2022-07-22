import storage from './storage';
import { rewrite } from './checkStoradgeAfterModal';

export const backdrop = document.querySelector('[data-modal]');
export const closeButton = document.querySelector('[data-modal-close]');
export const cardsContainer = document.querySelector('.movies-container');

export let shouldRewrite = false;

cardsContainer.addEventListener('click', e => {
  //Тиць по 'js-modal-open' -> відкриває модалку
  if (e.target.closest('.js-modal-open')) {
    e.preventDefault();
    openModal(e.target.closest('.js-modal-open').dataset.cardMovieId);
  }
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
    addMovieToLibrary(e.target.closest('.movie-btn'));
    ///changes in lib
    shouldRewrite = true;
    ///
  }
}

// Якщо модалка відкрита -> кидаємо AddEventListener
function openModal(movieId) {
  document.addEventListener('keydown', pressEsc);

  backdrop.querySelector('.modal-movie').dataset.modalMovieId = movieId;
  backdrop.querySelector('.modal-movie').innerHTML = getModalMovieMarkup(movieId);
  document.body.style.overflow = 'hidden';
  backdrop.classList.remove('is-hidden');
  const vote_average = backdrop.querySelector('#out').textContent;
  outNum(vote_average, '#out');
}

function getMovieFromLocalStorage(movieId, key) {
  return storage.load(key)?.find(movie => movie.id.toString() === movieId);
}

// Як тільки закривається модалка -> знімаємо EventListener
function closeModal() {
  storage.remove('current-movie');
  document.addEventListener('keydown', pressEsc);
  document.body.style.overflow = '';
  backdrop.classList.add('is-hidden');
  ///changes in lib
  rewrite();
  ///
}

function getModalMovieMarkup(movieId) {
  const currentMovie =
    getMovieFromLocalStorage(movieId, 'movies') ||
    getMovieFromLocalStorage(movieId, 'watched-list') ||
    getMovieFromLocalStorage(movieId, 'queue-list');

  storage.save('current-movie', currentMovie);

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
  } = currentMovie;

  movieId = movieId.toString();

  let addedClass = isInLibrary('watched-list', movieId.toString()) ? 'added' : '';
  const btnAddToWatched = `<div class="modal-movie__btn movie-btn movie-btn--watched ${addedClass}" data-modal-add-to="watched">
                          <div class="movie-btn__inner">
                            <button class="remove">REMOVE FROM<br>WATCHED</button>
                            <button class="add">ADD TO<br>WATCHED</button>
                          </div>
                        </div>`;

  addedClass = isInLibrary('queue-list', movieId.toString()) ? 'added' : '';
  const btnAddToQueue = `<div class="modal-movie__btn movie-btn movie-btn--queue ${addedClass}" data-modal-add-to="queue">
                          <div class="movie-btn__inner">
                            <button class="remove">REMOVE FROM<br>QUEUE</button>
                            <button class="add">ADD TO<br>QUEUE</button>
                          </div>
                        </div>`;

  return `<div class="modal-movie__poster">
            <img src='https://image.tmdb.org/t/p/w500${poster_path}' alt="${title}" />
          </div>
            <div class="modal-movie__info">
                <h2 class="modal-movie__title">${title}</h2>
                <table class="movie-table">
                    <tr>
                        <td class="movie-table__title">Vote / Votes</td>
                        <td class="movie-table__info">
                            <span id="out" class="vote">${vote_average.toFixed(1)}</span>
                            <span>/</span>
                            <span class="votes">${vote_count}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="movie-table__title">Popularity</td>
                        <td class="movie-table__info">${popularity.toFixed(0)}</td>
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
                <div class="modal-movie__box">
                <div class="modal-movie__about">
                    <p class="modal-movie__description">ABOUT</p>
                    <p class="modal-movie__text">${overview}</p>
                </div>
                <div class="modal-movie__buttons">
                    ${btnAddToWatched}
                    ${btnAddToQueue}
                </div>
                </div>
            </div>`;
}

/* -----------------------

Modal buttons functionality

----------------------- */

function addMovieToLibrary(button) {
  const key = button.dataset?.modalAddTo + '-list';
  // const movieId = button.closest('.modal-movie').dataset.modalMovieId;

  const SOURCE_KEY = 'current-movie';

  const value = storage.load(SOURCE_KEY);

  if (storage.load(key) && isInLibrary(key, value.id.toString())) {
    removeFromStorage(key, value, button);
  } else {
    if (key.includes('watch') && isInLibrary('queue-list', value.id.toString())) {
      console.log('already in queue');
      removeFromStorage(
        'queue-list',
        value,
        button.parentElement.querySelector('.movie-btn--queue')
      );
    }
    addToStorage(key, value, button);
  }
}

function addToStorage(key, value, button) {
  ///changes in lib
  shouldRewrite = true;
  ///
  let currentList = storage.load(key) || [];
  currentList.push(value);
  button.classList.add('added');
  storage.save(key, currentList);
}

function removeFromStorage(key, value, button) {
  ///changes in lib
  shouldRewrite = true;
  ///
  let currentList = storage.load(key) || [];
  button.classList.remove('added');
  currentList = currentList.filter(movie => movie.id.toString() != value.id);
  storage.save(key, currentList);
}

function isInLibrary(storageKey, valueId) {
  return storage.load(storageKey)?.some(movie => movie.id.toString() === valueId);
}

function outNum(num, elem) {
  const time = 2500;
  const step = 0.1;
  let e = document.querySelector('#out');
  let n = 0;
  let t = Math.round(time / (num / step));
  let interval = setInterval(() => {
    n = n + step;
    if (n >= num) {
      clearInterval(interval);
    }
    e.innerHTML = n.toFixed(1);
  }, t);
}

export function getGenres(genre_ids, maxGenresCount) {
  const genres = storage.load('arrow');
  const genreArr = [];
  for (
    let genreIndex = 0;
    genreIndex < genre_ids.length && genreIndex < maxGenresCount;
    genreIndex++
  ) {
    for (const value of genres) {
      if (genre_ids[genreIndex] === value.id) {
        genreArr.push(value.name);
      }
    }
  }
  if (genre_ids.length > maxGenresCount) genreArr[maxGenresCount - 1] = 'Other';
  return genreArr.join(', ');
}
