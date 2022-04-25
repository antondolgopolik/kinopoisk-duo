import {connection} from '../db_helper.mjs';
import {UserToken} from '../../entity/user_token.mjs';

export function create(token, userId, expires, cb) {
    const sql = 'INSERT INTO user_tokens (token, user_id, expires) VALUES (?, ?, ?)';
    connection.query(sql, [token, userId, expires], function (err, results, fields) {
        if (err) {
            throw 'Failed to create new token!';
        }
        cb(new UserToken(token, userId, expires));
    });
}