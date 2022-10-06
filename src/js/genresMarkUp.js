import storage from './storage';
import { markUpWithGenres } from './cardListWithGenres';

const genresContainer = document.querySelector('.genres-container');
const genreSpanStyle = 'genre-span-style';
const genreSpanActive = 'genre-span-active';
const list = document.querySelector('.homeList');
const genresMarkUp = storage.load('arrow') !== undefined ? storage.load('arrow').map(
    item =>
      `<button type="button" class="${genreSpanStyle} genre-span" id='${item.id}'>${item.name}</button>`
  )
    .join('') : '';

genresContainer.innerHTML = genresMarkUp;

genresContainer.addEventListener('click', saveBtnValOfGenre);

export async function filterGenres(genre) {
  const x = storage.load('movies');
  list.innerHTML = markUpWithGenres(x.filter(e => e.genre_ids.includes(genre)));
}

function saveBtnValOfGenre(e) {
  if (storage.load('genre') == e.target.id) {
    e.target.classList.remove(genreSpanActive);
    storage.save('genre', null);
    const x = storage.load('movies');
    list.innerHTML = markUpWithGenres(x);
    return;
  } else {
    const x = document.querySelectorAll('.genre-span-active');
    x.forEach(e => e.classList.remove(genreSpanActive)); //classList.remove(genreSpanActive);
    e.target.classList.add(genreSpanActive);
    storage.save('genre', e.target.id);
    filterGenres(Number(e.target.id));
  }
}

export function removeGenresMarkUp() {
  genresContainer.classList.add('hide');
}
