import { loadFetchMovies } from './fetchMovies';
import { loadPopularStoragePage } from './loadPage';
import {btn1Ref, btn2Ref, btn3Ref, btn4Ref, btn5Ref, firstPageRef, lastPageRef, rightArrowRef, leftArrowRef, prevDotsRef, afterDotsRef, paginationRef} from './pagBtnsVar';

const inputRef = document.querySelector('.js-search-form');
const gallery = document.querySelector('.js-card-library');
const numberButtons = [btn1Ref, btn2Ref, btn3Ref, btn4Ref, btn5Ref];

// const btn1Ref = document.querySelector('[data-index="1"]');
// const btn2Ref = document.querySelector('[data-index="2"]');
// const btn3Ref = document.querySelector('[data-index="3"]');
// const btn4Ref = document.querySelector('[data-index="4"]');
// const btn5Ref = document.querySelector('[data-index="5"]');
// const firstPageRef = document.querySelector('.first-button');
// const lastPageRef = document.querySelector('.last-button');
// const paginationRef = document.querySelector('.pagination-container');
// const rightArrowRef = document.querySelector('.arrow-right');
// const leftArrowRef = document.querySelector('.arrow-left');
// const prevDotsRef = document.querySelector('#previous');
// const afterDotsRef = document.querySelector('#after');

paginationRef.addEventListener('click', onPaginationClick);

let currentPage = 1;

let btns = document.querySelectorAll('.pagination-button');

prevDotsRef.hidden = true;
leftArrowRef.hidden = true;
firstPageRef.hidden = true;

function onPaginationClick(event) {
  if (event.target.tagName === 'BUTTON') {
    if (Number(event.target.textContent)) {
      currentPage = Number(event.target.textContent);
    }

    prevDotsRef.hidden = true;
    afterDotsRef.hidden = true;

    if (event.target.classList.contains('pagination-button')) {
      btns.forEach(el => el.classList.remove('pagination--current'));
      event.target.classList.add('pagination--current');
    }

    if (event.target.classList.contains('arrow-right') && currentPage < 1000) {
      btns.forEach(el => el.classList.remove('pagination--current'));
      btn1Ref.classList.add('pagination--current');
      btn1Ref.textContent = Number(btn1Ref.textContent) + 5;
      btn2Ref.textContent = Number(btn2Ref.textContent) + 5;
      btn3Ref.textContent = Number(btn3Ref.textContent) + 5;
      btn4Ref.textContent = Number(btn4Ref.textContent) + 5;
      btn5Ref.textContent = Number(btn5Ref.textContent) + 5;
      currentPage = btn1Ref.textContent;
    }

    if (event.target.classList.contains('arrow-left') && currentPage >= 5) {
      btns.forEach(el => el.classList.remove('pagination--current'));
      btn1Ref.textContent = Number(btn1Ref.textContent) - 5;
      btn2Ref.textContent = Number(btn2Ref.textContent) - 5;
      btn3Ref.textContent = Number(btn3Ref.textContent) - 5;
      btn4Ref.textContent = Number(btn4Ref.textContent) - 5;
      btn5Ref.textContent = Number(btn5Ref.textContent) - 5;
      btn5Ref.classList.add('pagination--current');
      currentPage = btn5Ref.textContent;
    }

    if (event.target.classList.contains('first-button')) {
      btns.forEach(el => el.classList.remove('pagination--current'));
      btn1Ref.textContent = 1;
      btn2Ref.textContent = 2;
      btn3Ref.textContent = 3;
      btn4Ref.textContent = 4;
      btn5Ref.textContent = 5;
      btn1Ref.classList.add('pagination--current');
      currentPage = btn1Ref.textContent;
      leftArrowRef.hidden = true;
      prevDotsRef.hidden = true;
      firstPageRef.hidden = true;
    }

    if (event.target.classList.contains('last-button')) {
      btns.forEach(el => el.classList.remove('pagination--current'));
      btn1Ref.textContent = Number(lastPageRef.textContent) - 4;
      btn2Ref.textContent = Number(lastPageRef.textContent) - 3;
      btn3Ref.textContent = Number(lastPageRef.textContent) - 2;
      btn4Ref.textContent = Number(lastPageRef.textContent) - 1;
      btn5Ref.textContent = lastPageRef.textContent;
      btn5Ref.classList.add('pagination--current');
      currentPage = btn5Ref.textContent;
      rightArrowRef.hidden = true;
      afterDotsRef.hidden = true;
      lastPageRef.hidden = true;
    }

    if (Number(currentPage) > 5) {
      leftArrowRef.hidden = false;
      prevDotsRef.hidden = false;
      firstPageRef.hidden = false;
    } else {
      leftArrowRef.hidden = true;
      prevDotsRef.hidden = true;
      firstPageRef.hidden = true;
    }

    if (Number(currentPage) < 996) {
      rightArrowRef.hidden = false;
      afterDotsRef.hidden = false;
      lastPageRef.hidden = false;
    }
    if (gallery != null) {
      gallery.innerHTML = '';      
    }

      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (inputRef.value !== '') {
      loadFetchMovies(currentPage)

    } else {
      loadPopularStoragePage(currentPage);
    }
  }
}

let pageSize = 9;

function defineResultsPerPage() {
  if (window.innerWidth >= 1024) {
    pageSize = 9;
  } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
    pageSize = 8;
  } else if (window.innerWidth < 768) {
    pageSize = 4;
  }
  return pageSize;
}






