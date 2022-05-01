export class MovieDetailsPageData {
    constructor(movie, isWatchTogetherRequested, genres, movieCasts) {
        this.movie = movie;
        this.isWatchTogetherRequested = isWatchTogetherRequested;
        this.genres = genres;
        this.movieCasts = movieCasts;
    }
}