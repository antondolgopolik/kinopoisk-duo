import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import {useEffect} from "react";
import {getProfile} from "../../store/actions/profile";
import {Box, Button, Grid, List, ListItem, ListItemText, Typography} from "@mui/material";
import {deleteRequest} from "../../store/actions/request";

const map = {
    1: "Активный",
    2: "На паузе"
}

function getWatchTogether(movies, username, dispatch) {
    const handler = (movieId) => event => {
        event.preventDefault();
        dispatch(deleteRequest(movieId, username))

    }
    return (
        movies.map(movie => (
            <ListItem disablePadding>
                <ListItemText>
                    <Typography component={Link} to={'../movies/' + movie.movieId}>
                        {movie.movieTitle}
                    </Typography>
                </ListItemText>
                <ListItemText>
                    <Typography>
                        {map[movie.isActive]}
                    </Typography>
                </ListItemText>
                <ListItemText>
                    <Button onClick={handler(movie.movieId)}>
                        Удалить
                    </Button>
                </ListItemText>
            </ListItem>
        ))
    )
}

export default function Profile() {
    const {username} = useParams()

    const profile = useSelector(state => state.profile.profile)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfile(username))
    }, [dispatch, username]);

    return (
        profile !== null ?
            <Box sx={{width: '100%', maxWidth: 700, bgcolor: 'background.paper'}}>

                <Grid item xs={12}>
                    <Typography variant="h4">{profile.userData.username}</Typography>
                    <Typography variant="h4">TG id: {profile.userData.tgId}</Typography>
                </Grid>

                <List>
                    {profile ? getWatchTogether(profile.watchTogetherRequestsData, username, dispatch) : <Typography>Loading</Typography>}
                </List>
            </Box> : <Typography>Loading</Typography>
    )
}