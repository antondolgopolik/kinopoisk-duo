import express from 'express';
import * as UserFacade from "../facade/user_facade.mjs";
import * as UserTokenService from "../service/user_token_service.mjs";

export const router = express.Router();
router.post('/', register);

// Регистрация нового пользователя
function register(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const tgCode = req.body.tg_code;
    // Создать пользователя
    UserFacade.createNewUserWithTgCode(username, password, tgCode, function (user) {
        // Создать токен
        UserTokenService.createNewUserToken(user, function (userToken) {
            res.json({token: userToken.token});
        });
    });
}