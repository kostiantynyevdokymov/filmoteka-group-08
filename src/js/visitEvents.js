import { storagePage } from './pageInStorage';
import * as page from './pagination';
import { loadStoragePage } from './fetchMovies';


 export const refs = {
    comeBackBtn: document.querySelector('button.js-visit-back-btn'),
    visitModal: document.querySelector("[data-modal].dialog"),   
    visitCloseBtn: document.querySelector("button.js-visit-close-btn"),
};
    refs.comeBackBtn.addEventListener("click", comeBackBtnToggle); 
    refs.visitCloseBtn.addEventListener("click", toggleModal);
    
    
let timerId;
(() => {
    if (page.currentPage == 1 || storagePage?.value === undefined) {
        return 
    } else {        
        toggleModal();
        return  timerId = setTimeout(() => { toggleModal() }, 15000);      
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
    refs.visitModal.classList.toggle("is-hidden");     
    loadStoragePage()
    if (refs.visitModal.classList.value.includes("hidden") === true) {
           clearTimeout(timerId);  
        refs.comeBackBtn.removeEventListener("click", comeBackBtnToggle);        
        refs.visitCloseBtn.removeEventListener("click", toggleModal);
    };
};
