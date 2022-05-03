import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import * as React from "react";
import {getProfile} from "../../store/actions/profile";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import {Grid, Typography} from "@mui/material";


function animeList(watchTogetherRequests) {
    return (
        watchTogetherRequests.map(request => (
            <ListItem disablePadding>
                <ListItemText>
                    <Typography component={Link} to={'../anime/' + request.anime.slug}>
                        {request.anime.name_rus}
                    </Typography>
                </ListItemText>
                <ListItemText>
                    <Typography>
                        {request.view_status}
                    </Typography>
                </ListItemText>
                <ListItemText>
                    <Typography>
                        {request.number_of_episodes_watched} / {request.anime.number_of_episodes}
                    </Typography>
                </ListItemText>
                <ListItemText>
                    <Typography>
                        {request.rating ? request.rating : 0} / 10
                    </Typography>
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
{/*
                <List>
                    {profile ? animeList(profile.watchTogetherRequests) : <Typography>Loading</Typography>}
                </List>*/}
            </Box> : <Typography>Loading</Typography>
    )
}