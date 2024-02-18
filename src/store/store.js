import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducers from './reducers/authReducers';
import createLogger from "redux-logger";
import { thunk } from "redux-thunk";


const rootReducer = combineReducers({
    auth: authReducers,
});

const store = createStore(
    rootReducer,
    applyMiddleware(createLogger, thunk)
);

export default store;
