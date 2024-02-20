import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/authActions';

const initialState = {
    loading: false,
    isLoggedIn: false,
    user: null,
    error: null,
    token: null
};

const authReducers = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                user: action.payload.data,
                error: null,
                token: action.payload.access_token
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                isLoggedIn: false,
                user: null,
                error: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                loading: false,
                isLoggedIn: false,
                user: null,
                error: null,
            }
        default:
            return state;
    }
};

export default authReducers;
