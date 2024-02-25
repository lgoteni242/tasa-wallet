import { SET_ACCESS_CODE, SET_VERIF_ACCESS_CODE } from "../actions/lockActions";

const initialState = {
    accessCode: null, // Ajoutez cette clé pour stocker le code d'accès
    isCodeAcces: false,
};

const lockReducers = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_ACCESS_CODE':
            return {
                ...state,
                accessCode: action.payload,
            };
        case 'SET_VERIF_ACCESS_CODE':
            return {
                ...state,
                isCodeAcces: true
            };
        default:
            return state;
    }
};

export default lockReducers;
