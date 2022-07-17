const formField = document.querySelector('.form-field');
const homeList = document.querySelector('.home-list');
const spinner = document.querySelector('.spinner-loader');
let movieName = '';

formField.addEventListener('submit', event => {
  event.preventDefault();
  spinner.classList.remove('is-hidden');
  movieName = formField.elements.query.value.trim();
  if (movieName === '') {
    return alert('Empty field');
  }
  fetchMovies(movieName).then(({ movies }) => {
    homeList.innerHTML = movieCards(movies);
    spinner.classList.add('is-hidden');
  });
});

function movieCards (movies) {
  return movies
    .map(({ poster_path, title, original_title, genres_ids, release_date }) => {
        const imgUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
        return `<li class="home-card js-modal-open">
            <a href="#" class="home-card__link">
                <div class="card-info">
                    <img class="home-card__img" src="${imgUrl}" alt="${title}">
                    <h2 class="card-info__title">${original_title}</h2>
                    <p class="card-info_descr">
                        <span>${genres_ids}</span>
                        |
                        <span>${release_date}</span>
                    </p>
                </div>
            </a>
        </li>`;
    })
    .join('');
};

function fetchMovies (movieName){
  const searchParams = new URLSearchParams({
    api_key: '659c146febfafc17fd54baa17527f7fa',
    language: 'en-US',
    query: movieName,
  });

  return fetch(`https://api.themoviedb.org/3/search/movie?${searchParams}`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then(data => {
      return {
        movies: data.results
      };
    });
};