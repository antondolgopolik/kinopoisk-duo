import {connection} from '../db_helper.mjs';
import {WatchTogetherOffer} from "../../entity/watch_together_offer.mjs";

export function create(userId, movieId, offeredUserId, isAccepted, cb) {
    const sql = 'INSERT INTO watch_together_offers (user_id, movie_id, offered_user_id, is_accepted) VALUES (?, ?, ?, ?)';
    connection.query(sql, [userId, movieId, offeredUserId, isAccepted], (err, results, fields) => {
        if (err) {
            throw 'Failed to insert new watch together offer!';
        }
        cb(new WatchTogetherOffer(results.insertId, userId, movieId, offeredUserId, isAccepted));
    });
}

export function read(userId, movieId, cb) {
    const sql = 'SELECT * FROM watch_together_offers WHERE user_id = ? AND movie_id = ?';
    connection.query(sql, [userId, movieId], (err, results, fields) => {
        if (err) {
            throw 'Failed to select watch together offer!';
        }
        if ((typeof results !== 'undefined') && (results.length > 0)) {
            const row = results[0];
            cb(rowToWatchTogetherOffer(row));
        } else {
            cb(null);
        }
    });
}

export function remove(userId, movieId, cb) {
    const sql = 'DELETE FROM watch_together_offers WHERE user_id = ? AND movie_id = ?';
    connection.query(sql, [userId, movieId], (err, results, fields) => {
        if (err) {
            throw 'Failed to remove watch together offer!';
        }
        cb(results.affectedRows > 0);
    });
}

function rowToWatchTogetherOffer(row) {
    return new WatchTogetherOffer(
        row.watch_together_offer_id, row.user_id,
        row.movie_id, row.offered_user_id, row.is_accepted
    );
}