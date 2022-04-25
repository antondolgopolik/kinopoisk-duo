import axios from 'axios';
import {GET_ANIME_BY_SLUG, GET_ANIME_LIST} from './types';
import {getCartAnime} from "./cartAnime";

const API_URL = 'http://127.0.0.1:8000/api/v1/anime/';
//GET_ANIME_LIST
export const getAnimeList = () => dispatch => {
    axios
        .get(API_URL)
        .then(res => {
            dispatch({
                type: GET_ANIME_LIST,
                payload: res.data
            });
        })
        .catch(err => console.log(err))
};

//GET_ANIME_BY_SLUG
export const getAnimeBySlug = (slug) => dispatch => {
    axios
        .get(API_URL + slug)
        .then(res => {
            dispatch({
                type: GET_ANIME_BY_SLUG,
                payload: res.data
            });
            dispatch(getCartAnime(res.data.id))
        })
        .catch(err => console.log(err))
};