export { currentPage, defineResultsPerPage, currentFirstBtn, currentStorageBtn };

  
const currentFirstBtn = () => { 

   btns.forEach(el => el.classList.remove('pagination--current'));
      btn1Ref.textContent = 1;
      btn2Ref.textContent = 2;
      btn3Ref.textContent = 3;
      btn4Ref.textContent = 4;
      btn5Ref.textContent = 5;
      btn1Ref.classList.add('pagination--current');
      currentPage = btn1Ref.textContent;
      leftArrowRef.hidden = true;
      prevDotsRef.hidden = true;
      firstPageRef.hidden = true;
}


const currentStorageBtn = (currentPage) => {
  if (Number(currentPage) > 5) {
    btns.forEach(el => el.classList.remove('pagination--current'));
    btn1Ref.textContent = Number(currentPage) - 2;
    btn2Ref.textContent = Number(currentPage) - 1;
    btn3Ref.textContent = Number(currentPage);
    btn4Ref.textContent = Number(currentPage) + 1;
    btn5Ref.textContent = Number(currentPage) + 2;
    btn3Ref.classList.add('pagination--current');
    leftArrowRef.hidden = false;
    prevDotsRef.hidden = false;
    firstPageRef.hidden = false;
  } else {
    btns.forEach(el => el.classList.remove('pagination--current'));
    if (Number(currentPage) == 2) { btn2Ref.textContent = 2; btn2Ref.classList.add('pagination--current'); }
    if (Number(currentPage) == 3) { btn2Ref.textContent = 3; btn3Ref.classList.add('pagination--current'); }
    if (Number(currentPage) == 4) { btn2Ref.textContent = 4; btn4Ref.classList.add('pagination--current'); }
    if (Number(currentPage) == 5) { btn2Ref.textContent = 5; btn5Ref.classList.add('pagination--current'); }
    leftArrowRef.hidden = true;
    prevDotsRef.hidden = true;
    firstPageRef.hidden = true;
  };
    
};

export function correctWorkOfPag(currentPage, lastPage) {
  if (Number(currentPage) === lastPage || numberButtons.find(el => Number(el.textContent) === lastPage)) {
      rightArrowRef.setAttribute('style', 'display:none');
      afterDotsRef.setAttribute('style', 'display:none');
      lastPageRef.setAttribute('style', 'display:none');
    }

  
    numberButtons.forEach(el => {
      if (Number(el.textContent) > lastPage) {
        el.setAttribute('style', 'display:none');
      }
    });


    if (Number(currentPage) >= 5 && Number(currentPage) < lastPage - 2) {
      numberButtons.forEach(el => el.classList.remove('pagination--current'));
      btn3Ref.textContent = Number(currentPage);
      btn3Ref.classList.add('pagination--current');
      btn2Ref.textContent = Number(currentPage) - 1;
      btn1Ref.textContent = Number(currentPage) - 2;
      btn4Ref.textContent = Number(currentPage) + 1;
      btn5Ref.textContent = Number(currentPage) + 2;

      firstPageRef.hidden = false;
      leftArrowRef.hidden = false;
      prevDotsRef.hidden = false;
    }

    if (Number(currentPage) >= Number(lastPage) - 3) {
      //  btn3Ref.textContent = Number(currentPage);
      // btn3Ref.classList.add('pagination--current');
      // btn5Ref.hidden = true;
      rightArrowRef.hidden = true;
      afterDotsRef.hidden = true;
    }
    
    numberButtons.forEach(el => {
      if (Number(el.textContent) < 1) {
        el.hidden = true;
      }
    });

    if (Number(currentPage) <= 4) {
      numberButtons.forEach(el => el.classList.remove('pagination--current'));
      btn1Ref.textContent = 1;
      btn2Ref.textContent = 2;
      btn3Ref.textContent = 3;
      btn4Ref.textContent = 4;
      btn5Ref.textContent = 5;
      leftArrowRef.hidden = true;
      firstPageRef.hidden = true;
      prevDotsRef.hidden = true;
      if (Number(currentPage) === 4) {
        btn4Ref.classList.add('pagination--current');
      };
      if (Number(currentPage) === 3) {
        btn3Ref.classList.add('pagination--current');
      };
      if (Number(currentPage) === 2) {
        btn2Ref.classList.add('pagination--current');
      };
      if (Number(currentPage) === 1) {
        btn1Ref.classList.add('pagination--current');
      }
    };
}

export function correctSubmitPag(lastPage) {
    if (lastPage <= 5) {
      // firstPageRef.setAttribute('style', 'display:none');
      lastPageRef.setAttribute('style', 'display:none');
      rightArrowRef.setAttribute('style', 'display:none');
      leftArrowRef.setAttribute('style', 'display:none');
      prevDotsRef.setAttribute('style', 'display:none');
      afterDotsRef.setAttribute('style', 'display:none');
      if (lastPage <= 4) {
        btn5Ref.setAttribute('style', 'display:none');
        if (lastPage <= 3) {
          btn4Ref.setAttribute('style', 'display:none');
          if (lastPage <= 2) {
            btn3Ref.setAttribute('style', 'display:none');
            if (lastPage <= 1) {
              btn2Ref.setAttribute('style', 'display:none');
            }
          }
        } 
      } 
    }
}