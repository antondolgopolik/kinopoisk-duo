import express from 'express';
import createError from "http-errors";
import * as UserFacade from '../facade/user_facade.mjs';

export const router = express.Router();
router.get('/', getUserPageData);
router.get('/me', getCurrentUser)

async function getUserPageData(req, res, next) {
    const page = req.query.page !== undefined ? req.query.page : 0;
    res.json(await UserFacade.getUserPageData(page));
}

async function getCurrentUser(req, res, next) {
    // Проверка наличия токена
    if (req.authToken !== undefined) {
        const userData = await UserFacade.getUserDataByToken(req.authToken);
        if (userData !== null) {
            res.json(userData);
        } else {
            res.status(401).send('Token is wrong or expired');
        }
    } else {
        next(createError(401, 'Token is required'));
    }
}