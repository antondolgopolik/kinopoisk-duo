import express from 'express';
import createError from "http-errors";
import * as MovieService from '../service/movie_service.mjs';

export const router = express.Router();
router.get('/:movieId(\\d+)', getMovie);

function getMovie(req, res, next) {
    const movieId = req.params.movieId;
    // Поиск
    MovieService.getMovie(movieId, function (movie) {
        if (movie !== null) {
            res.json(movie);
        } else {
            next(createError(404, "Movie with given id wasn't found"));
        }
    });
}