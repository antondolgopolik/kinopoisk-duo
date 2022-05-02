import {connection} from '../db_helper.mjs';
import {MovieCast} from "../../entity/movie_cast.mjs";

export async function readAllForMovie(movieId) {
    const sql = `select *
                 from movie_casts
                        join persons p on movie_casts.person_id = p.person_id
                        join genders g on movie_casts.gender_id = g.gender_id
                 where movie_id = ?`;
    const [rows, fields] = await connection.query(sql, [movieId]);
    return rowsToMovieCasts(rows);
}

function rowsToMovieCasts(results) {
    const movieCasts = [];
    results.forEach((row) => {
        movieCasts.push(rowToMovieCast(row));
    });
    return movieCasts;
}

function rowToMovieCast(row) {
    return new MovieCast(row.movie_id, row.person_name, row.character_name, row.gender, row.cast_order);
}