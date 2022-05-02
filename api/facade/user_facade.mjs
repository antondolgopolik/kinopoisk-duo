import * as TgCodeService from '../service/tg_code_service.mjs';
import * as UserService from '../service/user_service.mjs';
import * as WatchTogetherRequestService from '../service/watch_together_request_service.mjs';
import {UserData} from "../dto/user_data.mjs";
import {UserProfilePageData} from "../dto/user_profile_page_data.mjs";
import {UserPageData} from "../dto/user_page_data.mjs";

const pageSize = 10;

export async function createNewUserWithTgCode(username, password, tgCode) {
    const tgCodeEntity = await TgCodeService.getTgCodeByTgCode(tgCode);
    if (tgCodeEntity !== null) {
        return UserService.createNewUser(username, password, tgCodeEntity.tgId);
    } else {
        return null;
    }
}

export async function getUserDataByToken(token) {
    const user = await UserService.getUserByTokenWithExpireCheck(token);
    if (user !== null) {
        return toUserData(user);
    } else {
        return null;
    }
}

function toUserData(user) {
    return new UserData(user.userId, user.username, user.tgId);
}

export async function getUserPageData(page) {
    const userCountPromise = UserService.countUsers();
    const usersPromise = UserService.getUsers(page);
    const [userCount, users] = await Promise.all([userCountPromise, usersPromise]);
    return toUserPageData(userCount, users);
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

export async function getUserProfilePageData(username) {
    const user = await UserService.getUserByUsername(username);
    if (user !== null) {
        const wtrs = await WatchTogetherRequestService.getWatchTogetherRequestsForUser(user.userId);
        return toUserProfilePageData(user, wtrs);
    } else {
        return null;
    }
}

function toUserProfilePageData(user, watchTogetherRequests) {
    return new UserProfilePageData(toUserData(user), watchTogetherRequests);
}