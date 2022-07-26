import storage from './storage';
import {
  POPULAR_STORAGE_KEY,
  STORAGE_MOVIES_SEARCH,  
  STORAGE_PAGE_KEY,
} from './storageKeys';
import { removeSceletonLoad } from './sceletonLoad';
import { getGenres } from './modal';
import { currentFirstBtn, correctWorkOfPag, correctSubmitPag } from './pagination';
import {btn1Ref, btn2Ref, btn3Ref, btn4Ref, btn5Ref, firstPageRef, lastPageRef, rightArrowRef, leftArrowRef, prevDotsRef, afterDotsRef} from './pagBtnsVar';

const formField = document.querySelector('.form-field');
const homeList = document.querySelector('.home-list');
const spinner = document.querySelector('.spinner-loader');
const textError = document.querySelector('.search-result');
let movieName = '';
const buttons = [btn1Ref, btn2Ref, btn3Ref, btn4Ref, btn5Ref, firstPageRef, lastPageRef, rightArrowRef, leftArrowRef, prevDotsRef, afterDotsRef]
const numberButtons = [btn1Ref, btn2Ref, btn3Ref, btn4Ref, btn5Ref]



formField?.addEventListener('submit', event => {
buttons.forEach(el => el.hidden = false);

  let currentPage = 1;
  event.preventDefault();
  textError.classList.add('search-result--hidden');
  spinner.classList.remove('is-hidden');
  movieName = formField.elements.query.value.trim();
  storage.remove(POPULAR_STORAGE_KEY);
  if (movieName === '') {
    spinner.classList.add('is-hidden');
    return alert('Empty field');
  }
  fetchMovies(movieName, currentPage).then(({ movies, lastPage }) => {
      
    

    if (movies.length === 0) {
      spinner.classList.add('is-hidden');
      textError.classList.remove('search-result--hidden');
      setTimeout(() => textError.classList.add('search-result--hidden'), 4000);
      return;
    }
    storage.save(STORAGE_MOVIES_SEARCH, movieName);
    storage.save('movies', movies);
    lastPageRef.textContent = lastPage;


    correctSubmitPag(lastPage);




    homeList.innerHTML = movieCards(movies);
    setTimeout(() => {
      spinner.classList.add('is-hidden');
    }, 2000);
    removeSceletonLoad();
    currentFirstBtn();
  });
});

export function movieCards(movies) {
  return movies
    .map(({ id, poster_path, title, original_title, genre_ids, release_date }) => {
      const imgUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : // : './images/netuNichego.png';
          'https://via.placeholder.com/395x574/FFFFFF/FF001B?text=No+poster';

      const year = release_date ? `<span>${new Date(release_date).getFullYear()}</span>` : '';
      return `<li class="home-card js-modal-open placeholdify" data-card-movie-id="${id}">
            <a href="#" class="home-card__link">
                <div class="card-info">
                    <img class="home-card__img" src="${imgUrl}" alt="${title}">
                    <h2 class="card-info__title">${original_title}</h2>
                    <p class="card-info_descr">
                        ${genre_ids.length ? `<span>${getGenres(genre_ids, 3)}</span>` : ''}
                        ${genre_ids.length && year ? ' | ' : ''}
                        ${year ? year : ''}
                    </p>
                </div>
            </a>
        </li>`;
    })
    .join('');
}
async function fetchMovies(movieName, currentPage) {
  const searchParams = new URLSearchParams({
    api_key: '659c146febfafc17fd54baa17527f7fa',
    language: 'en-US',
    query: movieName,
  });

  return fetch(`https://api.themoviedb.org/3/search/movie?${searchParams}&page=${currentPage}`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then(data => {
      return {
        lastPage: data.total_pages,
        movies: data.results,
      };
    });
}

//load last page search

export function loadFetchMovies(currentPage) {
  textError.classList.add('search-result--hidden');
  spinner.classList.remove('is-hidden');
  movieName = storage.load(STORAGE_MOVIES_SEARCH);
  storage.save(STORAGE_PAGE_KEY, currentPage);
  if (movieName === '') {
    spinner.classList.add('is-hidden');
    return alert('Empty field');
  }
  fetchMovies(movieName, currentPage).then(({ movies, lastPage }) => {
    buttons.forEach(el => el.hidden = false);

    if (movies.length === 0) {
      spinner.classList.add('is-hidden');
      return alert('Empty field');
    }
    storage.save('movies', movies);
    lastPageRef.textContent = lastPage;

    
    correctWorkOfPag(currentPage, lastPage);
      
    correctSubmitPag(lastPage);
    

    if (Number(btn1Ref.textContent) === Number(currentPage) && Number(btn1Ref.textContent) !== 1) {
      leftArrowRef.hidden = false;
      prevDotsRef.hidden = false;
      firstPageRef.hidden = false;
    }

    

    


    homeList.innerHTML = movieCards(movies);
    setTimeout(() => {
      spinner.classList.add('is-hidden');
    }, 2000);
    removeSceletonLoad();
  });
}
