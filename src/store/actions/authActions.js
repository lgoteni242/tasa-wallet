import axios from 'axios';
// Action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

// Action creator
export const logout = () => ({
    type: LOGOUT,
});

// Action creators
export const loginRequest = () => ({
    type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

// Async action to handle login
export const login = (username, password, codePays) => {
    return async (dispatch) => {
        dispatch(loginRequest());
        try {
            // Make API call to authenticate user
            const response = await axios.post('https://walet.tasa.pro/api/auth', { country_code: codePays, phone: username, pin: password });
            // Dispatch login success action with user data
            dispatch(loginSuccess(response.data));
        } catch (error) {
            // Dispatch login failure action with error message
            dispatch(loginFailure(error.message));
        }
    };
};