import { removeMarkUp, renderCardsFromLocalStoradge, libList, active_type, funnyGuyOnBg } from './libFunc'

const btnOpenWatched = document.querySelector('.js-watched-btn');
const btnOpenQue = document.querySelector('.js-queue-btn');

//queue btn is active on load

btnOpenQue?.addEventListener('click', openQueue);
btnOpenWatched?.addEventListener('click', openWatched);

function openQueue() {
    removeMarkUp(libList);
    renderCardsFromLocalStoradge('queue-list', libList);
    funnyGuyOnBg();
    btnOpenQue.classList.add(active_type);
    btnOpenWatched.classList.remove(active_type);
}

function openWatched() {
    removeMarkUp(libList);
    renderCardsFromLocalStoradge('watched-list', libList);
    funnyGuyOnBg();
    btnOpenQue.classList.remove(active_type);
    btnOpenWatched.classList.add(active_type);
}

renderCardsFromLocalStoradge('queue-list', libList);
funnyGuyOnBg();









