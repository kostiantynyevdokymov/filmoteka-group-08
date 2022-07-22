import storage from './storage';
import { POPULAR_STORAGE_KEY, popularStoragePage } from './pageInStorage';
import { removeSceletonLoad } from './sceletonLoad';

const KEY = '659c146febfafc17fd54baa17527f7fa';
const homeList = document.querySelector('.home-list');
const API_URL_POPULAR = `https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}`;


async function fetchFilms(API_URL_POPULAR) {

  let response = await fetch(
    `${API_URL_POPULAR}`
  );
  return response.json();
}

async function fetchGenres() {
  let response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`
  );
  return response.json();
}

fetchGenres().then(({ genres }) => {
  const arr = [...genres];
  localStorage.setItem('arrow', JSON.stringify(arr));
});
const values = storage.load('arrow');


 fetchFilms(API_URL_POPULAR).then(({ results }) => {

  results.poster_path;


  const mark = results
    .map(
      ({
        id,
        poster_path,
        title,
        original_title,
        genre_ids,
        release_date,
        original_name,
        first_air_date,
      }) => {
        const genreArr = [];
        let other = '';
        for (const genreId of genre_ids) {
          for (const value of values) {
            if (genreId === value.id) {
              genreArr.push(value.name);
              if (genre_ids.length > 2) {
                other = ',Other';
              }
            }
          }
        }

        let a = release_date;

        let b = first_air_date;
        if (release_date) {
          a = a.slice(0, 4);
        }
        if (first_air_date) {
          b = b.slice(0, 4);
        }

        const imgUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
        return `<li class="home-card js-modal-open placeholdify" data-card-movie-id="${id}">
            <a href="#" class="home-card__link">
                <div class="card-info">
                    <img class="home-card__img" src="${imgUrl}" alt="${title}">
                    <h2 class="card-info__title">${original_title || original_name}</h2>
                    <p class="card-info_descr">
                        <span>${genreArr.splice(0, 3)}  ${other}</span>
                        
                        |
                        <span>${a || b}</span>
                    </p>
                </div>
            </a>
        </li>`;
      }
  )
    
     .join('');
   removeSceletonLoad();
  storage.save('movies', results);
    homeList.insertAdjacentHTML('beforeend', mark);
});

export default fetchFilms();

export function loadPopularStoragePage(currentPage) {
  homeList.innerHTML = "";
  page = currentPage;
  storage.save(POPULAR_STORAGE_KEY, page );
  fetchGenres().then(({ genres }) => {
  const arr = [...genres];
  localStorage.setItem('arrow', JSON.stringify(arr));
});
const values = storage.load('arrow');


  fetchFilms(`https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}&page=${page}`).then(({ results }) => {

  results.poster_path;


  const mark = results
    .map(
      ({
        id,
        poster_path,
        title,
        original_title,
        genre_ids,
        release_date,
        original_name,
        first_air_date,
      }) => {
        const genreArr = [];
        let other = '';
        for (const genreId of genre_ids) {
          for (const value of values) {
            if (genreId === value.id) {
              genreArr.push(value.name);
              if (genre_ids.length > 2) {
                other = ',Other';
              }
            }
          }
        }

        let a = release_date;

        let b = first_air_date;
        if (release_date) {
          a = a.slice(0, 4);
        }
        if (first_air_date) {
          b = b.slice(0, 4);
        }

        const imgUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
        return `<li class="home-card js-modal-open placeholdify" data-card-movie-id="${id}">
            <a href="#" class="home-card__link">
                <div class="card-info">
                    <img class="home-card__img" src="${imgUrl}" alt="${title}">
                    <h2 class="card-info__title">${original_title || original_name}</h2>
                    <p class="card-info_descr">
                        <span>${genreArr.splice(0, 3)}  ${other}</span>
                        
                        |
                        <span>${a || b}</span>
                    </p>
                </div>
            </a>
        </li>`;
      }
  )
    
      .join('');
     setTimeout(() => {
      const arr = document.querySelectorAll('.placeholdify');
      arr.forEach(el => el.classList.remove('placeholdify'));
      },2000);
  storage.save('movies', results);
    homeList.insertAdjacentHTML('beforeend', mark);
});
}
