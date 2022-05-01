import bcrypt from 'bcrypt';
import * as UserDao from '../datasource/dao/user_dao.mjs';
import * as UserTokenService from "./user_token_service.mjs";

export function createNewUser(username, password, tgId, cb) {
    // Хэширование пароля
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        // Создание пользователя
        UserDao.create(username, hashedPassword, tgId, (user) => {
            cb(user);
        });
    })
}

export function getUsers(page, cb) {
    UserDao.readWithPage(page, (users) => {
       cb(users);
    });
}

export function countUsers(cb) {
    UserDao.count((userCount) => {
       cb(userCount);
    });
}

export function getUserByUsername(username, cb) {
    UserDao.readByUsername(username, (user) => {
        cb(user);
    });
}

export function getUserByTokenWithExpireCheck(token, cb) {
    UserDao.readByToken(token, (user, userToken) => {
        // Проверка срока годности
        if (userToken.expires > new Date()) {
            cb(user);
        } else {
            // Удалить просроченный токен
            UserTokenService.removeUserToken(token, () => {
                cb(null);
            });
        }
    });
}

export function checkPassword(username, password, cb) {
    // Найти пользователя
    getUserByUsername(username, (user) => {
        if (user !== null) {
            // Проверить пароль
            bcrypt.compare(password, user.hashedPassword, (err, result) => {
                cb(user, result);
            });
        } else {
            cb(user, false);
        }
    });
}