import * as MovieDao from '../datasource/dao/movie_dao.mjs';

export function getMovie(movieId, cb) {
    MovieDao.readById(movieId, (movie) => {
        cb(movie);
    });
}

export function getMovies(page, cb) {
    MovieDao.readWithPage(page, (movies) => {
        cb(movies);
    });
}

export function searchMovies(q, page, cb) {
    MovieDao.searchByTitleWithPage(q, page, (movies) => {
        cb(movies);
    });
}

export function countMovies(cb) {
    MovieDao.count((movieCount) => {
        cb(movieCount);
    });
}

export function countWithTitle(title, cb) {
    MovieDao.countWithTitle(title, (movieCount) => {
        cb(movieCount);
    });
}