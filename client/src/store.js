import "regenerator-runtime/runtime";
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import promise from "redux-promise-middleware"
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(promise, thunk, sagaMiddleware))

export default store;