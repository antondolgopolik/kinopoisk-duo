import express from 'express';
import createError from 'http-errors';
import * as UserTokenService from "../service/user_token_service.mjs";

export const router = express.Router();
router.delete('/', logout);

function logout(req, res, next) {
    if (req.authToken !== undefined) {
        UserTokenService.removeUserToken(req.authToken, () => {
            res.status(200).send();
        });
    } else {
        next(createError(401, 'Token is required'));
    }
}