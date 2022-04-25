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
import ClipLoader from "react-spinners/ClipLoader";
import {Typography} from "@mui/material";


function animeList(cartAnimeList) {
    return (
        cartAnimeList.map(cartAnime => (
            <ListItem disablePadding>
                <ListItemText>
                    <Typography component={Link} to={'../anime/' + cartAnime.anime.slug}>
                        {cartAnime.anime.name_rus}
                    </Typography>
                </ListItemText>
                <ListItemText>
                    <Typography>
                        {cartAnime.view_status}
                    </Typography>
                </ListItemText>
                <ListItemText>
                    <Typography>
                        {cartAnime.number_of_episodes_watched} / {cartAnime.anime.number_of_episodes}
                    </Typography>
                </ListItemText>
                <ListItemText>
                    <Typography>
                        {cartAnime.rating ? cartAnime.rating : 0} / 10
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
        <Box sx={{width: '100%', maxWidth: 700, bgcolor: 'background.paper'}}>

            <List>
                {profile ? animeList(profile.cart_anime) : <ClipLoader color="#000000" size={150}/>}
            </List>

        </Box>
    )
}