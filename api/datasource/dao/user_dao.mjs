import {connection} from '../db_helper.mjs';
import {User} from '../../entity/user.mjs';
import {UserToken} from "../../entity/user_token.mjs";

const pageSize = 10;

export async function create(username, hashedPassword, tgId) {
    const sql = 'INSERT INTO users (username, hashed_password, tg_id) VALUES (?, ?, ?)';
    try {
        const [rows, fields] = await connection.query(sql, [username, hashedPassword, tgId]);
        return new User(rows.insertId, username, hashedPassword, tgId);
    } catch (err) {
        console.log('Failed to create new user!');
        return null;
    }
}

export async function readByUserId(userId) {
    const sql = 'SELECT * FROM users WHERE user_id = ?';
    const [rows, fields] = await connection.query(sql, [userId]);
    return rowsToUser(rows);
}

export async function readByUsername(username) {
    const sql = 'SELECT * FROM users WHERE username = ?';
    const [rows, fields] = await connection.query(sql, [username]);
    return rowsToUser(rows);
}

function rowsToUser(rows) {
    if (rows.length > 0) {
        return rowToUser(rows[0]);
    } else {
        return null;
    }
}

export async function readWithPage(page) {
    const offset = pageSize * page;
    const sql = 'SELECT * FROM users LIMIT ? OFFSET ?';
    const [rows, fields] = await connection.query(sql, [pageSize, offset]);
    return rowsToUsers(rows);
}

function rowsToUsers(rows) {
    const users = [];
    rows.forEach((row) => {
        users.push(rowToUser(row));
    });
    return users;
}

export async function count() {
    const sql = "SELECT COUNT(*) FROM users";
    const [rows, fields] = await connection.query(sql, []);
    return rows[0]['COUNT(*)'];
}

export async function readByToken(token) {
    const sql = 'SELECT * FROM users JOIN user_tokens WHERE token = ?';
    const [rows, fields] = await connection.query(sql, [token]);
    if (rows.length > 0) {
        const row = rows[0];
        return {
            user: rowToUser(row),
            userToken: rowToUserToken(row)
        };
    } else {
        return null;
    }
}

function rowToUser(row) {
    return new User(row.user_id, row.username, row.hashed_password, row.tg_id);
}

function rowToUserToken(row) {
    return new UserToken(row.token, row.user_id, row.expires);
}