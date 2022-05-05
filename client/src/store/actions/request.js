import axios from "axios";
import {tokenConfig} from "./auth";
import {getProfile} from "./profile";

const API_URL = 'http://localhost:9000/api/'

export const createRequest = movie_id => (dispatch, getState) => {
    axios.post(API_URL + 'watch-together-requests/' + movie_id + '/create', null, tokenConfig(getState))

};
export const deleteRequest = (movie_id, username) => (dispatch, getState) => {
    axios
        .delete(API_URL + 'watch-together-requests/' + movie_id + '/delete', tokenConfig(getState))
        .then(res => {
            console.log(res)
            dispatch(getProfile(username))

            })


};