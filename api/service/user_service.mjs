import bcrypt from 'bcrypt';
import * as UserDao from '../datasource/dao/user_dao.mjs';
import * as UserTokenService from "./user_token_service.mjs";

export async function createNewUser(username, password, tgId) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return UserDao.create(username, hashedPassword, tgId);
}

export async function getUsers(page) {
    return UserDao.readWithPage(page);
}

export async function countUsers() {
    return UserDao.count();
}

export async function getUserByUserId(userId) {
    return UserDao.readByUserId(userId);
}

export async function getUserByUsername(username) {
    return UserDao.readByUsername(username);
}

export async function getUserByTokenWithExpireCheck(token) {
    const result = await UserDao.readByToken(token);
    if (result) {
        // Проверка срока годности
        if (result.userToken.expires > new Date()) {
            return result.user;
        } else {
            // Удалить просроченный токен
            await UserTokenService.removeUserToken(token);
            return null;
        }
    } else {
        return null;
    }
}

export async function checkPassword(username, password) {
    const user = await getUserByUsername(username);
    if (user !== null) {
        const result = await bcrypt.compare(password, user.hashedPassword);
        return {
            user: user,
            correct: result
        };
    } else {
        return {
            user: null,
            correct: false
        }
    }
}