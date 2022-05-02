import * as WatchTogetherRequestDao from '../datasource/dao/watch_together_request_dao.mjs';
import * as WatchTogetherOfferService from '../service/watch_together_offer_service.mjs';
import {WatchTogetherRequest} from "../entity/watch_together_request.mjs";

export async function getWatchTogetherRequestForUser(userId, movieId) {
    return WatchTogetherRequestDao.readForUser(userId, movieId);
}

export async function getWatchTogetherRequestsForUser(userId) {
    return WatchTogetherRequestDao.readAllForUser(userId);
}

export async function createWatchTogetherRequestForUser(userId, movieId) {
    // Получение встречного запроса
    const wtr1 = await WatchTogetherRequestDao.readAvailableForUser(userId, movieId);
    if (wtr1 !== null) {
        // Заморозка встречного запроса
        await updateWatchTogetherRequestForUser(new WatchTogetherRequest(movieId, wtr1.userId, false));
        // Создание запроса для первого пользователя
        await WatchTogetherRequestDao.create(movieId, userId, false);
        // Создание предложений для обоих пользователй
        await WatchTogetherOfferService.createWatchTogetherOffer(userId, wtr1.userId, movieId, false);
    } else {
        await WatchTogetherRequestDao.create(movieId, userId, true);
    }
}

export async function removeWatchTogetherRequestForUser(userId, movieId) {
    // Удаление запроса для инициатора
    await WatchTogetherRequestDao.remove(userId, movieId);
    // Получение предложения для инициатора
    const wto = await WatchTogetherOfferService.getWatchTogetherOfferForUser(userId, movieId);
    if (wto !== null) {
        // Удаление предложения
        const removed = await WatchTogetherOfferService.removeWatchTogetherOfferForUser(wto.userId, wto.offeredUserId, wto.movieId);
        if (removed) {
            // Переключение запроса предложенного инициатору пользователя в активное состояние
            await updateWatchTogetherRequestForUser(new WatchTogetherRequest(wto.movieId, wto.offeredUserId, true));
        }
    }
}

export async function updateWatchTogetherRequestForUser(wtr) {
    return WatchTogetherRequestDao.update(wtr);
}