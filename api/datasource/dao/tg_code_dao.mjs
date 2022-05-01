import {connection} from '../db_helper.mjs';
import {TgCode} from '../../entity/tg_code.mjs';

export function readByTgCode(tgCode, cb) {
    const sql = 'SELECT * FROM tg_codes WHERE tg_code = ?';
    connection.query(sql, [tgCode], (err, results, fields) => {
        if (err) {
            throw 'Failed to select tg code!';
        }
        // Проверка наличия
        if ((typeof results !== 'undefined') && (results.length > 0)) {
            const row = results[0];
            cb(new TgCode(row.tg_code, row.tg_id, row.expires));
        } else {
            cb(null);
        }
    });
}