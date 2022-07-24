import { markUpWithGenres } from './cardListWithGenres';
import { removeSceletonLoad } from './sceletonLoad';
import storage from './storage';

//containers for render, design changes
export const libList = document.querySelector('.library-list');
export const spinner = document.querySelector('.spinner-loader');
//btn accent
const active_type = 'header__btn-active';

//listerners
const btnOpenWatched = document.querySelector('.js-watched-btn');
const btnOpenQue = document.querySelector('.js-queue-btn');

const libraryContainer = document.querySelector('.library-container');

const queStorage = 'queue-list';
const watStorage = 'watched-list';

const arrQ = [...storage.load('queue-list')];
const arrW = [...storage.load('watched-list')];
const arrQPaged = [];
const arrWPaged = [];

pagify(arrQ, 2, arrQPaged);//pag for q
pagify(arrW, 2, arrWPaged);//pag for w

//console.log(arrQPaged, arrWPaged)

storage.save('activeInStorage', '')

//first open

checkWhatToLoad();

export function checkWhatToLoad() {
    if (libraryContainer) {

        if (storage.load('activeInStorage') === 'q' || storage.load('activeInStorage') === '') {
            window.location.reload()
            checkStorage(arrQPaged[0], btnOpenQue);
            btnOpenQue.classList.add(active_type);
            btnOpenWatched.classList.remove(active_type);

        }
        if (storage.load('activeInStorage') === 'w') {
            window.location.reload()
            console.log('w')
            checkStorage(arrWPaged[0], btnOpenWatched);
            btnOpenQue.classList.remove(active_type);
            btnOpenWatched.classList.add(active_type);
        }

    }
}

//queue btn is active on load
btnOpenQue?.addEventListener('click', openQueue);
btnOpenWatched?.addEventListener('click', openWatched);

function openQueue() {
    checkStorage(arrQPaged[0], btnOpenQue);
    btnOpenQue.classList.add(active_type);
    btnOpenWatched.classList.remove(active_type);
}

function openWatched() {
    checkStorage(arrWPaged[0], btnOpenWatched);
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
    libList.firstChild == null
        ? libraryContainer.classList.add('lib-bg-img')
        : libraryContainer.classList.remove('lib-bg-img');
}

//storage
function checkStorage(arr, btn) {
    if (libraryContainer) {
        //*** */
        if (arr === []) {
            btn.classList.add('non-active');
        } else {
          addMarkUpToLibByKey(arrQ[0]);
        }
        funnyGuyOnBg();
    }
}

//render
function addMarkUpToLibByKey(arr) {
    libList.innerHTML = markUpWithGenres(arr);
    spinner.classList.remove('is-hidden');
}

const pag = document.querySelector('.pag-c');
const actibeBtnStyle = 'background: orange; color:white; width: 40px; height: 40px; margin-right:10px';
const passiveBtnStyle = 'width:40px; height:40px; margin-right:10px'
const markbtn = (index) => `<button style=${passiveBtnStyle} class='pag' data-page=${index}>${index + 1}</button>`;


pag?.addEventListener('click', onPagClick);

function onPagClick(e) {
    if (e.target.dataset.page !== undefined) {
        const allBtnStyle = document.querySelectorAll('.pag');
        
       console.log(e.currentTarget.dataset.page)
       e.target.style = 'background: orange; color:white; width: 40px; height: 40px; margin-right:10px';
       libList.innerHTML = markUpWithGenres(arrQPaged[Number(e.target.dataset.page)]);
    }
}

function pagify(arr, numCardsOnPage, arrPaged) {
    for (let i = 0; i < arr.length; i += numCardsOnPage) {
        const chunk = arr.slice(i, i + numCardsOnPage);
        arrPaged.push(chunk);
    }
}




function generatePag(arr) {
   return arr.map((e, index) => markbtn(index)).join('');
}


//markup pag lib
if (libraryContainer) {
    const mark = generatePag(arrQPaged);
    pag.innerHTML = mark;   
}