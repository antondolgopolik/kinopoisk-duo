import {combineReducers} from 'redux';
import anime from './anime'
import cartAnime from './cartAnime'
import auth from './auth'
import profile from './profile'

export default combineReducers({
    anime,
    cartAnime,
    auth,
    profile,
})