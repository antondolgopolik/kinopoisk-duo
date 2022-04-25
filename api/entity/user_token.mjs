export class UserToken {
    constructor(token, userId, expires) {
        this.token = token;
        this.userId = userId;
        this.expires = expires;
    }
}