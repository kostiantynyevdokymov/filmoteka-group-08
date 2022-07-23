import { shouldRewrite } from "./modal";
import { arrValuesOfQueue, arrValuesOfWatched, libList } from "./renderLibMovie";
import { markUpWithGenres } from "./cardListWithGenres";
import { spinner, funnyGuyOnBg } from "./renderLibMovie";
import { removeSceletonLoad } from "./sceletonLoad";
import { itsQueue } from "./renderLibMovie";
import storage from "./storage";

const current = document.querySelector('.current-page');
const itsLib = current.textContent === 'My library';
console.log(storage.load('queue-list'), 'storage')
export function rewrite() {
    const reloadWillBe = shouldRewrite && itsLib;
    if (reloadWillBe) {
        if (itsQueue) {
            libList.innerHTML = markUpWithGenres(storage.load('queue-list'));
            funnyGuyOnBg();
        } else {
            libList.innerHTML = markUpWithGenres(storage.load('watched-list'));
            funnyGuyOnBg();
        }
    }
}