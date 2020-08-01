/*
 src/reducers/rootReducer.js
*/
import {combineReducers} from 'redux';

import placeholderReducer from "./placeholderReducer";

export default combineReducers({
    placeholderR: placeholderReducer,
});