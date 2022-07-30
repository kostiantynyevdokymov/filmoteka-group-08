import storage from "./storage";
import { markUpWithGenres } from "./cardListWithGenres";

const genreSpanStyle = 'border: 1px solid grey; padding: 5px; display: inline-block; color: green; margin-right: 5px; margin-bottom: 5px; border-radius: 2px';
const genreSpanActive = 'border: 1px solid grey; padding: 5px; display: inline-block; background: #ff6b08; color: white; margin-right: 5px; margin-bottom: 5px; border-radius: 2px';
const genresContainer = document.querySelector('.genres-container');
const list = document.querySelector('.homeList');
const genresMarkUp = storage.load('arrow').map(item => `<span id='${item.id}' class='genre-span' style='${genreSpanStyle}'>${item.name}</span>`).join('');
genresContainer.innerHTML = genresMarkUp;

genresContainer.addEventListener('click', saveBtnValOfGenre);

export async function filterGenres(genre) {
    const x = storage.load('movies');
    list.innerHTML = markUpWithGenres(x.filter(e => e.genre_ids.includes(genre)));
}

function saveBtnValOfGenre(e) {
    if (storage.load('genre') == e.target.id) {
        e.target.style = genreSpanStyle;
        storage.save('genre', null);
        const x = storage.load('movies');
        list.innerHTML = markUpWithGenres(x);
        return;
    } else {
        const allSpans = document.querySelectorAll('.genre-span');
        [...allSpans].map(e => e.style = genreSpanStyle);
        e.target.style = genreSpanActive;
        storage.save('genre', e.target.id);
        filterGenres(Number(e.target.id));
    }
}

export function removeGenresMarkUp() {
    genresContainer.style = 'display: none';
}


