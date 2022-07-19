const modalLink = document.querySelector('.footer__rights-link');
const closeBtn = document.querySelector('.modal__closeBtn');
const backDropp = document.querySelector('.backdropp');
console.log(backDropp);
modalLink.addEventListener('click', e => {
  e.preventDefault();
  backDropp.classList.toggle('is-hidden');
});
closeBtn.addEventListener('click', e => {
  backDropp.classList.toggle('is-hidden');
});
