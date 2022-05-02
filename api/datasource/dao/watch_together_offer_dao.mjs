import {connection} from '../db_helper.mjs';
import {WatchTogetherOffer} from "../../entity/watch_together_offer.mjs";

export async function create(userId, movieId, offeredUserId, isAccepted) {
    const sql = 'INSERT INTO watch_together_offers (user_id, movie_id, offered_user_id, is_accepted) VALUES (?, ?, ?, ?)';
    const [rows, fields] = await connection.query(sql, [userId, movieId, offeredUserId, isAccepted]);
    return new WatchTogetherOffer(rows.insertId, userId, movieId, offeredUserId, isAccepted);
}

export async function read(userId, movieId) {
    const sql = 'SELECT * FROM watch_together_offers WHERE user_id = ? AND movie_id = ?';
    const [rows, fields] = await connection.query(sql, [userId, movieId]);
    if (rows.length > 0) {
        return rowToWatchTogetherOffer(rows[0]);
    } else {
        return null;
    }
}

export async function remove(userId, movieId) {
    const sql = 'DELETE FROM watch_together_offers WHERE user_id = ? AND movie_id = ?';
    const [rows, fields] = await connection.query(sql, [userId, movieId]);
    return rows.affectedRows > 0;
}

function rowToWatchTogetherOffer(row) {
    return new WatchTogetherOffer(
        row.watch_together_offer_id, row.user_id,
        row.movie_id, row.offered_user_id, row.is_accepted
    );
}