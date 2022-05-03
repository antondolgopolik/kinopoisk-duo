import express from 'express';
import createError from "http-errors";
import * as MovieFacade from '../facade/movie_facade.mjs';

export const router = express.Router();
router.get('/:movieId(\\d+)', getMovieDetailsPageData);
router.get('/', getMoviePageData);

async function getMovieDetailsPageData(req, res, next) {
    const movieId = req.params.movieId;
    const movieDetailsPageData = await MovieFacade.getMovieDetailsPageData(req.authToken, movieId);
    if (movieDetailsPageData !== null) {
        res.json(movieDetailsPageData);
    } else {
        next(createError(404));
    }
}

async function getMoviePageData(req, res, next) {
    const q = req.query.q;
    const page = req.query.page !== undefined ? req.query.page : 0;
    if (q !== undefined) {
        res.json(await MovieFacade.searchMoviePageData(q, page));
    } else {
        res.json(await MovieFacade.getMoviePageData(page));
    }
}