import * as TgCodeService from '../service/tg_code_service.mjs';
import * as UserService from '../service/user_service.mjs';
import * as WatchTogetherRequestService from '../service/watch_together_request_service.mjs';
import {UserData} from "../dto/user_data.mjs";
import {UserProfilePageData} from "../dto/user_profile_page_data.mjs";
import {UserPageData} from "../dto/user_page_data.mjs";

const pageSize = 10;

export function createNewUserWithTgCode(username, password, tgCode, cb) {
    // Получить tg id из tg code
    TgCodeService.getTgCodeByTgCode(tgCode, (tgCode) => {
        // Создать нового пользователя
        UserService.createNewUser(username, password, tgCode.tgId, (user) => {
            cb(user);
        })
    });
}

export function getUserDataByToken(token, cb) {
    UserService.getUserByTokenWithExpireCheck(token, (user) => {
        // Проверка наличия пользователя и токена
        if (user !== null) {
            cb(toUserData(user));
        } else {
            cb(null);
        }
    });
}

function toUserData(user) {
    return new UserData(user.userId, user.username, user.tgId);
}

export function getUserPageData(page, cb) {
    // Кол-во страниц
    UserService.countUsers((userCount) => {
        // Пользователи
        UserService.getUsers(page, (users) => {
            cb(toUserPageData(userCount, users));
        });
    });
}

function toUserPageData(userCount, users) {
    // Кол-во страниц
    const pageCount = Math.ceil(userCount / pageSize);
    // Элементы
    const usersData = [];
    users.forEach((user) => {
        usersData.push(new UserData(user.userId, user.username, user.tgId));
    });
    return new UserPageData(pageCount, usersData);
}

export function getUserProfilePageData(username, cb) {
    // Получить user по username
    UserService.getUserByUsername(username, (user) => {
        // Провекра наличия пользователя
        if (user !== null) {
            // Получить watch together requests для пользователя
            WatchTogetherRequestService.getWatchTogetherRequestsForUser(user.userId, (watchTogetherRequests) => {
                cb(toUserProfilePageData(user, watchTogetherRequests));
            });
        } else {
            cb(null);
        }
    });
}

function toUserProfilePageData(user, watchTogetherRequests) {
    return new UserProfilePageData(toUserData(user), watchTogetherRequests);
}