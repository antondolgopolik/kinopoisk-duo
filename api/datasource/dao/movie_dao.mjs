import {connection} from '../db_helper.mjs';
import {Movie} from "../../entity/movie.mjs";

const pageSize = 10;

export function readById(movieId, cb) {
    const sql = 'SELECT * FROM movies WHERE movie_id = ?';
    connection.query(sql, [movieId], (err, results, fields) => {
        if (err) {
            throw 'Failed to select movie!';
        }
        // Проверка наличия
        if ((typeof results !== 'undefined') && (results.length > 0)) {
            const row = results[0];
            cb(rowToMovie(row));
        } else {
            cb(null);
        }
    });
}

export function readWithPage(page, cb) {
    const offset = pageSize * page;
    const sql = 'SELECT * FROM movies LIMIT ? OFFSET ?';
    connection.query(sql, [pageSize, offset], (err, results, fields) => {
        if (err) {
            throw 'Failed to select movies!';
        }
        cb(resultsToMovies(results));
    });
}

export function searchByTitleWithPage(q, page, cb) {
    const offset = pageSize * page;
    const sql = 'SELECT * FROM movies WHERE MATCH(title) AGAINST(? IN NATURAL LANGUAGE MODE) LIMIT ? OFFSET ?';
    connection.query(sql, [q, pageSize, offset], (err, results, fields) => {
        if (err) {
            throw 'Failed to select movies!';
        }
        // Проверка наличия
        cb(resultsToMovies(results));
    });
}

export function count(cb) {
    const sql = "SELECT COUNT(*) FROM movies";
    connection.query(sql, [], (err, results, fields) => {
        if (err) {
            throw 'Failed to count movies!';
        }
        cb(results[0]['COUNT(*)']);
    });
}

export function countWithTitle(title, cb) {
    const sql = "SELECT COUNT(*) FROM movies WHERE MATCH(title) AGAINST(? IN NATURAL LANGUAGE MODE)";
    connection.query(sql, [title], (err, results, fields) => {
        if (err) {
            throw 'Failed to count movies!';
        }
        cb(results[0]['COUNT(*)']);
    });
}

function resultsToMovies(results) {
    if ((typeof results !== 'undefined') && (results.length > 0)) {
        const movies = [];
        results.forEach((row) => {
            movies.push(rowToMovie(row));
        });
        return movies;
    } else {
        return [];
    }
}

function rowToMovie(row) {
    return new Movie(
        row.movie_id, row.title, row.budget,
        row.overview, row.runtime, row.movie_status,
        row.tagline, row.vote_average, row.vote_count
    );
}