import * as UserService from '../service/user_service.mjs';
import * as WatchTogetherRequestService from '../service/watch_together_request_service.mjs';

export async function createWatchTogetherRequestForCurrentUser(token, movieId) {
    const user = await UserService.getUserByTokenWithExpireCheck(token);
    if (user !== null) {
        await WatchTogetherRequestService.createWatchTogetherRequestForUser(user.userId, movieId);
        return true;
    } else {
        return false;
    }
}

export async function removeWatchTogetherRequestForCurrentUser(token, movieId) {
    const user = await UserService.getUserByTokenWithExpireCheck(token);
    if (user !== null) {
        // Удаление запроса
        await WatchTogetherRequestService.removeWatchTogetherRequestForUser(user.userId, movieId);
        return true;
    } else {
        return false;
    }
}