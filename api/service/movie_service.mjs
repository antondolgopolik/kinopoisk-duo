import * as MovieDao from '../datasource/dao/movie_dao.mjs';

export async function getMovie(movieId) {
    return await MovieDao.readById(movieId);
}

export async function getMovies(page) {
    return MovieDao.readWithPage(page);
}

export async function searchMovies(q, page) {
    return MovieDao.searchByTitleWithPage(q, page);
}

export async function countMovies() {
    return MovieDao.count();
}

export async function countWithTitle(title) {
    return MovieDao.countWithTitle(title);
}