import {connection} from '../db_helper.mjs';
import {User} from '../../entity/user.mjs';

export function create(username, hashedPassword, tgId, cb) {
    const sql = 'INSERT INTO users (username, hashed_password, tg_id) VALUES (?, ?, ?)';
    connection.query(sql, [username, hashedPassword, tgId], function (err, results, fields) {
        if (err) {
            throw 'Failed to create new user!';
        }
        cb(new User(results.insertId, username, hashedPassword, tgId));
    });
}

export function readByUsername(username, cb) {
    const sql = 'SELECT * from users WHERE username = ?';
    connection.query(sql, [username], function (err, results, fields) {
        if (err) {
            throw 'Failed to select user!'
        }
        if ((typeof results !== 'undefined') && (results.length > 0)) {
            const raw = results[0];
            cb(new User(raw.user_id, raw.username, raw.hashed_password, raw.tg_id));
        } else {
            cb(null);
        }
    });
}