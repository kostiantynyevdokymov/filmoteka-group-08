import { markUpWithGenres } from './cardListWithGenres';
import { removeSceletonLoad } from './sceletonLoad';

//containers for render, design changes
const libraryContainer = document.querySelector('.library-container');
const libList = document.querySelector('.library-list');
const spinner = document.querySelector('.spinner-loader');
//btn accent
const active_type = 'header__btn-active';

//listerners
const btnOpenWatched = document.querySelector('.js-watched-btn');
const btnOpenQue = document.querySelector('.js-queue-btn');

//data parsed
export const queueStorage = localStorage.getItem('queue-list');
export const watchedStorage = localStorage.getItem('watched-list');
export const arrValuesOfQueue = JSON.parse(queueStorage);
export const arrValuesOfWatched = JSON.parse(watchedStorage);
export const valuesOfGenres = localStorage.getItem('arrow');
export const arrValuesOfGenres = JSON.parse(valuesOfGenres);

window.onload = () => {
    libList.innerHTML = markUpWithGenres(arrValuesOfQueue);
    funnyGuyOnBg();
      spinner.classList.remove('is-hidden');
    setTimeout(() => { spinner.classList.add('is-hidden') }, 2000);
    removeSceletonLoad();
}

//queue btn is active on load
btnOpenQue?.addEventListener('click', openQueue);
btnOpenWatched?.addEventListener('click', openWatched);


function openQueue() {
    libList.innerHTML = markUpWithGenres(arrValuesOfQueue);
    funnyGuyOnBg();
    spinner.classList.remove('is-hidden');
    setTimeout(() => { spinner.classList.add('is-hidden') }, 2000);
    removeSceletonLoad();
    btnOpenQue.classList.add(active_type);
    btnOpenWatched.classList.remove(active_type);
}

function openWatched() {
    libList.innerHTML = markUpWithGenres(arrValuesOfWatched);
    funnyGuyOnBg();
     spinner.classList.remove('is-hidden');
    setTimeout(() => { spinner.classList.add('is-hidden') }, 2000);
    removeSceletonLoad();
    btnOpenQue.classList.remove(active_type);
    btnOpenWatched.classList.add(active_type);
}

export function funnyGuyOnBg() {
    libList.firstChild == null ? libraryContainer.classList.add('lib-bg-img') : libraryContainer.classList.remove('lib-bg-img');
}






