import storage from './storage';
const KEY = '659c146febfafc17fd54baa17527f7fa';
const MEDIA_TYPE = 'movie';
const TIME_WINDOW = 'week';
const homeList = document.querySelector('.home-list');

async function fetchFilmss(KEY, MEDIA_TYPE, TIME_WINDOW) {
  let response = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${KEY}&media_type=${MEDIA_TYPE}&time_window=${TIME_WINDOW}`
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

fetchFilmss(KEY, MEDIA_TYPE, TIME_WINDOW).then(({ results }) => {
  results.poster_path;

  const mark = results
    .map(
      ({
        poster_path,
        title,
        original_title,
        genre_ids,
        release_date,
        original_name,
        first_air_date,
      }) => {
        if (genre_ids.length > 3) {
        }

        const genreArr = [];
        let other = '';
        for (const genreId of genre_ids) {
          for (const value of values) {
            if (genreId === value.id) {
              genreArr.push(value.name);
              if (genre_ids.length > 2) {
                other = 'other';
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

        const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
        return `<li class="home-card">
            <a href="#" class="home-card__link">
                <div class="card-info">
                    <img class="home-card__img" src="${imageUrl}" alt="${title}">
                    <h2 class="card-info__title">${
                      original_title || original_name
                    }</h2>
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
  homeList.insertAdjacentHTML('beforeend', mark);
});
