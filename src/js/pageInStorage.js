import storage from './storage'

const STORAGE_PAGE_KEY = "Start on last visit page?";
const storagePage = storage.load(STORAGE_PAGE_KEY)

function changeStoragePage() {
    if (page > 1 && page !== storagePage.value) {        
        storage.remove(STORAGE_PAGE_KEY);
        storage.save(STORAGE_PAGE_KEY, { value: page });
    }    
}
function loadStoragePage() { 
    page = storagePage.value
}
