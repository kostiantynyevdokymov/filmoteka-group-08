// 1. Для кожного зображення додати loading='lazy'
// 2. Для того, щоб працювало в усіх браузерах, потрібна бібліотека lazysizes(знайти на git hub)
// можна використати CDN lazysizes.min.js  , додати скрипт динамічно
// - додати всім зобраенням class='lazyload'
// - src замінити на data-src
// 3. видаляємо слухача за допомогою 'once'(підтримується майже всіма браузерами), додається в опції. Після того як
// addEventListener спрацює один раз, він самовидалиться


// Feature detection
if ('loading' in HTMLImageElement.prototype) {
    console.log('Браузер підтримує lazyload');
    const lazyImages = document.querySelectorAll('image[loading="lazy"]');
    lazyImages.forEach(image => {
        image.src = image.dataset.src;
    });
// supported in browser
} else {
    console.log('Браузер не підтримує lazyload');
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    script.integrity = 'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
    script.crossOrigin = 'anonymous';
    script.referrerpolicy = 'no-referrer';
    document.body.appendChild(script);
// fetch polyfill/third-party library
}

const lazyImages = document.querySelectorAll('image[data-src]');
    console.log(lazyImages);

    lazyImages.forEach(image => {
    image.addEventListener('load', onImageLoaded, { once: true });
});

function onImageLoaded(event) {
// можна додати класс, анімацію і тд
// event.target.classList.add();
}