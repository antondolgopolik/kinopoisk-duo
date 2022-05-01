import express from 'express';
import createError from "http-errors";
import * as MovieFacade from '../facade/movie_facade.mjs';

export const router = express.Router();
router.get('/:movieId(\\d+)', getMovieDetailsPageData);
router.get('/', getMoviePageData);

function getMovieDetailsPageData(req, res, next) {
    const movieId = req.params.movieId;
    MovieFacade.getMovieDetailsPageData(req.authToken, movieId, (movieDetailsPageData) => {
        res.json(movieDetailsPageData);
    });
}

function getMoviePageData(req, res, next) {
    const q = req.query.q;
    const page = req.query.page !== undefined ? req.query.page : 0;
    if (q !== undefined) {
        MovieFacade.searchMoviePageData(q, page, (moviePageData) => {
            res.json(moviePageData);
        });
    } else {
        MovieFacade.getMoviePageData(page, (moviePageData) => {
            res.json(moviePageData);
        });
    }
}