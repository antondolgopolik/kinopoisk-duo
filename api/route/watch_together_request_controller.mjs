import express from 'express';
import createError from "http-errors";
import * as WatchTogetherRequestFacade from '../facade/watch_together_request_facade.mjs';

export const router = express.Router();
router.post('/:movieId/create', createWatchTogetherRequestForCurrentUser);
router.delete('/:movieId/delete', removeWatchTogetherRequestForCurrentUser);

function createWatchTogetherRequestForCurrentUser(req, res, next) {
    if (req.authToken !== undefined) {
        const movieId = req.params.movieId;
        // Создание запроса
        WatchTogetherRequestFacade.createWatchTogetherRequestForCurrentUser(req.authToken, movieId, (success) => {
            if (success) {
                res.status(200).send();
            } else {
                next(createError(401, 'Token is wrong or expired'));
            }
        });
    } else {
        next(createError(401, 'Token is required'));
    }
}

function removeWatchTogetherRequestForCurrentUser(req, res, next) {
    if (req.authToken !== undefined) {
        const movieId = req.params.movieId;
        // Удаление запроса
        WatchTogetherRequestFacade.removeWatchTogetherRequestForCurrentUser(req.authToken, movieId, (success) => {
            if (success) {
                res.status(200).send();
            } else {
                next(createError(401, 'Token is wrong or expired'));
            }
        });
    } else {
        next(createError(401, 'Token is required'));
    }
}