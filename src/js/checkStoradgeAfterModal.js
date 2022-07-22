import { shouldRewrite } from "./modal";
import { arrValuesOfQueue } from "./renderLibMovie";

const current = document.querySelector('.current-page');
const itsLib = current.textContent === 'My library';

export function rewrite() {

    if (shouldRewrite && itsLib) {
        markUpWithGenres(arrValuesOfQueue);
    }
}