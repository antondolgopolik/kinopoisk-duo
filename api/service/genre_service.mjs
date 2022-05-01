import * as GenreDao from '../datasource/dao/genre_dao.mjs';

export function readGenresForMovie(movieId, cb) {
    GenreDao.readAllForMovie(movieId, (genres) => {
        cb(genres);
    });
}