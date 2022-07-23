import { markUpWithGenres } from './cardListWithGenres';
import { removeSceletonLoad } from './sceletonLoad';
import { itsQueueList } from './variablesForLib';
import storage from './storage';

//containers for render, design changes
export const libList = document.querySelector('.library-list');
export const spinner = document.querySelector('.spinner-loader');
//btn accent
const active_type = 'header__btn-active';

//listerners
const btnOpenWatched = document.querySelector('.js-watched-btn');
const btnOpenQue = document.querySelector('.js-queue-btn');

if (document.querySelector('.library-container')) {
    const btnActive = document.querySelector('.header__btn-active');
    const itsQueueList = btnActive.textContent === 'Queue';
    console.log(itsQueueList, 'q')
    window.onload = () => {
            libList.innerHTML = markUpWithGenres(storage.load('queue-list'));
            funnyGuyOnBg();
            spinner.classList.remove('is-hidden');
            setTimeout(() => {
                spinner.classList.add('is-hidden');
            }, 2000);
            removeSceletonLoad();
        }
    }


    //queue btn is active on load
    btnOpenQue?.addEventListener('click', openQueue);
    btnOpenWatched?.addEventListener('click', openWatched);

    function openQueue() {
        libList.innerHTML = markUpWithGenres(arrValuesOfQueue);
        funnyGuyOnBg();
        spinner.classList.remove('is-hidden');
        setTimeout(() => {
            spinner.classList.add('is-hidden');
        }, 2000);
        removeSceletonLoad();
        btnOpenQue.classList.add(active_type);
        btnOpenWatched.classList.remove(active_type);
    }

    function openWatched() {
        libList.innerHTML = markUpWithGenres(arrValuesOfWatched);
        funnyGuyOnBg();
        spinner.classList.remove('is-hidden');
        setTimeout(() => {
            spinner.classList.add('is-hidden');
        }, 2000);
        removeSceletonLoad();
        btnOpenQue.classList.remove(active_type);
        btnOpenWatched.classList.add(active_type);
    }


//data parsed
export const queueStorage = localStorage.getItem('queue-list');
export const watchedStorage = localStorage.getItem('watched-list');
export const arrValuesOfQueue = JSON.parse(queueStorage);
export const arrValuesOfWatched = JSON.parse(watchedStorage);
export const valuesOfGenres = localStorage.getItem('arrow');
export const arrValuesOfGenres = JSON.parse(valuesOfGenres);

export function funnyGuyOnBg() {
    const libraryContainer = document.querySelector('.library-container');

    libList.firstChild == null
        ? libraryContainer.classList.add('lib-bg-img')
        : libraryContainer.classList.remove('lib-bg-img');
}


