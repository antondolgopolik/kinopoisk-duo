import axios from "axios";
import {GET_USERS} from "./types";


const API_URL = 'http://localhost:9000/api/'
export const getUserList = () => dispatch => {
    axios
        .get(API_URL + 'users')
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data
            });
        })
        .catch(err => console.log(err))
};