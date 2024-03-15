import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, SET_ACCESS_CODE, SET_VERIF_ACCESS_CODE, LOCK_APP, MODE_REQUEST, POURCENTAGE_REQUEST } from '../actions/authActions';

const initialState = {
    loading: false,
    isLoggedIn: false,
    user: null,
    error: null,
    token: null,
    isCodeAcces: false,
    accessCode: null,
    isLock: false,
    mode: null,
    pourcentage: null
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
                token: action.payload.access_token,
                isCodeAcces: false,

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
                token: null,
                isCodeAcces: false,
                accessCode: null,
                // isLock: false
            }
        case SET_ACCESS_CODE:
            return {
                ...state,
                accessCode: action.payload,
            };
        case SET_VERIF_ACCESS_CODE:
            return {
                ...state,
                isCodeAcces: true
            };
        case LOCK_APP:
            return {
                ...state,
                isLock: true
            };
        case MODE_REQUEST:
            return {
                ...state,
                mode: action.payload,

            };
        case POURCENTAGE_REQUEST:
            return {
                ...state,
                pourcentage: action.payload,
            };
        default:
            return state;
    }
};

export default authReducers;
