import * as GenreDao from '../datasource/dao/genre_dao.mjs';

export async function readGenresForMovie(movieId) {
    return GenreDao.readAllForMovie(movieId);
}