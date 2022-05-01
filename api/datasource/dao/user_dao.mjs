import {connection} from '../db_helper.mjs';
import {User} from '../../entity/user.mjs';
import {UserToken} from "../../entity/user_token.mjs";

const pageSize = 10;

export function create(username, hashedPassword, tgId, cb) {
    const sql = 'INSERT INTO users (username, hashed_password, tg_id) VALUES (?, ?, ?)';
    connection.query(sql, [username, hashedPassword, tgId], (err, results, fields) => {
        if (err) {
            throw 'Failed to insert new user!';
        }
        cb(new User(results.insertId, username, hashedPassword, tgId));
    });
}

export function readByUserId(userId, cb) {
    const sql = 'SELECT * FROM users WHERE user_id = ?';
    connection.query(sql, [userId], (err, results, fields) => {
        if (err) {
            throw 'Failed to select user!';
        }
        cb(resultsToUser(results));
    });
}

export function readByUsername(username, cb) {
    const sql = 'SELECT * FROM users WHERE username = ?';
    connection.query(sql, [username], (err, results, fields) => {
        if (err) {
            throw 'Failed to select user!'
        }
        cb(resultsToUser(results));
    });
}

function resultsToUser(results) {
    if ((typeof results !== 'undefined') && (results.length > 0)) {
        return rowToUser(results[0]);
    } else {
        return null;
    }
}

export function readWithPage(page, cb) {
    const offset = pageSize * page;
    const sql = 'SELECT * FROM users LIMIT ? OFFSET ?';
    connection.query(sql, [pageSize, offset], (err, results, fields) => {
        if (err) {
            throw 'Failed to select users!';
        }
        cb(resultsToUsers(results));
    });
}

function resultsToUsers(results) {
    if ((typeof results !== 'undefined') && (results.length > 0)) {
        const users = [];
        results.forEach((row) => {
            users.push(rowToUser(row));
        });
        return users;
    } else {
        return [];
    }
}

export function count(cb) {
    const sql = "SELECT COUNT(*) FROM users";
    connection.query(sql, [], (err, results, fields) => {
        if (err) {
            throw 'Failed to count users!';
        }
        cb(results[0]['COUNT(*)']);
    });
}

export function readByToken(token, cb) {
    const sql = 'SELECT * FROM users JOIN user_tokens WHERE token = ?';
    connection.query(sql, [token], (err, results, fields) => {
        if (err) {
            throw 'Failed to select user!'
        }
        if ((typeof results !== 'undefined') && (results.length > 0)) {
            const row = results[0];
            cb(rowToUser(row), rowToUserToken(row));
        } else {
            cb(null, null);
        }
    });
}

function rowToUser(row) {
    return new User(row.user_id, row.username, row.hashed_password, row.tg_id);
}

function rowToUserToken(row) {
    return new UserToken(row.token, row.user_id, row.expires);
}