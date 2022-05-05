import axios from "axios";
import {GET_PROFILE} from "./types";


const API_URL = 'http://localhost:9000/api/'
export const getProfile = username => dispatch => {
    axios
        .get(API_URL + 'profile/' + username)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
        })
        .catch(err => console.log(err))
};