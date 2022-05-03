import {combineReducers} from 'redux';
import movie from './movie'
import auth from './auth'
import profile from './profile'
import users from "./users";

export default combineReducers({
    movie,
    auth,
    profile,
    users
})
