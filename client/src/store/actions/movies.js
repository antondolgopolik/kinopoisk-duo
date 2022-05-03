import axios from 'axios';
import {GET_MOVIE_BY_ID, GET_MOVIE_LIST} from './types';

const API_URL = 'http://localhost:9000/api/';
//GET_MOVIE_LIST
export const getMovieList = () => dispatch => {
    axios
        .get(API_URL + 'movies')
        .then(res => {
            dispatch({
                type: GET_MOVIE_LIST,
                payload: res.data
            });
        })
        .catch(err => console.log(err))
};

//GET_MOVIE_BY_ID
export const getMovieById = (movie_id) => dispatch => {
    axios
        .get(API_URL + 'movies/'+ movie_id)
        .then(res => {
            dispatch({
                type: GET_MOVIE_BY_ID,
                payload: res.data.movie
            });
        })

        .catch(err => console.log(err))
};