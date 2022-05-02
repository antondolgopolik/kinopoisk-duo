import express from 'express';
import createError from 'http-errors';
import * as UserService from '../service/user_service.mjs'
import * as UserTokenService from "../service/user_token_service.mjs";

export const router = express.Router();
router.post('/', login);

// Выполнение входа
async function login(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    // Проверить username и password
    const {user, correct} = await UserService.checkPassword(username, password);
    if (correct) {
        const userToken = await UserTokenService.createNewUserToken(user);
        res.json({token: userToken.token});
    } else {
        next(createError(403, 'Wrong credentials'));
    }
}