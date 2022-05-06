import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import {useEffect} from "react";
import {getProfile} from "../../store/actions/profile";
import {Box, Button, Grid, List, ListItem, ListItemText, Typography} from "@mui/material";
import {deleteRequest} from "../../store/actions/request";

const map = {
    1: "Активный",
    0: "На паузе"
}


export default function Profile() {
    const {username} = useParams()

    const profile = useSelector(state => state.profile.profile)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfile(username))
    }, [dispatch, username]);

    const handle = movieId => event => {
        event.preventDefault();
        dispatch(deleteRequest(movieId, profile.userData.username))
    }
    const getButton = (movieId) => {
        if (user && user.username === profile.userData.username) {
            return (
                <ListItemText>
                    <Button onClick={handle(movieId)}>
                        Удалить
                    </Button>
                </ListItemText>
            )

        } else {
            return <></>
        }
    }
    const getList = () => {
        return (
            profile.watchTogetherRequestsData.map(movie => (
                    <ListItem disablePadding key={movie.movieId}>
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
                        {getButton(movie.movieId)}
                    </ListItem>
                )
            )
        )
    }
    return (
        profile !== null ?
            <Box sx={{width: '100%', maxWidth: 700, bgcolor: 'background.paper'}}>

                <Grid item xs={12}>
                    <Typography variant="h4">{profile.userData.username}</Typography>
                    <Typography variant="h4">TG id: {profile.userData.tgId}</Typography>
                </Grid>

                <List>
                    {profile ? getList() : <Typography>Loading</Typography>}
                </List>
            </Box> : <Typography>Loading</Typography>
    )
}