import {connection} from '../db_helper.mjs';
import {Movie} from "../../entity/movie.mjs";

export function readById(movieId, cb) {
    const sql = 'SELECT * FROM movies WHERE movie_id = ?';
    connection.query(sql, [movieId], function (err, results, fields) {
        if (err) {
            throw 'Failed to select movie!';
        }
        // Проверка наличия
        if ((typeof results !== 'undefined') && (results.length > 0)) {
            const raw = results[0];
            cb(new Movie(
                raw.movie_id, raw.title, raw.budget,
                raw.overview, raw.runtime, raw.movie_status,
                raw.tagline, raw.vote_average, raw.vote_count
            ));
        } else {
            cb(null);
        }
    });
}