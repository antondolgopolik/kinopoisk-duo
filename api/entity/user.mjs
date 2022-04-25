export class User {
    constructor(userId, username, hashedPassword, tgId) {
        this.userId = userId;
        this.username = username;
        this.hashedPassword = hashedPassword;
        this.tgId = tgId;
    }
}