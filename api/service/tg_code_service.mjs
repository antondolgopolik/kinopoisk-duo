import * as TgCodeDao from '../datasource/dao/tg_code_dao.mjs';

export async function getTgCodeByTgCode(tgCode) {
    return TgCodeDao.readByTgCode(tgCode);
}