import * as MovieDao from '../datasource/dao/movie_dao.mjs';

export function getMovie(movieId, cb) {
    MovieDao.readById(movieId, function (movie) {
        cb(movie);
    });
}