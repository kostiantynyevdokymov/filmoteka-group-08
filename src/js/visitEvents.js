import { loadPopularStoragePage } from "./loadPage";
import { loadFetchMovies } from "./fetchMovies";
import { popularStoragePage,storagePage } from "./storageKeys";
import storage from "./storage";




 export const refs = {
    comeBackBtn: document.querySelector('button.js-visit-back-btn'),
    visitModal: document.querySelector("[data-modal].dialog"),   
    visitCloseBtn: document.querySelector("button.js-visit-close-btn"),
};
    refs.comeBackBtn.addEventListener("click", comeBackBtnToggle); 
    refs.visitCloseBtn.addEventListener("click", toggleModal);
    
   
let timerId;
//сессионная метка
const storageMark = sessionStorage.getItem('mark');
console.log(storageMark);
    
(() => {
    if (storageMark !== null) {
        return 
    } else {        
        toggleModal();
        sessionStorage.setItem('mark', JSON.stringify('mark'));
        return timerId = setTimeout(() => { toggleModal() }, 15000);      
    }
})();    




function toggleModal() {   
    refs.visitModal.classList.toggle("is-hidden");    
    
    if (refs.visitModal.classList.value.includes("hidden") === true) {
           clearTimeout(timerId);  
        refs.comeBackBtn.removeEventListener("click", comeBackBtnToggle);        
        refs.visitCloseBtn.removeEventListener("click", toggleModal);
    };
};

function comeBackBtnToggle() {   
     let currentPage = 1
    refs.visitModal.classList.toggle("is-hidden");  

    if (popularStoragePage > 1 ) {
        currentPage = popularStoragePage;
        loadPopularStoragePage(currentPage);
    } else {
        currentPage = storagePage;
        loadFetchMovies(storagePage);
    }
    
    if (refs.visitModal.classList.value.includes("hidden") === true) {
           clearTimeout(timerId);  
        refs.comeBackBtn.removeEventListener("click", comeBackBtnToggle);        
        refs.visitCloseBtn.removeEventListener("click", toggleModal);
    };
};
