import { markUpWithGenres } from './cardListWithGenres';
//import { removeSceletonLoad } from './sceletonLoad';
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

storage.save('activeInStorage', 'q')

//first open
checkWhatToLoad(storage.load('activeInStorage'))
funnyGuyOnBg()

export function checkWhatToLoad(x) {
    if (libraryContainer) {

        console.log(storage.load('activeInStorage'))
        if (x == 'q') {
            document.location.reload = openQueue(queStorage, btnOpenQue);
            funnyGuyOnBg()
            }
        if (x == 'w') {
            document.location.reload = openWatched(watStorage, btnOpenWatched);
            funnyGuyOnBg()
            }
        }

    }


//queue btn is active on load
btnOpenQue?.addEventListener('click', openQueue);
btnOpenWatched?.addEventListener('click', openWatched);

function openQueue() {
    checkStorage(queStorage, btnOpenQue);
    btnOpenQue.classList.add(active_type);
    btnOpenWatched.classList.remove(active_type);
    storage.save('activeInStorage', 'q')
}

function openWatched() {
    checkStorage(watStorage, btnOpenWatched);
    btnOpenQue.classList.remove(active_type);
    btnOpenWatched.classList.add(active_type);
    storage.save('activeInStorage', 'w')
}

//data parsed
export const queueStorage = localStorage.getItem('queue-list');
export const watchedStorage = localStorage.getItem('watched-list');
export const valuesOfGenres = localStorage.getItem('arrow');
export const arrValuesOfGenres = JSON.parse(valuesOfGenres);

export function funnyGuyOnBg() {
    if(libraryContainer){
    console.log(libList.firstChild == null)
    libList.firstChild == null
        ? libraryContainer.classList.add('lib-bg-img')
        : libraryContainer.classList.remove('lib-bg-img');}
}

//storage
function checkStorage(key, btn) {
    console.log(btn, key)
    if (libraryContainer) {
        if (storage.load(key) === undefined || storage.load(key).length === 0) {
          btn.classList.add('non-active');
            console.log(btn.classList)
        } else {
            addMarkUpToLibByKey(key);
        }
        funnyGuyOnBg();
    }
}

//render
function addMarkUpToLibByKey(keyOfActualStorage) {
    libList.innerHTML = markUpWithGenres(storage.load(keyOfActualStorage));
}

/*const pag = document.querySelector('.pag-c');

pag?.addEventListener('click', onPagClick);

function onPagClick(e) {
    if(e.target.dataset.page == true){
    libList.innerHTML = markUpWithGenres(arrQPaged[Number(e.target.dataset.page)]);
}}

const arrQ = [...storage.load('queue-list')];
const arrW = [...storage.load('watched-list')];
const arrQPaged = [];
const arrWPaged = [];

function pagify(arr, numCardsOnPage, arrPaged) {
    for (let i = 0; i < arr.length; i += numCardsOnPage) {
        const chunk = arr.slice(i, i + numCardsOnPage);
        arrPaged.push(chunk);
    }
 }


pagify(arrQ, 2, arrQPaged);//pag for q
pagify(arrW, 2, arrWPaged);//pag for w

function generatePag(arr) {
   return arr.map((e, index) => `<button style='width:40px;height:40px; margin-right:10px' class='pag' data-page=${index}>${index + 1}</button>`).join('');        
}
//markup pag lib
if(libraryContainer){
const mark = generatePag(arrQPaged);
pag.innerHTML = mark;
}*/