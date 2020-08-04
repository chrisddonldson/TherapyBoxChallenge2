import {put, takeEvery} from "@redux-saga/core/effects";
import {
    LOGIN,
    LOGOUT,
    SET_IS_SIGNING_UP,
    SET_LOGIN_SCREEN,
    SET_SIGN_IN_ERROR,
    SET_USER_ID,
    SIGNUP,
    VERIFY_TOKEN
} from "../actions/appActions";
import axios from "axios";
import {getFromStorage, setInStorage} from "../util/storage";


export function* watchLogin() {
    yield takeEvery(LOGIN, doLogin)
}


export function* watchLogout() {
    yield takeEvery(LOGOUT, doLogout)
}

export function* watchSignup() {
    yield takeEvery(SIGNUP, doSignup)
}


export function* watchVerifyToken() {
    yield takeEvery(VERIFY_TOKEN, doVerifyToken)
}


function* doLogin(action) {

    yield put({type: "SET_IS_LOGGING_IN", payload: true})
    let response = yield axios.post('/api/signin', action.payload)
        .then(r => r.data, (error) => {
            console.log(error)
        })
    if (response.success) {
        yield put({type: "SET_SIGN_IN_ERROR", payload: ""})

        yield put({type: "SET_TOKEN", payload: response.token})
        yield put({type: "SET_USERNAME", payload: response.username})
        yield put({type: "SET_USER_ID", payload: response.userId})

        setInStorage('therapy_box', response.token)
        yield put({type: "SET_ALLOW_DASHBOARD", payload: true})
        yield put({type: "SET_SIGN_UP_SUCCESS", payload: false})
    } else {
        //error and why
        yield put({type: "SET_SIGN_IN_ERROR", payload: response.message})
    }
    yield put({type: "SET_IS_LOGGING_IN", payload: false})

}

function* doSignup(action) {

    yield put({type: "SET_IS_SIGNING_UP", payload: true})
    let response = yield axios.post('/api/signup', action.payload)
        .then(r => r.data, (error) => {
            console.log(error)
        })

    if (response.success) {
        yield put({type: "SET_SIGN_UP_SUCCESS", payload: true})
        yield put({type: "SET_LOGIN_SCREEN", payload: "SIGNIN"})
    } else {
        console.log("ERROR" + response.message)
        yield put({type: "SET_SIGN_UP_ERROR", payload: response.message})
    }


    yield put({type: "SET_IS_SIGNING_UP", payload: false})


}

function* doLogout(action) {
    const token = getFromStorage('therapy_box')

    let response = yield axios.get('/api/logout?token=' + token)
        .then(r => r.data, (error) => {
            console.log(error)
        })

    yield put({type: "SET_ALLOW_DASHBOARD", payload: false})
    yield put({type: "SET_TOKEN", payload: ""})
    setInStorage('therapy_box', "")
}

function* doVerifyToken(action) {

    yield put({type: "SET_IS_SIGN_IN_LOADING", payload: true})
    const token = getFromStorage('therapy_box')
    if (token != "") {

        let response = yield axios.get('/api/verify?token=' + token)
            .then(r => r.data, (error) => {
                console.log(error)
            })

        if (response.success) {
            yield put({type: "SET_TOKEN", payload: token})
            yield put({type: "SET_USERNAME", payload: response.user.username})
            yield put({type: "SET_USER_ID", payload: response.userId})
            yield put({type: "SET_ALLOW_DASHBOARD", payload: true})
        }
    }
    yield put({type: "SET_IS_SIGN_IN_LOADING", payload: false})
}


