import express from 'express';
import createError from "http-errors";
import * as UserFacade from '../facade/user_facade.mjs';

export const router = express.Router();
router.get('/:username', getUserProfilePageData);

async function getUserProfilePageData(req, res, next) {
    const username = req.params.username;
    // Получение данных
    const userProfilePageData = await UserFacade.getUserProfilePageData(username);
    if (userProfilePageData !== null) {
        res.json(userProfilePageData);
    } else {
        next(createError(404, 'User with given username wasn\'t found'));
    }
}