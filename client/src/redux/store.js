import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './rootReducer';

// Utilisez combineReducers pour combiner vos reducers
const finalReducer = combineReducers({
    rootReducer
});

// Initialisez votre état initial sans envelopper rootReducer dans un objet
const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
};

const middleware = [thunk];

const store = createStore(
    finalReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
