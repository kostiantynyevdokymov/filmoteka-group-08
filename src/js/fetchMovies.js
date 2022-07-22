import storage from './storage';
import {POPULAR_STORAGE_KEY, STORAGE_MOVIES_SEARCH, storageLastSearchText ,STORAGE_PAGE_KEY} from './storageKeys';
import { removeSceletonLoad } from './sceletonLoad';

const formField = document.querySelector('.form-field');
const homeList = document.querySelector('.home-list');
const spinner = document.querySelector('.spinner-loader');
const textError = document.querySelector('.search-result');
let movieName = '';

formField?.addEventListener('submit', event => {
  event.preventDefault();
  textError.classList.add('is-hidden');
  spinner.classList.remove('is-hidden');
  movieName = formField.elements.query.value.trim(); 
  storage.remove(POPULAR_STORAGE_KEY);
  if (movieName === '') {
    spinner.classList.add('is-hidden');
    return alert('Empty field');
  }
  fetchMovies(movieName).then(({ movies }) => {
    if (movies.length === 0) {
      spinner.classList.add('is-hidden');
      textError.classList.remove('is-hidden');
      return;
    }
    storage.save(STORAGE_MOVIES_SEARCH,{movie: movieName});
    storage.save('movies', movies);
    homeList.innerHTML = movieCards(movies);
   setTimeout(() => { spinner.classList.add('is-hidden') }, 2000);
    removeSceletonLoad();
  });
});

export function movieCards(movies) {
  return movies
    .map(({ id, poster_path, title, original_title, genres_ids, release_date }) => {
      const imgUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : // : './images/netuNichego.png';
          'https://via.placeholder.com/395x574/FFFFFF/FF001B?text=No+poster';
      const year = new Date(release_date).getFullYear();
      return `<li class="home-card js-modal-open placeholdify" data-card-movie-id="${id}">
            <a href="#" class="home-card__link">
                <div class="card-info">
                    <img class="home-card__img" src="${imgUrl}" alt="${title}">
                    <h2 class="card-info__title">${original_title}</h2>
                    <p class="card-info_descr">
                        <span>${genres_ids}</span>
                        |
                        <span>${year}</span>
                    </p>
                </div>
            </a>
        </li>`;
    })
    .join('');
}
   
 

async function fetchMovies(movieName,page) {
  const searchParams = new URLSearchParams({
    api_key: '659c146febfafc17fd54baa17527f7fa',
    language: 'en-US',
    query: movieName,
  });

  return fetch(`https://api.themoviedb.org/3/search/movie?${searchParams}&page=${page}`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then(data => {
      return {
        movies: data.results,
      };
    });
      
}


//load last page search
export function loadFetchMovies(currentPage) {
    textError.classList.add('is-hidden');
    spinner.classList.remove('is-hidden');
    movieName = storageLastSearchText?.movie;
   document.querySelector('.js-search-form').value = movieName;  
    if (currentPage !== undefined)
    { storage.save(STORAGE_PAGE_KEY, currentPage); };    
    if (movieName === '') {
      spinner.classList.add('is-hidden');
      return alert('Empty field');
    }
    fetchMovies(movieName, currentPage).then(({ movies }) => {
      if (movies.length === 0) {
        spinner.classList.add('is-hidden');
        textError.classList.remove('is-hidden');
        return;
      }
      storage.save('movies', movies);
      homeList.innerHTML = movieCards(movies);
     setTimeout(() => { spinner.classList.add('is-hidden') }, 2000);
     removeSceletonLoad();    
    });
  };

 

