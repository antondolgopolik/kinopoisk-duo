import {GET_MOVIE_BY_ID, GET_MOVIE_LIST, REQUEST_CREATED} from "../actions/types.js"

const initialState = {
    movie: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MOVIE_LIST:
            return {
                ...state,
                movie: action.payload
            };
        case GET_MOVIE_BY_ID:
            return {
                ...state,
                movie: action.payload,
            };
        case REQUEST_CREATED:
            return {
                ...state,
                movie: action.payload,
            };
        default:
            return state;
    }
}