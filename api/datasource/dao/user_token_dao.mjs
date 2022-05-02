import {connection} from '../db_helper.mjs';
import {UserToken} from '../../entity/user_token.mjs';

export async function create(token, userId, expires) {
    const sql = 'INSERT INTO user_tokens (token, user_id, expires) VALUES (?, ?, ?)';
    const [rows, fields] = await connection.query(sql, [token, userId, expires]);
    return new UserToken(token, userId, expires);
}

export async function remove(token) {
    const sql = 'DELETE FROM user_tokens WHERE token = ?';
    const [rows, fields] = await connection.query(sql, [token]);
    return rows.affectedRows > 0;
}