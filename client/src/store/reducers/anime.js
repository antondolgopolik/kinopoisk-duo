import {GET_ANIME_BY_SLUG, GET_ANIME_LIST} from "../actions/types.js"

const initialState = {
    anime: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ANIME_LIST:
            return {
                ...state,
                anime: action.payload
            };
        case GET_ANIME_BY_SLUG:
            return {
                ...state,
                anime: action.payload
            };
        default:
            return state;
    }
}