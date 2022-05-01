import {connection} from '../db_helper.mjs';
import {MovieCast} from "../../entity/movie_cast.mjs";

export function readAllForMovie(movieId, cb) {
    const sql = `select *
                 from movie_casts
                        join persons p on movie_casts.person_id = p.person_id
                        join genders g on movie_casts.gender_id = g.gender_id
                 where movie_id = ?`;
    connection.query(sql, [movieId], (err, results, fields) => {
        if (err) {
            throw 'Failed to select movie casts!';
        }
        cb(resultsToMovieCasts(results));
    });
}

function resultsToMovieCasts(results) {
    if ((typeof results !== 'undefined') && (results.length > 0)) {
        const movieCasts = [];
        results.forEach((row) => {
            movieCasts.push(rowToMovieCast(row));
        });
        return movieCasts;
    } else {
        return [];
    }
}

function rowToMovieCast(row) {
    return new MovieCast(row.movie_id, row.person_name, row.character_name, row.gender, row.cast_order);
}