import {connection} from '../db_helper.mjs';
import {WatchTogetherRequest} from "../../entity/watch_together_request.mjs";

export function create(movieId, userId, is_active, cb) {
    const sql = 'INSERT INTO watch_together_requests (movie_id, user_id, is_active) VALUES (?, ?, ?)';
    connection.query(sql, [movieId, userId, is_active], (err, results, fields) => {
        if (err) {
            throw 'Failed to insert new watch together request!';
        }
        cb(new WatchTogetherRequest(movieId, userId, is_active));
    });
}

export function readForUser(userId, movieId, cb) {
    const sql = 'SELECT * FROM watch_together_requests WHERE user_id = ? AND movie_id = ?';
    connection.query(sql, [userId, movieId], (err, results, fields) => {
        if (err) {
            throw 'Failed to select watch together request!';
        }
        if ((typeof results !== 'undefined') && (results.length > 0)) {
            const row = results[0];
            cb(rowToWatchTogetherRequest(row));
        } else {
            cb(null);
        }
    });
}

export function readAvailableForUser(userId, movieId, cb) {
    const sql = `SELECT wtr.*
                 FROM watch_together_requests wtr
                 WHERE wtr.movie_id = ?
                      AND wtr.user_id != ?
                      AND wtr.user_id NOT IN
                          (SELECT ignore_user_id FROM watch_together_request_ignores wtri WHERE wtri.movie_id = ? AND wtri.user_id = ?)
                      AND wtr.is_active = true
                 LIMIT 1`;
    connection.query(sql, [movieId, userId, movieId, userId], (err, results, fields) => {
        if (err) {
            throw 'Failed to select watch together requests!';
        }
        if ((typeof results !== 'undefined') && (results.length > 0)) {
            const row = results[0];
            cb(rowToWatchTogetherRequest(row));
        } else {
            cb(null);
        }
    });
}

export function readAllForUser(userId, cb) {
    const sql = 'SELECT * FROM watch_together_requests WHERE user_id = ?';
    connection.query(sql, [userId], (err, results, fields) => {
        if (err) {
            throw 'Failed to select watch together requests!';
        }
        cb(resultsToWatchTogetherRequests(results));
    });
}

function resultsToWatchTogetherRequests(results) {
    if ((typeof results !== 'undefined') && (results.length > 0)) {
        const watchTogetherRequests = [];
        results.forEach((row) => {
            watchTogetherRequests.push(rowToWatchTogetherRequest(row));
        });
        return watchTogetherRequests;
    } else {
        return [];
    }
}

function rowToWatchTogetherRequest(row) {
    return new WatchTogetherRequest(row.movie_id, row.user_id, row.is_active);
}

export function update(watchTogetherRequest, cb) {
    const sql = 'UPDATE watch_together_requests SET is_active = ? WHERE movie_id = ? AND user_id = ?';
    connection.query(sql, [watchTogetherRequest.isActive, watchTogetherRequest.movieId, watchTogetherRequest.userId], (err, results, fields) => {
        if (err) {
            throw 'Failed to update watch together request!';
        }
        cb();
    });
}

export function remove(userId, movieId, cb) {
    const sql = 'DELETE FROM watch_together_requests WHERE user_id = ? AND movie_id = ?';
    connection.query(sql, [userId, movieId], (err, results, fields) => {
        if (err) {
            throw 'Failed to remove watch together request!';
        }
        cb();
    });
}