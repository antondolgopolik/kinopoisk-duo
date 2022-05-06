import axios from "axios";
import {GET_USERS} from "./types";


const API_URL = 'http://localhost:9000/api/'
export const getUserList = (page) => dispatch => {
    let url = API_URL + 'users'
    if (page) {
        url += ("?page=" + page)
    }
    axios
        .get(url)
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data
            });
        })
        .catch(err => console.log(err))
};