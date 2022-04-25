import * as TgCodeService from '../service/tg_code_service.mjs';
import * as UserService from '../service/user_service.mjs';

export function createNewUserWithTgCode(username, password, tgCode, cb) {
    // Получить tg id из tg code
    TgCodeService.getTgCodeByTgCode(tgCode, function (tgCode) {
        // Создать нового пользователя
        UserService.createNewUser(username, password, tgCode.tgId, function (user) {
            cb(user);
        })
    });
}