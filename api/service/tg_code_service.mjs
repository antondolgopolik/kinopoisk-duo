import * as TgCodeDao from '../datasource/dao/tg_code_dao.mjs';

export function getTgCodeByTgCode(tgCode, cb) {
    TgCodeDao.readByTgCode(tgCode, function (tgCode) {
        cb(tgCode);
    });
}