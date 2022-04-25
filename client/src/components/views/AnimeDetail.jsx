import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAnimeBySlug} from "../../store/actions/anime";
import {Button, Grid, Typography} from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
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
import {addCartAnime, deleteCartAnime, getCartAnime} from "../../store/actions/cartAnime";

function getButtons(dispatch, cartAnime, animeId, open, setOpen) {

    const handleAddCartAnime = (animeId) => (event) => {
        event.preventDefault();
        dispatch(addCartAnime(animeId))
    };

    const handleDeleteCartAnime = (animeId) => (event) => {
        event.preventDefault();
        dispatch(deleteCartAnime(animeId))
    };

    const handleClick = () => {
        setOpen(!open);
    };

    if (cartAnime) {
        let types = ['Запланировано', 'Смотрю', 'Просмотрено', 'Пересматриваю', 'Брошено', 'Отложено']
        const index = types.indexOf(cartAnime.view_status);
        types.splice(index, 1)
        return (
            <List
                sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton onClick={handleClick}>
                    <ListItemText primary={cartAnime.view_status}/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {types.map(type => (
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemText primary={type}/>
                            </ListItemButton>
                        ))}
                        <ListItemButton onClick={handleDeleteCartAnime(animeId)} sx={{pl: 4}}>
                            <ListItemText primary='Убрать из списка'/>
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
        )
    } else {
        return (
            <Button variant="contained" onClick={handleAddCartAnime(animeId)}>Добавить</Button>
        )
    }
}

export default function AnimeDetail() {
    const {slug} = useParams()
    const anime = useSelector(state => state.anime.anime)
    const cartAnime = useSelector(state => state.cartAnime.cartAnime)
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);


    useEffect(() => {
        dispatch(getAnimeBySlug(slug))
    }, [dispatch, slug]);

    return (
        !Array.isArray(anime) ?
            <Grid container spacing={2} mt={5}>
                <Grid item xs={12}>
                    <Typography variant="h4">{anime.name_rus} / {anime.name_jap}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <img src={anime.poster} alt={anime.name_rus}/>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h5">Тип: {anime.type}</Typography>
                    <Typography variant="h5">Эпизоды: {anime.number_of_episodes}</Typography>
                    <Typography variant="h5">Статус: {anime.status}</Typography>
                    <Typography variant="h5">
                        Жанры: {anime.genres.map(genre => (
                        <Button>{genre}</Button>
                    ))}
                    </Typography>
                    <Typography variant="h5">Рейтинг: {anime.age_rating}</Typography>
                </Grid>
                <Grid item xs={12}>

                    {getButtons(dispatch, cartAnime, anime.id, open, setOpen)}

                </Grid>
                <Grid item xs={12}>
                    <Typography>Описание:</Typography>
                    <Typography>{anime.description}</Typography>
                </Grid>
            </Grid> : <ClipLoader color="#000000" size={150}/>
    )
}