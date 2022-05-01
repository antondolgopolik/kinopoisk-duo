import crypto from "crypto";
import * as UserTokenDao from '../datasource/dao/user_token_dao.mjs';

export function createNewUserToken(user, cb) {
    // Создать токен
    crypto.randomBytes(48, (err, buf) => {
        const token = buf.toString('hex');
        // Подготовить дату окончания срока годности
        const temp = new Date();
        temp.setDate(temp.getDate() + 30);
        const expires = temp.toISOString().slice(0, 10);
        // Создать токен
        UserTokenDao.create(token, user.userId, expires, cb);
    });
}

export function removeUserToken(token, cb) {
    UserTokenDao.remove(token, () => {
        cb();
    });
}