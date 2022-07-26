// const back = document.querySelector('.modal');
// arrowTop.onclick = function () {
//   window.scroll({
//     top: 0,
//     left: 100,
//     behavior: 'smooth',
//   });
//   // после scrollTo возникнет событие "scroll", так что стрелка автоматически скроется
// };

// window.addEventListener('scroll', function () {
//   arrowTop.remove;
// });


export { onScroll, onToTopBtn };

const toTopBtn = document.querySelector('.btn-to-top');

window.addEventListener('scroll', onScroll);
toTopBtn.addEventListener('click', onToTopBtn);

function onScroll() {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
      toTopBtn.classList.add('btn-to-top--visible');
  }
  if (scrolled < coords) {
      toTopBtn.classList.remove('btn-to-top--visible');
  }
};

function onToTopBtn() {
  if (window.pageYOffset > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
