const libraryList = document.querySelector('.library-list');

const itemMarkUp = `
<li class="library-item">
    <a href="#" class="home-link">
        <div class="home-card">
            <div class="card-info">
                <img class="home-card__img" src="#" alt="">
                <h2 class="card-info__title">Назва фільму</h2>
                <p class="card-info_descr">
                    <span>Жанр</span>
                    <span>Рік</span>
                </p>
            </div>
        </div>
    </a>
</li>
`;

async function renderLibMovies(arr) {
    console.log(localStorage, 'localstoradge');
}