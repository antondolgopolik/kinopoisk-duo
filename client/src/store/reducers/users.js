import {GET_USERS} from "../actions/types.js"

const initialState = {
    users: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            };
        default:
            return state;
    }
}