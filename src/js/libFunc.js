//not in use now

export function renderCardsFromLocalStoradge(key, ul) {
    const dataLib = localStorage.getItem(key);
    if (!dataLib) {
        alert('Your list is empty, please fill it');
        return;
    };
    const parsedDataLib = JSON.parse(dataLib);
    ul.innerHTML = movieCards(parsedDataLib);
    setTimeout(() => {
      const arr = document.querySelectorAll('.placeholdify');
      arr.forEach(el => el.classList.remove('placeholdify'));
      },0);
}

//not in use now

export function removeMarkUp(elem) {
    elem.innerHTML = '';
}

