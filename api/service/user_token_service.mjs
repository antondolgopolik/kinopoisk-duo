import crypto from "crypto";
import * as UserTokenDao from '../datasource/dao/user_token_dao.mjs';

export async function createNewUserToken(user) {
    const buf = await crypto.randomBytes(48);
    // Создать токен
    const token = buf.toString('hex');
    // Подготовить дату окончания срока годности
    const temp = new Date();
    temp.setDate(temp.getDate() + 30);
    const expires = temp.toISOString().slice(0, 10);
    // Создать токен
    return UserTokenDao.create(token, user.userId, expires);
}

export async function removeUserToken(token) {
    return UserTokenDao.remove(token);
}