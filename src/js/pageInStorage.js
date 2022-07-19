import storage from './storage';
// import { currentPage } from './pagination';
import * as page from './pagination';
console.log(page.currentPage)
export const STORAGE_PAGE_KEY = 'last visit page';
export const storagePage = storage.load(STORAGE_PAGE_KEY);

changeStoragePage();

function changeStoragePage() {
  if (page.currentPage > 1 && page.currentPage !== storagePage?.value) {
    storage.remove(STORAGE_PAGE_KEY);
    storage.save(STORAGE_PAGE_KEY, { value: page.currentPage });
  }
}
