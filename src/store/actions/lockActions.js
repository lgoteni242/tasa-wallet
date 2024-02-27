
export const SET_ACCESS_CODE = 'SET_ACCESS_CODE';
export const SET_VERIF_ACCESS_CODE = 'SET_VERIF_ACCESS_CODE';

export const setAccessCode = (code) => {
    return {
        type: 'SET_ACCESS_CODE',
        payload: code,
    };
};

export const setVerifAccesCode = () => {
    return {
        type: 'SET_VERIF_ACCESS_CODE',
    };
};