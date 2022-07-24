import { getGenres } from './modal';

export function movieCards(movies) {
  return movies
    .map(({ id, poster_path, title, original_title, genre_ids, release_date }) => {
      const imgUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : // : './images/netuNichego.png';
          'https://via.placeholder.com/395x574/FFFFFF/FF001B?text=No+poster';
      const year = new Date(release_date).getFullYear();
      return `<li class="home-card js-modal-open placeholdify" data-card-movie-id="${id}">
            <a href="#" class="home-card__link">
                <div class="card-info">
                    <img class="home-card__img" src="${imgUrl}" alt="${title}">
                    <h2 class="card-info__title">${original_title}</h2>
                    <p class="card-info_descr">
                        ${genre_ids.length ? `<span>${getGenres(genre_ids, 3)}</span>` : ''}
                        |
                        <span>${year}</span>
                    </p>
                </div>
            </a>
        </li>`;
    })
    .join('');
}
