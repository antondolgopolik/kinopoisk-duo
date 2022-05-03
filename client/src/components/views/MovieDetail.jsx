import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getMovieById} from "../../store/actions/movies";
import {Button, Grid, Typography} from "@mui/material";
import * as React from "react";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function MovieDetail() {
    const {movie_id} = useParams()
    const movie = useSelector(state => state.movie.movie)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMovieById(movie_id))
    }, [dispatch, movie_id]);

    return (
        !Array.isArray(movie) ?
            <Grid container spacing={2} mt={5}>
                <Grid item xs={12}>
                    <Typography variant="h4">{movie.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">Слоган: {movie.tagline}</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h5">Бюджет: {movie.budget} $</Typography>
                    <Typography variant="h5">
                        Жанры: {movie.genres.map(genre => (
                        <Button>{genre.genreName}</Button>
                    ))}
                    </Typography>
                    <Typography variant="h5">Длительность: {movie.runtime} минут</Typography>
                    <Typography variant="h5">Статус: {movie.movieStatus}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Описание:</Typography>
                    <Typography>{movie.overview}</Typography>
                </Grid>
            </Grid> : <Typography>Loading</Typography>
    )
}