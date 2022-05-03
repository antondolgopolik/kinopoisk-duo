import {connection} from '../db_helper.mjs';
import {Movie} from "../../entity/movie.mjs";

const pageSize = 10;

export async function readById(movieId) {
    const sql = 'SELECT * FROM movies WHERE movie_id = ?';
    const [rows, fields] = await connection.query(sql, [movieId]);
    if (rows.length > 0) {
        return rowToMovie(rows[0]);
    } else {
        return null;
    }
}

export async function readWithPage(page) {
    const offset = pageSize * page;
    const sql = 'SELECT * FROM movies LIMIT ? OFFSET ?';
    const [rows, fields] = await connection.query(sql, [pageSize, offset]);
    return rowsToMovies(rows);
}

export async function searchByTitleWithPage(q, page) {
    const offset = pageSize * page;
    const sql = 'SELECT * FROM movies WHERE MATCH(title) AGAINST(? IN NATURAL LANGUAGE MODE) LIMIT ? OFFSET ?';
    const [rows, fields] = await connection.query(sql, [q, pageSize, offset]);
    return rowsToMovies(rows);
}

export async function count() {
    const sql = "SELECT COUNT(*) FROM movies";
    const [rows, fields] = await connection.query(sql, []);
    return rows[0]['COUNT(*)'];
}

export async function countWithTitle(title) {
    const sql = "SELECT COUNT(*) FROM movies WHERE MATCH(title) AGAINST(? IN NATURAL LANGUAGE MODE)";
    const [rows, fields] = await connection.query(sql, [title]);
    return rows[0]['COUNT(*)'];
}

function rowsToMovies(results) {
    const movies = [];
    results.forEach((row) => {
        movies.push(rowToMovie(row));
    });
    return movies;
}

function rowToMovie(row) {
    return new Movie(
        row.movie_id, row.title, row.budget,
        row.overview, row.runtime, row.movie_status,
        row.tagline, row.vote_average, row.vote_count
    );
}