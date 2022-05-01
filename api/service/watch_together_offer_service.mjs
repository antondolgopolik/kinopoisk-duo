import * as WatchTogetherOfferDao from '../datasource/dao/watch_together_offer_dao.mjs';
import * as UserService from '../service/user_service.mjs';
import * as MovieService from '../service/movie_service.mjs';
import axios from 'axios';

export function getWatchTogetherOfferForUser(userId, movieId, cb) {
    WatchTogetherOfferDao.read(userId, movieId, (watchTogetherOffer) => {
        cb(watchTogetherOffer);
    });
}

export function createWatchTogetherOffer(userId1, userId2, movieId, isAccepted, cb) {
    WatchTogetherOfferDao.create(userId1, movieId, userId2, isAccepted, (wtr1) => {
        WatchTogetherOfferDao.create(userId2, movieId, userId1, isAccepted, (wtr2) => {
            UserService.getUserByUserId(userId1, (user1) => {
                UserService.getUserByUserId(userId2, (user2) => {
                    MovieService.getMovie(movieId, (movie) => {
                        axios
                            .get(`http://localhost:8080/api/notification/message/confirmation?userFirst=${user1.tgId}&userSecond=${user2.tgId}&movie=${movie.title}`)
                            .then((res) => {
                                cb();
                            })
                            .catch((error) => {
                                cb();
                            });
                    });
                });
            });
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
                    UserService.getUserByUserId(offeredUserId, (offeredUser) => {
                        MovieService.getMovie(movieId, (movie) => {
                            axios
                                .get(`http://localhost:8080/api/notification/message/cancellation?user=${offeredUser.tgId}&movie=${movie.title}`)
                                .then((res) => {
                                    cb(true);
                                })
                                .catch((error) => {
                                    cb(true);
                                });
                        });
                    });
                } else {
                    cb(false);
                }
            })
        } else {
            cb(false);
        }
    });
}