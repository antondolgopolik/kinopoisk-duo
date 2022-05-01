import * as UserService from '../service/user_service.mjs';
import * as WatchTogetherRequestService from '../service/watch_together_request_service.mjs';

export function createWatchTogetherRequestForCurrentUser(token, movieId, cb) {
    // Получение пользователя по токену
    UserService.getUserByTokenWithExpireCheck(token, (user) => {
        // Проверка наличия пользователя
        if (user !== null) {
            // Создание запроса
            WatchTogetherRequestService.createWatchTogetherRequestForUser(user.userId, movieId, () => {
                cb(true);
            });
        } else {
            cb(false);
        }
    });
}

export function removeWatchTogetherRequestForCurrentUser(token, movieId, cb) {
    // Получение пользователя по токену
    UserService.getUserByTokenWithExpireCheck(token, (user) => {
        // Проверка наличия пользователя
        if (user !== null) {
            // Удаление запроса
            WatchTogetherRequestService.removeWatchTogetherRequestForUser(user.userId, movieId, () => {
                cb(true);
            });
        } else {
            cb(false);
        }
    });
}