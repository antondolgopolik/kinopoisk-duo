import express from 'express';
import createError from "http-errors";
import * as UserFacade from "../facade/user_facade.mjs";
import * as UserTokenService from "../service/user_token_service.mjs";

export const router = express.Router();
router.post('/', register);

// Регистрация нового пользователя
async function register(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const tgCode = req.body.tg_code;
    // Создать пользователя
    const user = await UserFacade.createNewUserWithTgCode(username, password, tgCode);
    if (user !== null) {
        const userToken = await UserTokenService.createNewUserToken(user);
        res.json({token: userToken.token});
    } else {
        next(createError(404, 'Telegram code is wrong'));
    }
}