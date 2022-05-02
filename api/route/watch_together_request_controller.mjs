import express from 'express';
import createError from "http-errors";
import * as WatchTogetherRequestFacade from '../facade/watch_together_request_facade.mjs';

export const router = express.Router();
router.post('/:movieId/create', createWatchTogetherRequestForCurrentUser);
router.delete('/:movieId/delete', removeWatchTogetherRequestForCurrentUser);

async function createWatchTogetherRequestForCurrentUser(req, res, next) {
    if (req.authToken !== undefined) {
        const movieId = req.params.movieId;
        const success = await WatchTogetherRequestFacade.createWatchTogetherRequestForCurrentUser(req.authToken, movieId);
        if (success) {
            res.status(200).send();
        } else {
            next(createError(401, 'Token is wrong or expired'));
        }
    } else {
        next(createError(401, 'Token is required'));
    }
}

async function removeWatchTogetherRequestForCurrentUser(req, res, next) {
    if (req.authToken !== undefined) {
        const movieId = req.params.movieId;
        const success = await WatchTogetherRequestFacade.removeWatchTogetherRequestForCurrentUser(req.authToken, movieId);
        if (success) {
            res.status(200).send();
        } else {
            next(createError(401, 'Token is wrong or expired'));
        }
    } else {
        next(createError(401, 'Token is required'));
    }
}