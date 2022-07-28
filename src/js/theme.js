import storage from "./storage";

const theme = document.querySelector('.theme');
const body = document.querySelector('body');
const dark = document.querySelector('#dark');
const light = document.querySelector('#light');

themeLoad('theme');
changeBtnClass();

theme.addEventListener('click', changeTheme);

export function changeTheme(e) {
    if (e.target.nodeName !== 'BUTTON') return;
    storage.save('theme', e.target.value);
    themeLoad('theme');
    changeBtnClass();
}

function themeLoad(key) {
    storage.load(key) === 'dark' ? body.classList.add('dark') : body.classList.remove('dark');
}

function changeBtnClass() {
    storage.load('theme') === 'dark' ? light.classList.add('passive-btn') : light.classList.remove('passive-btn');
    storage.load('theme') === 'light' ? dark.classList.add('passive-btn') : dark.classList.remove('passive-btn');
}
