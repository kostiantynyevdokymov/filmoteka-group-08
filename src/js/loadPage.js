import storage from './storage'

const KEY = '659c146febfafc17fd54baa17527f7fa';
const MEDIA_TYPE = 'movie';
const TIME_WINDOW = 'week';
async function fetchFilms(KEY, MEDIA_TYPE, TIME_WINDOW) {
  let response = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${KEY}&media_type=${MEDIA_TYPE}&time_window=${TIME_WINDOW}`
  );
  return response.json();
}
fetchFilms(KEY, MEDIA_TYPE, TIME_WINDOW).then(({ results }) => {
  // console.dir(results);
  storage.save('movies', results);
});
