import storage from './storage';
// import { currentPage } from './pagination';
import * as page from './pagination';
export const STORAGE_PAGE_KEY = 'last visit page';
export const STORAGE_MOVIES_SEARCH = 'last visit search'
export const storagePage = storage.load(STORAGE_PAGE_KEY);
export const storageLastSearchName = storage.load(STORAGE_MOVIES_SEARCH);


changeStoragePage();

function changeStoragePage() {   
    storage.save(STORAGE_PAGE_KEY, { value: page.currentPage });
  
}
