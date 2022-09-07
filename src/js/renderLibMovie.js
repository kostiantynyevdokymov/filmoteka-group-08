import { markUpWithGenres } from './cardListWithGenres';
//import { removeSceletonLoad } from './sceletonLoad';
import storage from './storage';

//containers for render, design changes
export const libList = document.querySelector('.library-list');
export const spinner = document.querySelector('.spinner-loader');
//bg empty page
const lightDiv = document.querySelector('.empty-light');
const darkDiv = document.querySelector('.empty-dark');
//btn accent
const active_type = 'header__btn-active';

//listerners
const btnOpenWatched = document.querySelector('.js-watched-btn');
const btnOpenQue = document.querySelector('.js-queue-btn');

export const libraryContainer = document.querySelector('.library-container');

const queStorage = 'queue-list';
const watStorage = 'watched-list';

storage.save('activeInStorage', 'q');

//first open
checkWhatToLoad(storage.load('activeInStorage'))
funnyGuyOnBg()

export function checkWhatToLoad(x) {
    if (libraryContainer) {

        // console.log(storage.load('activeInStorage'));
        if (x == 'q') {
            btnOpenQue.classList.add(active_type);
            openQueue(queStorage, btnOpenQue);
            funnyGuyOnBg()
        }
        if (x == 'w') {
            btnOpenWatched.classList.add(active_type);
            openWatched(watStorage, btnOpenWatched);
            funnyGuyOnBg()
        }
    }
}


//queue btn is active on load
btnOpenQue?.addEventListener('click', openQueue);
btnOpenWatched?.addEventListener('click', openWatched);

function openQueue() {
    checkStorage(queStorage, btnOpenQue);
    funnyGuyOnBg();
    btnOpenQue.classList.add(active_type);
    btnOpenWatched.classList.remove(active_type);
    storage.save('activeInStorage', 'q');
}

function openWatched() {
    checkStorage(watStorage, btnOpenWatched);
    funnyGuyOnBg();
    btnOpenQue.classList.remove(active_type);
    btnOpenWatched.classList.add(active_type);
    storage.save('activeInStorage', 'w');
}

//data parsed
export const queueStorage = localStorage.getItem('queue-list');
export const watchedStorage = localStorage.getItem('watched-list');
export const valuesOfGenres = localStorage.getItem('arrow');
export const arrValuesOfGenres = JSON.parse(valuesOfGenres);

export function funnyGuyOnBg() {
    if (libraryContainer && libList.firstChild === null) {
        if (storage.load('theme') === 'light') {
            {
                lightDiv.style.display = 'flex';
                darkDiv.style.display = 'none';
            }
        } else {
            {
                lightDiv.style.display = 'none';
                darkDiv.style.display = 'flex';
            }
        }
    }
}
//storage
function checkStorage(key, btn) {
    if (libraryContainer) {
        if (storage.load(key) === undefined || storage.load(key).length === 0) {
            btn.classList.remove('.header__btn-active');
            btn.classList.add('.header__btn-noactive');
            libList.innerHTML = '';
        } else {
            btn.classList.add('.header__btn-active')
            addMarkUpToLibByKey(key);
        }
    }
}

//render
function addMarkUpToLibByKey(keyOfActualStorage) {
    libList.innerHTML = markUpWithGenres(storage.load(keyOfActualStorage));
}
