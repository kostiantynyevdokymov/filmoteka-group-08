import { storagePage } from './pageInStorage';


const refs = {
    comeBackButton: document.querySelector('button.js-visit-back-btn'),
    visitModal: document.querySelector("[data-modal].dialog"),
    visitClose: document.querySelector("button.js-dialog-close"),
    visitCloseBtn: document.querySelector("button.js-visit-close-btn"),
};


    refs.comeBackButton.addEventListener("click", loadStoragePage);
    refs.visitClose.addEventListener("click", toggleModal);
    refs.visitCloseBtn.addEventListener("click", toggleModal);
    
(() => {
    if (currentPage === 1 || storagePage === undefined) {
        return 
    } else {        
        toggleModal();
        return  timerId = setTimeout(() => { toggleModal() }, 15000);      
    }
})();    

function loadStoragePage() {     
    currentPage = storagePage.value;
    toggleModal();
};

function toggleModal() {   
    refs.visitModal.classList.toggle("is-hidden");     
    
    if (refs.visitModal.classList.value.includes("hidden") === true) {
           clearTimeout(timerId);  
        refs.comeBackButton.removeEventListener("click", loadStoragePage);
        refs.visitClose.removeEventListener("click", toggleModal);
        refs.visitCloseBtn.removeEventListener("click", toggleModal);
    };
};