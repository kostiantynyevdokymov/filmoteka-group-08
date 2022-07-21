import { movieCards } from "./fetchMovies";

export const libraryContainer = document.querySelector('.library-container');
export const libList = document.querySelector('.library-list');

export const active_type = 'header__btn-active';

export function funnyGuyOnBg() {
    console.log('markup list render', libList.firstChild)
    libList.firstChild == null ? libraryContainer.classList.add('lib-bg-img') : libraryContainer.classList.remove('lib-bg-img')
}

export function renderCardsFromLocalStoradge(key, ul) {
    const dataLib = localStorage.getItem(key);
    if (!dataLib) {
        alert('Your list is empty, please fill it');
        return;
    };
    const parsedDataLib = JSON.parse(dataLib);
    ul.innerHTML = movieCards(parsedDataLib);
}

export function removeMarkUp(elem) {
    elem.innerHTML = '';
}

