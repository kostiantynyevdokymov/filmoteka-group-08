import { removeMarkUp, renderCardsFromLocalStoradge, libList, active_type } from './libFunc'

const btnOpenWatched = document.querySelector('.js-watched-btn');
const btnOpenQue = document.querySelector('.js-queue-btn');

//queue btn is active on load

btnOpenQue?.addEventListener('click', openQueue);
btnOpenWatched?.addEventListener('click', openWatched);

function openQueue() {
    removeMarkUp(libList);
    renderCardsFromLocalStoradge('queue-list', libList);
    btnOpenQue?.classList.contains(active_type) ? btnOpenWatched.classList.remove(active_type) : btnOpenQue.classList.add(active_type);
}

function openWatched() {
    removeMarkUp(libList);
    renderCardsFromLocalStoradge('watched-list', libList);
    btnOpenWatched?.classList.contains(active_type) ? btnOpenQue.classList.remove(active_type) : btnOpenWatched.classList.add(active_type);
}

renderCardsFromLocalStoradge('queue-list', libList);









