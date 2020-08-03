import "regenerator-runtime/runtime";
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import promise from "redux-promise-middleware"
import createSagaMiddleware from 'redux-saga'
import {
    watchGetWeather, watchLogin, watchLogout,
    watchSetupClothing,
    watchSetupDashboard,
    watchSetupNews,
    watchSetupSports, watchSignup, watchVerifyToken
} from "./sagas/dashboardSagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(promise, thunk, sagaMiddleware))
sagaMiddleware.run(watchSetupDashboard)
sagaMiddleware.run(watchGetWeather)
sagaMiddleware.run(watchSetupNews)
sagaMiddleware.run(watchSetupSports)
sagaMiddleware.run(watchSetupClothing)
sagaMiddleware.run(watchVerifyToken)
sagaMiddleware.run(watchLogin)
sagaMiddleware.run(watchLogout)
sagaMiddleware.run(watchSignup)
export default store;