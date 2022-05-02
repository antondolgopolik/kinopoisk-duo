import {connection} from '../db_helper.mjs';
import {Genre} from "../../entity/genre.mjs";

export async function readAllForMovie(movieId) {
    const sql = `SELECT genres.*
                 FROM movie_genres
                        JOIN genres ON movie_genres.genre_id = genres.genre_id
                 WHERE movie_id = ?`;
    const [rows, fields] = await connection.query(sql, [movieId]);
    return rowsToGenres(rows);
}

function rowsToGenres(rows) {
    const genres = [];
    rows.forEach((row) => {
        genres.push(rowToGenre(row));
    });
    return genres;
}

function rowToGenre(row) {
    return new Genre(row.genre_id, row.genre_name);
}