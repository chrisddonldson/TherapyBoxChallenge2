import "regenerator-runtime/runtime";
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import promise from "redux-promise-middleware"
import createSagaMiddleware from 'redux-saga'
import {
    watchGetWeather,
    watchSetupClothing,
    watchSetupDashboard,
    watchSetupNews,
    watchSetupSports
} from "./sagas/dashboardSagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(promise, thunk, sagaMiddleware))
sagaMiddleware.run(watchSetupDashboard)
sagaMiddleware.run(watchGetWeather)
sagaMiddleware.run(watchSetupNews)
sagaMiddleware.run(watchSetupSports)
sagaMiddleware.run(watchSetupClothing)
export default store;