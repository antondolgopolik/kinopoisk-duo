import * as UserService from '../service/user_service.mjs';
import * as MovieService from '../service/movie_service.mjs';
import * as WatchTogetherRequestService from '../service/watch_together_request_service.mjs';
import * as GenreService from '../service/genre_service.mjs';
import * as MovieCastService from '../service/movie_cast_service.mjs';
import {MoviePageItemData} from "../dto/movie_page_item_data.mjs";
import {MoviePageData} from "../dto/movie_page_data.mjs";
import {MovieDetailsPageData} from "../dto/movie_details_data.mjs";

const pageSize = 10;

export function getMovieDetailsPageData(token, movieId, cb) {
    // Проверка наличия токена
    if (token !== undefined) {
        // Чтение пользователя по токену
        UserService.getUserByTokenWithExpireCheck(token, (user) => {
            if (user !== null) {
                getMovieDetailsPageDataWithUser(user, movieId, cb);
            } else {
                getMovieDetailsPageDataWithoutUser(movieId, cb);
            }
        });
    } else {
        getMovieDetailsPageDataWithoutUser(movieId, cb);
    }
}

function getMovieDetailsPageDataWithUser(user, movieId, cb) {
    // Чтение фильма
    MovieService.getMovie(movieId, (movie) => {
        // Проверка наличия фильма
        if (movie !== null) {
            // Чтение запроса для фильма у пользователя
            WatchTogetherRequestService.getWatchTogetherRequestForUser(user.userId, movieId, (watchTogetherRequest) => {
                getMovieDetailsPageDataComplete(
                    movie, watchTogetherRequest !== null, movieId, cb
                );
            });
        } else {
            cb(null);
        }
    });
}

function getMovieDetailsPageDataWithoutUser(movieId, cb) {
    // Чтение фильма
    MovieService.getMovie(movieId, (movie) => {
        // Проверка наличия фильма
        if (movie !== null) {
            // Чтение запроса для фильма у пользователя
            getMovieDetailsPageDataComplete(movie, undefined, movieId, cb);
        } else {
            cb(null);
        }
    });
}

function getMovieDetailsPageDataComplete(movie, isWatchTogetherRequested, movieId, cb) {
    GenreService.readGenresForMovie(movieId, (genres) => {
        MovieCastService.readMovieCastsForMovie(movieId, (movieCasts) => {
            cb(toMovieDetailsPageData(movie, isWatchTogetherRequested, genres, movieCasts));
        });
    });
}

function toMovieDetailsPageData(movie, isWatchTogetherRequested, genres, movieCasts) {
    return new MovieDetailsPageData(movie, isWatchTogetherRequested, genres, movieCasts);
}

export function getMoviePageData(page, cb) {
    // Кол-во страниц
    MovieService.countMovies((movieCount) => {
        // Фильмы
        MovieService.getMovies(page, (movies) => {
            cb(toMoviePageData(movieCount, movies));
        });
    });
}

export function searchMoviePageData(q, page, cb) {
    // Кол-во страниц
    MovieService.countWithTitle(q, (movieCount) => {
        // Фильмы
        MovieService.searchMovies(q, page, (movies) => {
            cb(toMoviePageData(movieCount, movies));
        });
    });
}

function toMoviePageData(movieCount, movies) {
    // Кол-во страниц
    const pageCount = Math.ceil(movieCount / pageSize);
    // Элементы
    const moviePageItemsData = [];
    movies.forEach((movie) => {
        moviePageItemsData.push(new MoviePageItemData(
            movie.title, movie.overview,
            movie.movieStatus, movie.voteAverage
        ));
    });
    return new MoviePageData(pageCount, moviePageItemsData);
}