import { movieCards } from "./fetchMovies";

const libraryContainer = document.querySelector('.library-container');
export const libList = document.querySelector('.library-list');

export const active_type = 'header__btn-active';

export function funnyGuyOnBg() {
    libList.hasChildNodes ? libraryContainer.classList.remove('lib-bg-img ') : libraryContainer.classList.add('lib-bg-img');
}

export function renderCardsFromLocalStoradge(key, ul) {
    const dataLib = localStorage.getItem(key);
    if (!dataLib) {
        funnyGuyOnBg();
        alert('Your list is empty, please fill it');
        return;
    };
    console.log('renderCardsFromLocalStoradge')
    const parsedDataLib = JSON.parse(dataLib);
    ul.innerHTML = movieCards(parsedDataLib);
}

export function removeMarkUp(elem) {
    elem.innerHTML = '';
}

