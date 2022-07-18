import { removeMarkUp, renderCardsFromLocalStoradge, checkBtns, libList } from './libFunc'

const btnOpenWatched = document.querySelector('.js-watched-btn');
const btnOpenQue = document.querySelector('.js-queue-btn');

//queue btn is active on load

function openQueue() {
    removeMarkUp(libList);
    renderCardsFromLocalStoradge('queue-list', libList);
    checkBtns(btnOpenQue);
}

function openWatched() {
    removeMarkUp(libList);
    renderCardsFromLocalStoradge('watched-list', libList);
    checkBtns(btnOpenWatched);
}

renderCardsFromLocalStoradge('queue-list', libList);

btnOpenQue.addEventListener('click', openQueue);
btnOpenWatched.addEventListener('click', openWatched);








