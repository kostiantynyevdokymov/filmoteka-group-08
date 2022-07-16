import storage from './storage'

const STORAGE_PAGE_KEY = "Start on last visit page?";
let storagePage = storage.load(STORAGE_PAGE_KEY)

const page = 9;



function changeStoragePage() {
    if (page > 1 && page !== storagePage.value) {        
        storage.remove(STORAGE_PAGE_KEY);
        storage.save(STORAGE_PAGE_KEY, { value: page });
    }    
}
function loadStoragePage() { 
    page = storagePage.value
}
changeStoragePage(page)


// 1)Загрузка страницы
// 2) - проверяем Сторедж на наличие посещенной страницы, если не null выводим модалку с сообщением. 
//  -==== Функционал модалки(кнопка ОК, кнопка Х, автоматическое закрытие через 20 сек) ====-.
// 3) если ОК, ссылка на страницу value  в ключ.STORAGE_PAGE_KEY