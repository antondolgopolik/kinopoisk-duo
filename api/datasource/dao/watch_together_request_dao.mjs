import {connection} from '../db_helper.mjs';
import {WatchTogetherRequest} from "../../entity/watch_together_request.mjs";

export async function create(movieId, userId, isActive) {
    const sql = 'INSERT INTO watch_together_requests (movie_id, user_id, is_active) VALUES (?, ?, ?)';
    const [rows, fields] = await connection.query(sql, [movieId, userId, isActive]);
    return new WatchTogetherRequest(movieId, userId, isActive);
}

export async function readForUser(userId, movieId) {
    const sql = 'SELECT * FROM watch_together_requests WHERE user_id = ? AND movie_id = ?';
    const [rows, fields] = await connection.query(sql, [userId, movieId]);
    if (rows.length > 0) {
        return rowToWatchTogetherRequest(rows[0]);
    } else {
        return null;
    }
}

export async function readAvailableForUser(userId, movieId) {
    const sql = `SELECT wtr.*
                 FROM watch_together_requests wtr
                 WHERE wtr.movie_id = ?
                      AND wtr.user_id != ?
                      AND wtr.user_id NOT IN
                          (SELECT ignore_user_id FROM watch_together_request_ignores wtri WHERE wtri.movie_id = ? AND wtri.user_id = ?)
                      AND wtr.is_active = true
                 LIMIT 1`;
    const [rows, fields] = await connection.query(sql, [movieId, userId, movieId, userId]);
    if (rows.length > 0) {
        return rowToWatchTogetherRequest(rows[0]);
    } else {
        return null;
    }
}

export async function readAllForUser(userId) {
    const sql = 'SELECT * FROM watch_together_requests WHERE user_id = ?';
    const [rows, fields] = await connection.query(sql, [userId]);
    return rowsToWatchTogetherRequests(rows);
}

function rowsToWatchTogetherRequests(rows) {
    const watchTogetherRequests = [];
    rows.forEach((row) => {
        watchTogetherRequests.push(rowToWatchTogetherRequest(row));
    });
    return watchTogetherRequests;
}

function rowToWatchTogetherRequest(row) {
    return new WatchTogetherRequest(row.movie_id, row.user_id, row.is_active);
}

export async function update(wtr) {
    const sql = 'UPDATE watch_together_requests SET is_active = ? WHERE movie_id = ? AND user_id = ?';
    const [rows, fields] = await connection.query(sql, [wtr.isActive, wtr.movieId, wtr.userId]);
}

export async function remove(userId, movieId) {
    const sql = 'DELETE FROM watch_together_requests WHERE user_id = ? AND movie_id = ?';
    const [rows, fields] = await connection.query(sql, [userId, movieId]);
}