export class WatchTogetherRequest {
    constructor(movieId, userId, isActive) {
        this.movieId = movieId;
        this.userId = userId;
        this.isActive = isActive;
    }
}