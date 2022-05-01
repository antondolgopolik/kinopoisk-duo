import * as WatchTogetherOfferDao from '../datasource/dao/watch_together_offer_dao.mjs';

export function getWatchTogetherOfferForUser(userId, movieId, cb) {
    WatchTogetherOfferDao.read(userId, movieId, (watchTogetherOffer) => {
        cb(watchTogetherOffer);
    });
}

export function createWatchTogetherOffer(userId1, userId2, movieId, isAccepted, cb) {
    WatchTogetherOfferDao.create(userId1, movieId, userId2, isAccepted, (wtr1) => {
        WatchTogetherOfferDao.create(userId2, movieId, userId1, isAccepted, (wtr2) => {
            // TODO отправить уведомления в ТГ
            cb();
        });
    });
}

export function createWatchTogetherOfferForUser(userId, movieId, offeredUserId, isAccepted, cb) {
    WatchTogetherOfferDao.create(userId, movieId, offeredUserId, isAccepted, (wto) => {
        cb(wto);
    });
}

export function removeWatchTogetherOfferForUser(userId, offeredUserId, movieId, cb) {
    // Удаление запроса для инициатора
    WatchTogetherOfferDao.remove(userId, movieId, (removed) => {
        // Проверка удаления
        if (removed) {
            // Удаление запроса для предложенного пользователя
            WatchTogetherOfferDao.remove(offeredUserId, movieId, (removed) => {
                // Проверка удаления
                if (removed) {
                    // TODO отправить уведомление в ТГ для предложенного пользователя
                }
                cb(removed);
            })
        } else {
            cb(false);
        }
    });
}