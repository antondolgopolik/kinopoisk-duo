import {connection} from '../db_helper.mjs';
import {Genre} from "../../entity/genre.mjs";

export function readAllForMovie(movieId, cb) {
    const sql = `SELECT genres.*
                 FROM movie_genres
                        JOIN genres ON movie_genres.genre_id = genres.genre_id
                 WHERE movie_id = ?`;
    connection.query(sql, [movieId], (err, results, fields) => {
        if (err) {
            throw 'Failed to select genres!';
        }
        cb(resultsToGenres(results));
    });
}

function resultsToGenres(results) {
    if ((typeof results !== 'undefined') && (results.length > 0)) {
        const genres = [];
        results.forEach((row) => {
            genres.push(rowToGenre(row));
        });
        return genres;
    } else {
        return [];
    }
}

function rowToGenre(row) {
    return new Genre(row.genre_id, row.genre_name);
}