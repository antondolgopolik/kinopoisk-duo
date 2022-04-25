import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAnimeList} from "../../store/actions/anime";
import {Link} from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export default function AnimeList() {
    const animeList = useSelector(state => state.anime.anime)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAnimeList())
    }, [dispatch, isAuthenticated])

    return (
        Array.isArray(animeList) ?
            <Grid container spacing={4} mt={5}>
                {animeList.map(anime => (
                    <Grid item key={anime.id} xs={12} sm={6} md={4}>
                        <Card sx={{maxWidth: 345}}>
                            <CardMedia
                                component="img"
                                height="300"
                                image={anime.poster}
                                alt={anime.name_rus}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {anime.name_rus}
                                </Typography>
                                <Typography iant="body2" color="text.secondary">
                                    {anime.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button component={Link} to={'anime/' + anime.slug} variant="contained"
                                        size="small">Подробнее</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid> : <ClipLoader color="#000000" size={150}/>
    )
}