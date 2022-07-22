import { loadPopularStoragePage } from "./loadPage";
import { loadFetchMovies } from "./fetchMovies";
import storage from "./storage";

export const STORAGE_PAGE_KEY = 'last visit page';
export const STORAGE_MOVIES_SEARCH = 'last visit search'
export const POPULAR_STORAGE_KEY = 'last visit popular'
export const popularStoragePage = storage.load(POPULAR_STORAGE_KEY);
export const storagePage = storage.load(STORAGE_PAGE_KEY);
export const storageLastSearchText = storage.load(STORAGE_MOVIES_SEARCH);

 export const refs = {
    comeBackBtn: document.querySelector('button.js-visit-back-btn'),
    visitModal: document.querySelector("[data-modal].dialog"),   
    visitCloseBtn: document.querySelector("button.js-visit-close-btn"),
};
    refs.comeBackBtn.addEventListener("click", comeBackBtnToggle); 
    refs.visitCloseBtn.addEventListener("click", toggleModal);
    
    
let timerId;
(() => {
    if ( popularStoragePage == 1 && storagePage === null ) {
        return 
    } else {        
        toggleModal();
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
    
     loadPopularStoragePage(currentPage) 
     loadFetchMovies(currentPage)
   
    if (refs.visitModal.classList.value.includes("hidden") === true) {
           clearTimeout(timerId);  
        refs.comeBackBtn.removeEventListener("click", comeBackBtnToggle);        
        refs.visitCloseBtn.removeEventListener("click", toggleModal);
    };
};
