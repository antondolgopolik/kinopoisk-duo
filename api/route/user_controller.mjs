import express from 'express';
import createError from "http-errors";
import * as UserFacade from '../facade/user_facade.mjs';

export const router = express.Router();
router.get('/', getUserPageData);
router.get('/me', getCurrentUser)

function getUserPageData(req, res, next) {
    const page = req.query.page !== undefined ? req.query.page : 0;
    UserFacade.getUserPageData(page, (userPageData) => {
        res.json(userPageData);
    });
}

function getCurrentUser(req, res, next) {
    // Проверка наличия токена
    if (req.authToken !== undefined) {
        // Получения пользовательских данных по токену
        UserFacade.getUserDataByToken(req.authToken, (userData) => {
            // Проверка наличия данных, полученных по токену
            if (userData !== null) {
                res.json(userData);
            } else {
                res.status(401).send('Token is wrong or expired');
            }
        });
    } else {
        next(createError(401, 'Token is required'));
    }
}