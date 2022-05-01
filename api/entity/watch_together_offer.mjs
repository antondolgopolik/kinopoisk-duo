export class WatchTogetherOffer {
    constructor(watchTogetherOfferId, userId, movieId, offeredUserId, isAccepted) {
        this.watchTogetherOfferId = watchTogetherOfferId;
        this.userId = userId;
        this.movieId = movieId;
        this.offeredUserId = offeredUserId;
        this.isAccepted = isAccepted;
    }
}