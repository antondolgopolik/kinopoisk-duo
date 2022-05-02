import * as WatchTogetherOfferDao from '../datasource/dao/watch_together_offer_dao.mjs';
import * as UserService from '../service/user_service.mjs';
import * as MovieService from '../service/movie_service.mjs';
import axios from 'axios';

export async function getWatchTogetherOfferForUser(userId, movieId) {
    return WatchTogetherOfferDao.read(userId, movieId);
}

export async function createWatchTogetherOffer(userId1, userId2, movieId, isAccepted) {
    const wtr1Promise = WatchTogetherOfferDao.create(userId1, movieId, userId2, isAccepted);
    const wtr2Promise = WatchTogetherOfferDao.create(userId2, movieId, userId1, isAccepted);
    // Жду создания предложений
    await Promise.all([wtr1Promise, wtr2Promise]);
    // Жду отправки уведомлений
    await sendWatchTogetherOfferCreatedNotification(userId1, userId2, movieId);
}

async function sendWatchTogetherOfferCreatedNotification(userId1, userId2, movieId) {
    const user1Promise = UserService.getUserByUserId(userId1);
    const user2Promise = UserService.getUserByUserId(userId2);
    const moviePromise = MovieService.getMovie(movieId);
    const [user1, user2, movie] = await Promise.all([user1Promise, user2Promise, moviePromise]);
    try {
        await axios.post(`http://localhost:8080/api/notification/message/confirmation?userFirst=${user1.tgId}&userSecond=${user2.tgId}&movie=${movie.title}`);
    } catch (err) {
        console.error('Failed to send wto created notification!');
    }
}

export async function removeWatchTogetherOfferForUser(userId, offeredUserId, movieId) {
    // Удаление запроса для инициатора
    const removed1 = await WatchTogetherOfferDao.remove(userId, movieId);
    if (removed1) {
        // Удаление запроса для предложенного пользователя
        const removed2 = await WatchTogetherOfferDao.remove(offeredUserId, movieId);
        if (removed2) {
            // Жду отправки уведомлений
            await sendWatchTogetherOfferRemovedNotification(offeredUserId, movieId);
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

async function sendWatchTogetherOfferRemovedNotification(offeredUserId, movieId) {
    const offeredUserPromise = UserService.getUserByUserId(offeredUserId);
    const moviePromise = MovieService.getMovie(movieId);
    const [offeredUser, movie] = await Promise.all([offeredUserPromise, moviePromise]);
    try {
        await axios.post(`http://localhost:8080/api/notification/message/cancellation?user=${offeredUser.tgId}&movie=${movie.title}`);
    } catch (err) {
        console.error('Failed to send wto removed notification!')
    }
}