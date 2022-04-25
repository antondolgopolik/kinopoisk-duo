export class Movie {
    constructor(movieId, title, budget, overview, runtime, movieStatus, tagline, voteAverage, voteCount) {
        this.movieId = movieId;
        this.title = title;
        this.budget = budget;
        this.overview = overview;
        this.runtime = runtime;
        this.movieStatus = movieStatus;
        this.tagline = tagline;
        this.voteAverage = voteAverage;
        this.voteCount = voteCount;
    }
}