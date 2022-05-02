import {connection} from '../db_helper.mjs';
import {TgCode} from '../../entity/tg_code.mjs';

export async function readByTgCode(tgCode) {
    const sql = 'SELECT * FROM tg_codes WHERE tg_code = ?';
    const [rows, fields] = await connection.query(sql, [tgCode]);
    if (rows.length > 0) {
        return rowToTgCode(rows[0]);
    } else {
        return null;
    }
}

function rowToTgCode(row) {
    return new TgCode(row.tg_code, row.tg_id, row.expires);
}