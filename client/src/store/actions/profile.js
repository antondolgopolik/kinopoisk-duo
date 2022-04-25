import axios from "axios";
import {GET_PROFILE} from "./types";


const API_URL = 'http://127.0.0.1:8000/api/v1/profile/'
export const getProfile = (username) => dispatch => {
    axios
        .get(API_URL + username)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
        })
        .catch(err => console.log(err))
};