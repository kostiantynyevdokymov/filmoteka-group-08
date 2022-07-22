import storage from "./storage";

export const STORAGE_PAGE_KEY = 'last visit page';
export const STORAGE_MOVIES_SEARCH = 'last visit search'
export const POPULAR_STORAGE_KEY = 'last visit popular'
export const popularStoragePage = storage.load(POPULAR_STORAGE_KEY);
export const storagePage = storage.load(STORAGE_PAGE_KEY);
export const storageLastSearchText = storage.load(STORAGE_MOVIES_SEARCH);