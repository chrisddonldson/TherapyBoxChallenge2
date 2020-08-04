import "regenerator-runtime/runtime";
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import promise from "redux-promise-middleware"
import createSagaMiddleware from 'redux-saga'
import {
    watchLogin, watchLogout,
    watchSignup, watchVerifyToken
} from "./sagas/dashboardSagas";
import {
    watchDeleteToDo,
    watchGetToDos,
    watchGetWeather, watchNewToDo, watchPostImage,
    watchSetupClothing,
    watchSetUpImages,
    watchSetupNews,
    watchSetupSports, watchSubmitCompleted, watchSubmitNotes, watchSubmitTitle
} from "./sagas/appSagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(promise, thunk, sagaMiddleware))
sagaMiddleware.run(watchGetWeather)
sagaMiddleware.run(watchSetupNews)
sagaMiddleware.run(watchSetupSports)
sagaMiddleware.run(watchSetupClothing)
sagaMiddleware.run(watchVerifyToken)
sagaMiddleware.run(watchLogin)
sagaMiddleware.run(watchLogout)
sagaMiddleware.run(watchSignup)
sagaMiddleware.run(watchSetUpImages)
sagaMiddleware.run(watchPostImage)
sagaMiddleware.run(watchGetToDos)
sagaMiddleware.run(watchSubmitTitle)
sagaMiddleware.run(watchSubmitNotes)
sagaMiddleware.run(watchSubmitCompleted)
sagaMiddleware.run(watchDeleteToDo)
sagaMiddleware.run(watchNewToDo)

export default store;