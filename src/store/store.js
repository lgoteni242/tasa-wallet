import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducers from './reducers/authReducers';
import { createLogger } from 'redux-logger';
import { thunk } from "redux-thunk";

// Définition de la configuration de persistance
const persistConfig = {
    key: 'root', // Clé racine pour la persistance dans AsyncStorage
    storage: AsyncStorage, // Utilisation du AsyncStorage pour le stockage
    whitelist: ['auth'], // Listez les reducers que vous voulez persister
};

// Combinez les reducers
const rootReducer = combineReducers({
    auth: authReducers,
});

// Créez un reducer persistant
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Créez le store Redux avec le reducer persistant et les middlewares
const store = createStore(
    persistedReducer,
    applyMiddleware(createLogger(), thunk)
);

// Créez un persistor persistant pour le store Redux
export const persistor = persistStore(store);

export default store;
