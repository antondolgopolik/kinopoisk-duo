import {connection} from '../db_helper.mjs';
import {UserToken} from '../../entity/user_token.mjs';

export function create(token, userId, expires, cb) {
    const sql = 'INSERT INTO user_tokens (token, user_id, expires) VALUES (?, ?, ?)';
    connection.query(sql, [token, userId, expires], (err, results, fields) => {
        if (err) {
            throw 'Failed to create new token!';
        }
        cb(new UserToken(token, userId, expires));
    });
}

export function remove(token, cb) {
    const sql = 'DELETE FROM user_tokens WHERE token = ?';
    connection.query(sql, [token], (err, results, fields) => {
        if (err) {
            throw 'Failed to remove token!';
        }
        cb();
    });
}