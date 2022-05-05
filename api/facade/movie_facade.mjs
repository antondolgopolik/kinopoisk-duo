import * as UserService from '../service/user_service.mjs';
import * as MovieService from '../service/movie_service.mjs';
import * as WatchTogetherRequestService from '../service/watch_together_request_service.mjs';
import * as GenreService from '../service/genre_service.mjs';
import * as MovieCastService from '../service/movie_cast_service.mjs';
import {MoviePageItemData} from "../dto/movie_page_item_data.mjs";
import {MoviePageData} from "../dto/movie_page_data.mjs";
import {MovieDetailsPageData} from "../dto/movie_details_data.mjs";

const pageSize = 10;

export async function getMovieDetailsPageData(token, movieId) {
    if (token !== undefined) {
        const user = await UserService.getUserByTokenWithExpireCheck(token);
        if (user !== null) {
            return getMovieDetailsPageDataWithUser(user, movieId);
        } else {
            return getMovieDetailsPageDataWithoutUser(movieId);
        }
    } else {
        return getMovieDetailsPageDataWithoutUser(movieId);
    }
}

async function getMovieDetailsPageDataWithUser(user, movieId) {
    const movie = await MovieService.getMovie(movieId);
    if (movie !== null) {
        const wtr = await WatchTogetherRequestService.getWatchTogetherRequestForUser(user.userId, movieId);
        return getMovieDetailsPageDataComplete(movie, wtr !== null, movieId);
    } else {
        return null;
    }
}

async function getMovieDetailsPageDataWithoutUser(movieId) {
    const movie = await MovieService.getMovie(movieId);
    if (movie !== null) {
        return getMovieDetailsPageDataComplete(movie, undefined, movieId)
    } else {
        return null;
    }
}

async function getMovieDetailsPageDataComplete(movie, isWatchTogetherRequested, movieId) {
    const genresPromise = GenreService.readGenresForMovie(movieId);
    const movieCastsPromise = MovieCastService.readMovieCastsForMovie(movieId);
    const [genres, movieCasts] = await Promise.all([genresPromise, movieCastsPromise]);
    movie.genres = genres;
    movie.movieCasts = movieCasts;
    movie.isWatchTogetherRequested = isWatchTogetherRequested;
    return toMovieDetailsPageData(movie, undefined, undefined, undefined);
}

function toMovieDetailsPageData(movie, isWatchTogetherRequested, genres, movieCasts) {
    return new MovieDetailsPageData(movie, isWatchTogetherRequested, genres, movieCasts);
}

export async function getMoviePageData(page) {
    const movieCountPromise = MovieService.countMovies();
    const moviesPromise = MovieService.getMovies(page);
    const [movieCount, movies] = await Promise.all([movieCountPromise, moviesPromise]);
    return toMoviePageData(movieCount, movies);
}

export async function searchMoviePageData(q, page) {
    const movieCountPromise = MovieService.countWithTitle(q);
    const moviesPromise = MovieService.searchMovies(q, page);
    const [movieCount, movies] = await Promise.all([movieCountPromise, moviesPromise]);
    return toMoviePageData(movieCount, movies);
}

function toMoviePageData(movieCount, movies) {
    // Кол-во страниц
    const pageCount = Math.ceil(movieCount / pageSize);
    // Элементы
    const moviePageItemsData = [];
    movies.forEach((movie) => {
        moviePageItemsData.push(new MoviePageItemData(
            movie.movieId, movie.title, movie.overview,
            movie.movieStatus, movie.voteAverage
        ));
    });
    return new MoviePageData(pageCount, moviePageItemsData);
}