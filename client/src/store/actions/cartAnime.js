import axios from "axios";
import {tokenConfig} from "./auth";
import {CLEAR_CART_ANIME, GET_CART_ANIME} from "./types";

const API_URL = 'http://127.0.0.1:8000/api/v1/cart-anime/';

export const getCartAnime = (animeId) => (dispatch, getState) => {
    axios
        .get(API_URL + animeId, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_CART_ANIME,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: CLEAR_CART_ANIME
            })
        })
};

export const deleteCartAnime = (animeId) => (dispatch, getState) => {
    axios
        .delete(API_URL + animeId, tokenConfig(getState))
        .then(
            dispatch({
                type: CLEAR_CART_ANIME
            })
        )
        .catch(err => {
            console.log(err)
        })
};

export const addCartAnime = (animeId) => (dispatch, getState) => {
    const body = JSON.stringify({
        anime: animeId
    });
    axios
        .post(API_URL, body, tokenConfig(getState))
        .then(res => {
            dispatch(getCartAnime(animeId))
        })
        .catch(err => {
            console.log(err)
        })
};