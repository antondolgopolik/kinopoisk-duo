import {CLEAR_CART_ANIME, GET_CART_ANIME} from "../actions/types.js"

const initialState = {
    cartAnime: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CART_ANIME:
            return {
                ...state,
                cartAnime: action.payload
            };
        case CLEAR_CART_ANIME:
            return {
                ...state,
                cartAnime: null
            };
        default:
            return state;
    }
}