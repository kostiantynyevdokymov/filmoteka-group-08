import { shouldRewrite } from "./modal";
import { libList, funnyGuyOnBg, spinner, arrValuesOfQueue } from "./renderLibMovie";
import { markUpWithGenres } from "./cardListWithGenres";
import { removeSceletonLoad } from "./sceletonLoad";
import storage from "./storage";



export function rewrite() {
    const current = document.querySelector('.current-page');
    const itsLib = current.textContent === 'My library';
    if (itsLib == false) return;
    arrValuesOfQueue !== null ? libList.innerHTML = markUpWithGenres(storage.load('queue-list')) : libList.innerHTML = '';
    console.log(arrValuesOfQueue)
    const reloadWillBe = shouldRewrite && itsLib;
    if (reloadWillBe) {
        console.log('reload')
        const btnActive = document.querySelector('.header__btn-active');
        const itsQueueList = btnActive.textContent === 'Queue';
        console.log(btnActive.textContent)
        if (btnActive.textContent === 'Queue') {
            console.log(itsQueueList, 'itsQueueList active')
            console.log('q')
            libList.innerHTML = markUpWithGenres(storage.load('queue-list'));
            funnyGuyOnBg();
            spinner.classList.remove('is-hidden');
            setTimeout(() => {
                spinner.classList.add('is-hidden');
            }, 2000);
            removeSceletonLoad();
            return
        } else if (btnActive.textContent === 'Watched') {
            console.log(!itsQueueList, 'watched')
            console.log('watched-list active')
            libList.innerHTML = markUpWithGenres(storage.load('watched-list'));
            funnyGuyOnBg();
            spinner.classList.remove('is-hidden');
            setTimeout(() => {
                spinner.classList.add('is-hidden');
            }, 2000);
            removeSceletonLoad();
            return
        }
    }
}
