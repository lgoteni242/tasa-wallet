import axios from 'axios';
// Action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const MODE_REQUEST = 'MODE_REQUEST';
export const POURCENTAGE_REQUEST = 'POURCENTAGE_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const SET_ACCESS_CODE = 'SET_ACCESS_CODE';
export const SET_VERIF_ACCESS_CODE = 'SET_VERIF_ACCESS_CODE';
export const LOCK_APP = 'LOCK_APP';

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

export const modePayment = (mode) => ({
    type: MODE_REQUEST,
    payload: mode,
});

export const modePourcentage = (pourcentage) => ({
    type: POURCENTAGE_REQUEST,
    payload: pourcentage,
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

export const setAccessCode = (code) => {
    return {
        type: SET_ACCESS_CODE,
        payload: code,
    };
};

export const setVerifAccesCode = () => {
    return {
        type: SET_VERIF_ACCESS_CODE,
    };
};

export const lockApp = () => {
    return {
        type: LOCK_APP,
    };
};

// Async action to handle login
export const login = (username, password, codePays) => {
    return async (dispatch) => {
        dispatch(loginRequest());
        try {
            // Make API call to authenticate user
            const response = await axios.post('https://walet.tasa.pro/api/auth', { country_code: codePays, phone: username, pin: password });
            // Dispatch login success action with user data

            dispatch(loginSuccess(response.data));
            // console.error(response.data.pourcentage, 'levi')
            dispatch(modePayment(response.data.payment_mode));
            dispatch(modePourcentage(response.data.pourcentage));
            return response
        } catch (error) {
            // Dispatch login failure action with error message
            dispatch(loginFailure(error.message));

        }
    };
};
