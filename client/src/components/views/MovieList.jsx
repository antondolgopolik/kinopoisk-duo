import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getMovieList} from "../../store/actions/movies";
import {Link} from "react-router-dom";

export default function MovieList() {
    const movieList = useSelector(state => state.movie.movie.items)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const dispatch = useDispatch()
    useEffect(() => {
        // dispatch(getMovieList())
    }, [dispatch, isAuthenticated])
    return (
        Array.isArray(movieList) ?
            <Grid container spacing={4} mt={5}>
                {movieList.map(movie => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4}>
                        <Card sx={{maxWidth: 345}}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {movie.title}
                                </Typography>
                                <Typography iant="body2">
                                    Статус: {movie.movieStatus}
                                </Typography>
                                <Typography iant="body2">
                                    Оценка: {movie.voteAverage}
                                </Typography>
                                <Typography iant="body2" color="text.secondary">
                                    {movie.overview.slice(0, 100)}...
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button component={Link} to={'movies/5' } variant="contained"
                                        size="small">Подробнее</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid> : <Typography>Loading</Typography>
    )
}