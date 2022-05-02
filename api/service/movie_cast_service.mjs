import * as MovieCastDao from '../datasource/dao/movie_cast_dao.mjs';

export async function readMovieCastsForMovie(movieId) {
    return MovieCastDao.readAllForMovie(movieId);
}