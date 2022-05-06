import axios from 'axios';
import {GET_MOVIE_BY_ID, GET_MOVIE_LIST} from './types';
import {tokenConfig} from "./auth";

const API_URL = 'http://localhost:9000/api/';
//GET_MOVIE_LIST
export const getMovieList = (query, page) => dispatch => {
    let url = API_URL + 'movies?'
    if (query) {
        url += ('q=' + query + '&')
    }
    if (page) {
        url += ('page=' + page)
    }
    axios
        .get(url)
        .then(res => {
            dispatch({
                type: GET_MOVIE_LIST,
                payload: res.data
            });
        })
        .catch(err => console.log(err))
};

//GET_MOVIE_BY_ID
export const getMovieById = movie_id => (dispatch, getState) => {
    axios
        .get(API_URL + 'movies/' + movie_id, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_MOVIE_BY_ID,
                payload: res.data.movie
            });
        })

        .catch(err => console.log(err))
};