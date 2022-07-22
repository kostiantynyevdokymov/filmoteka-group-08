export function markUpWithGenres(arrFromStorage) {
    return arrFromStorage
        .map(
            ({
                id,
                poster_path,
                title,
                original_title,
                genre_ids,
                release_date,
                original_name,
                first_air_date,
            }) => {
                const valuesOfGenres = localStorage.getItem('arrow');
                const arrValuesOfGenres = JSON.parse(valuesOfGenres);
                let a = release_date;
                let b = first_air_date;
                if (release_date) {
                    a = a.slice(0, 4);
                }
                if (first_air_date) {
                    b = b.slice(0, 4);
                }
                const imgUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
                return `<li class="home-card js-modal-open placeholdify" data-card-movie-id="${id}">
                         <a href="#" class="home-card__link">
                         <div class="card-info">
                         <img class="home-card__img" loading='lazy' src="${imgUrl}" alt="${title}">
                         <h2 class="card-info__title">${original_title || original_name}</h2>
                        <p class="card-info_descr">
                        |
                        <span>${a || b}</span>
                        <span>${
                    findGenre(arrFromStorage, arrValuesOfGenres, 0)
                    + ', ' +
                    findGenre(arrFromStorage, arrValuesOfGenres, 1)}</span>
                    </p>
                </div>
            </a>
        </li>`;
            }
        )
        .join('');
}

//cross search by id in genre array
function findGenre(arrFromStorage, arrValuesOfGenres, index) {
    const x = arrFromStorage[index].genre_ids[0];
    return arrValuesOfGenres.find(data => data.id === x).name;
}



