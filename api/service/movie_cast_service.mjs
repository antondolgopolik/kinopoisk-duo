import * as MovieCastDao from '../datasource/dao/movie_cast_dao.mjs';

export function readMovieCastsForMovie(movieId, cb) {
    MovieCastDao.readAllForMovie(movieId, (movieCasts) => {
        cb(movieCasts);
    });
}