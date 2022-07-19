const modalLink = document.querySelector('.footer__rights-link');
const closeBtn = document.querySelector('.modal__closeBtn');
const backDropp = document.querySelector('.backdropp');
console.log(backDropp);

modalLink.addEventListener('click', e => {
  e.preventDefault();
  backDropp.classList.toggle('is-hidden');
  document.addEventListener('keydown', pressEsc);
});
closeBtn.addEventListener('click', e => {
  backDropp.classList.remove('is-hidden');
});

function pressEsc(e) {
  console.log(e);

  if (e.code === 'Escape') {
    backDropp.classList.add('is-hidden');
    document.removeEventListener('keydown', pressEsc);
  }
}

backDropp.addEventListener('click', onBackdropp);

function onBackdropp(e) {
  document.removeEventListener('keydown', pressEsc);
  backDropp.classList.add('is-hidden');
}
