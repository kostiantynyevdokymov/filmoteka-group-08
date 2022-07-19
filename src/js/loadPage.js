import storage from './storage';
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

// const array = [
//   { id: 28, name: 'Action' },
//   { id: 12, name: 'Adventure' },
//   { id: 16, name: 'Animation' },
//   { id: 35, name: 'Comedy' },
//   { id: 80, name: 'Crime' },
//   { id: 99, name: 'Documentary' },
//   { id: 18, name: 'Drama' },
//   { id: 10751, name: 'Family' },
//   { id: 14, name: 'Fantasy' },
//   { id: 36, name: 'History' },
//   { id: 27, name: 'Horror' },
//   { id: 10402, name: 'Music' },
//   { id: 9648, name: 'Mystery' },
//   { id: 10749, name: 'Romance' },
//   { id: 878, name: 'Science Fiction' },
//   { id: 10770, name: 'TV Movie' },
//   { id: 53, name: 'Thriller' },
//   { id: 10752, name: 'War' },
//   { id: 37, name: 'Western' },
// ];

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
        const value = storage.load('arrow').find(arr => {});

        let a = release_date;

        let b = first_air_date;
        if (release_date) {
          a = a.slice(0, 4);
        }
        if (first_air_date) {
          b = b.slice(0, 4);
        }
        const imgUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
        return `<li class="home-card js-modal-open" data-card-movie-id="${id}">
            <a href="#" class="home-card__link">
                <div class="card-info">
                    <img class="home-card__img" src="${imgUrl}" alt="${title}">
                    <h2 class="card-info__title">${original_title || original_name}</h2>
                    <p class="card-info_descr">
                        <span>${genre_ids}</span>
                        |
                        <span>${a || b}</span>
                    </p>
                </div>
            </a>
        </li>`;
      }
    )
    .join('');
  homeList.insertAdjacentHTML('beforeend', mark);
});
