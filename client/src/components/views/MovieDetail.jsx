import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import {useEffect} from "react";
import {getMovieById} from "../../store/actions/movies";
import {Button, Grid, Typography} from "@mui/material";
import {createRequest, deleteRequest} from "../../store/actions/request";

export default function MovieDetail() {
    const {movieId} = useParams()
    const movie = useSelector(state => state.movie.movie)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    const handlerAdd = event => {
        event.preventDefault();
        dispatch(createRequest(movieId))
    };

    const handlerDelete = event => {
        event.preventDefault();
        dispatch(deleteRequest(movieId, user.username))
    }

    useEffect(() => {
        dispatch(getMovieById(movieId))
    }, [dispatch, movieId]);

    const getButton = () => {
        if (!isAuthenticated) {
            return <></>
        }
        if (!movie.isWatchTogetherRequested) {
            return <Button onClick={handlerAdd} variant="contained" size="small">Добавить</Button>
        }
        return <Button onClick={handlerDelete} color="error" variant="contained" size="small">Удалить</Button>
    }

    return (!Array.isArray(movie.items) ? <Grid container spacing={2} mt={5}>
        <Grid item xs={12}>
            <Typography variant="h4">{movie.title}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="h5">Слоган: {movie.tagline}</Typography>
        </Grid>
        <Grid item xs={8}>
            <Typography variant="h5">Бюджет: {movie.budget} $</Typography>
            <Typography variant="h5">
                Жанры: {movie.genres.map(genre => (<Button key={genre.genreId}>{genre.genreName}</Button>))}
            </Typography>
            <Typography variant="h5">Длительность: {movie.runtime} минут</Typography>
            <Typography variant="h5">Статус: {movie.movieStatus}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography>Описание:</Typography>
            <Typography>{movie.overview}</Typography>
        </Grid>
        <Grid item mt={5}>
            {getButton()}
        </Grid>
    </Grid> : <Typography>Loading</Typography>)
}