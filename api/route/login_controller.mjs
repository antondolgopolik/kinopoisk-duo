import express from 'express';
import createError from 'http-errors';
import * as UserService from '../service/user_service.mjs'
import * as UserTokenService from "../service/user_token_service.mjs";

export const router = express.Router();
router.post('/', login);

// Выполнение входа
function login(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    // Проверить username и password
    UserService.checkPassword(username, password, (user, valid) => {
        if (valid) {
            UserTokenService.createNewUserToken(user, (userToken) => {
                res.json({token: userToken.token});
            });
        } else {
            next(createError(403, 'Wrong credentials'));
        }
    });
}