import * as WatchTogetherRequestDao from '../datasource/dao/watch_together_request_dao.mjs';
import * as WatchTogetherOfferService from '../service/watch_together_offer_service.mjs';
import {WatchTogetherRequest} from "../entity/watch_together_request.mjs";

export function getWatchTogetherRequestForUser(userId, movieId, cb) {
    WatchTogetherRequestDao.readForUser(userId, movieId, (watchTogetherRequest) => {
        cb(watchTogetherRequest);
    });
}

export function getWatchTogetherRequestsForUser(userId, cb) {
    WatchTogetherRequestDao.readAllForUser(userId, (watchTogetherRequests) => {
        cb(watchTogetherRequests);
    })
}

export function createWatchTogetherRequestForUser(userId, movieId, cb) {
    // Получение встречного запроса
    WatchTogetherRequestDao.readAvailableForUser(userId, movieId, (wtr1) => {
        // Проверка наличия встречного запроса
        if (wtr1 !== null) {
            // Заморозка встречного запроса
            updateWatchTogetherRequestForUser(new WatchTogetherRequest(movieId, wtr1.userId, false), () => {
                // Создание запроса для первого пользователя
                WatchTogetherRequestDao.create(movieId, userId, false, (wtr2) => {
                    // Создание предложений
                    WatchTogetherOfferService.createWatchTogetherOffer(userId, wtr1.userId, movieId, false, () => {
                        cb();
                    });
                });
            });
        } else {
            // Создание запроса для первого пользователя
            WatchTogetherRequestDao.create(movieId, userId, true, (wtr) => {
                cb();
            });
        }
    });
}

export function removeWatchTogetherRequestForUser(userId, movieId, cb) {
    // Удаление запроса для инициатора
    WatchTogetherRequestDao.remove(userId, movieId, () => {
        // Получение предложения для инициатора
        WatchTogetherOfferService.getWatchTogetherOfferForUser(userId, movieId, (watchTogetherOffer) => {
            // Проверка наличия предложения
            if (watchTogetherOffer !== null) {
                // Удаление предложения
                WatchTogetherOfferService.removeWatchTogetherOfferForUser(watchTogetherOffer.userId, watchTogetherOffer.offeredUserId, watchTogetherOffer.movieId, (removed) => {
                    if (removed) {
                        // Переключение запроса для предложенного пользователя в активное состояние
                        updateWatchTogetherRequestForUser(new WatchTogetherRequest(watchTogetherOffer.movieId, watchTogetherOffer.offeredUserId, true), () => {
                            cb();
                        });
                    }
                });
            } else {
                cb();
            }
        });
    });
}

export function updateWatchTogetherRequestForUser(watchTogetherRequest, cb) {
    WatchTogetherRequestDao.update(watchTogetherRequest, () => {
        cb();
    });
}