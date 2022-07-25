// const modalLink = document.querySelector('.footer__rights-link');
// const closeBtn = document.querySelector('.modal__closeBtn');
// const backDropp = document.querySelector('[data-modal-team]');

// modalLink.addEventListener('click', e => {
//   e.preventDefault();
//   backDropp.classList.toggle('is-hidden');
//   document.addEventListener('keydown', pressEsc);
// });
// closeBtn.addEventListener('click', e => {
//   backDropp.classList.remove('is-hidden');
// });

// function pressEsc(e) {
//   if (e.code === 'Escape') {
//     backDropp.classList.add('is-hidden');
//     document.removeEventListener('keydown', pressEsc);
//   }
// }

// backDropp.addEventListener('click', onBackdropp);

// function onBackdropp(e) {
//   if (e.target === e.currentTarget) {
//     document.removeEventListener('keydown', pressEsc);
//     backDropp.classList.add('is-hidden');
//   }
// }

const refs = {
  modal: document.querySelector('[data-modal-team]'),
  closeBtn: document.querySelector('.modal__closeBtn'),
  openModalTeam: document.querySelector('.footer__rights-link'),
};

// відкриває модалку
// console.log(refs.openModalTeam);
refs.openModalTeam.addEventListener('click', e => {
  e.preventDefault();
  refs.modal.classList.toggle('is-hidden');
  document.addEventListener('keydown', pressEsc);
});

// refs.openModalTeam.addEventListener('click', onOpenModal);

// закриває модалку
refs.closeBtn.addEventListener('click', onCloseModal);

// тиць по бекдропу закриває модалку
refs.modal.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

// тиць по ESC закриває модалку
function pressEsc(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

function onOpenModal() {
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', pressEsc);
  refs.modal.classList.remove('is-hidden');
}

function onCloseModal() {
  // document.body.style.overflow = '';
  document.removeEventListener('keydown', pressEsc);
  refs.modal.classList.add('is-hidden');
}
