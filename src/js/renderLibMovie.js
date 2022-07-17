
//js

const libList = document.querySelector('.library-list');
const btnOpenLib = document.querySelector('.js-watched-btn');
const libraryContainer = document.querySelector('.library-container');

function checkLibListFilling() {
    if (!libList.firstChild) {
        libraryContainer.classList.add('lib-bg-img');
    } else {
        libraryContainer.classList.remove('lib-bg-img');
    }
}

btnOpenLib.addEventListener('click', openLib);

function renderCardsFromLocalStoradge(key, ul) {
    const dataLib = localStorage.getItem(key);
    if (!dataLib) {
        console.log('nothing with this key');
        return;
    };
    const parsedDataLib = JSON.parse(dataLib);
    const markUp = movieCards(parsedDataLib);
    ul.innerHTML = markUp;
}

function openLib() {
    renderCardsFromLocalStoradge('watched', libList);
}

function checkLibListFilling() {
    console.log("lib mark up is empty ", !libList.firstChild)
    if (!libList.firstChild) {
        libraryContainer.classList.add('lib-bg-img');
    } else {
        libraryContainer.classList.remove('lib-bg-img');
    }
}

checkLibListFilling();

