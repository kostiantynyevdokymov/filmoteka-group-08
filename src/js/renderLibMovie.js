import { movieCards } from './fetchMovies';

const libList = document.querySelector('.library-list');
const queueList = document.querySelector('.js-queue-btn');
const btnOpenLib = document.querySelector('.js-watched-btn');
const btnOpenQue = document.querySelector('.js-queue-btn');
const libraryContainer = document.querySelector('.library-container');

function funnyGuyOnBg() {
    const funny = libraryContainer.classList.contains('lib-bg-img');
    if (!libList.firstChild && !funny) {
        libraryContainer.classList.add('lib-bg-img');
    } else if (!libList.firstChild && funny) {
        return;
    } else {
        libraryContainer.classList.remove('lib-bg-img');
    }
}

function removeMarkUp(elem) {
    elem.innerHTML = '';
}

function renderCardsFromLocalStoradge(key, ul) {
    const dataLib = localStorage.getItem(key);
    if (!dataLib) {
        alert('Your list is empty, please fill it');
        funnyGuyOnBg();
        return;
    };
    const parsedDataLib = JSON.parse(dataLib);
    ul.innerHTML = movieCards(parsedDataLib);
}

btnOpenLib.addEventListener('click', openLib);
btnOpenQue.addEventListener('click', openQueue);

function openLib() {
    removeMarkUp(libList);
    renderCardsFromLocalStoradge('watched-list', libList);
}

function openQueue() {
    removeMarkUp(libList);
    renderCardsFromLocalStoradge('queue-list', queueList);
}






