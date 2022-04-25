import bcrypt from 'bcrypt';
import * as UserDao from '../datasource/dao/user_dao.mjs';

export function createNewUser(username, password, tgId, cb) {
    // Хэширование пароля
    bcrypt.hash(password, 10, function (err, hashedPassword) {
        // Создание пользователя
        UserDao.create(username, hashedPassword, tgId, function (user) {
            cb(user);
        });
    })
}

export function getUser(username, cb) {
    UserDao.readByUsername(username, function (user) {
        cb(user);
    });
}

export function checkPassword(username, password, cb) {
    // Найти пользователя
    getUser(username, function (user) {
        if (user !== null) {
            // Проверить пароль
            bcrypt.compare(password, user.hashedPassword, function (err, result) {
                cb(user, result);
            });
        } else {
            cb(user, false);
        }
    });
}