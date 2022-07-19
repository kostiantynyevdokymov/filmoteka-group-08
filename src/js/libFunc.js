import { movieCards } from "./fetchMovies";

const libraryContainer = document.querySelector('.library-container');
export const libList = document.querySelector('.library-list');

const active_type = 'header__btn-active';

export function funnyGuyOnBg() {
    const funny = libraryContainer.classList.contains('lib-bg-img');
    if (!libList.firstChild && !funny) {
        libraryContainer.classList.add('lib-bg-img');
    } else if (!libList.firstChild && funny) {
        return;
    } else {
        libraryContainer.classList.remove('lib-bg-img');
    }
}

export function renderCardsFromLocalStoradge(key, ul) {
    const dataLib = localStorage.getItem(key);
    if (!dataLib) {
        funnyGuyOnBg();
        alert('Your list is empty, please fill it');
        return;
    };
    const parsedDataLib = JSON.parse(dataLib);
    ul.innerHTML = movieCards(parsedDataLib);
}

export function checkBtns(btn) {
    if (!btn.classList.contains(active_type)) btn.classList.add(active_type);
}

export function removeMarkUp(elem) {
    elem.innerHTML = '';
}