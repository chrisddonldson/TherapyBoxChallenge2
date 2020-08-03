import {put, takeEvery} from "@redux-saga/core/effects";
import {
    GET_WEATHER,
    LOGIN,
    LOGOUT,
    SET_IS_SIGNING_UP,
    SET_LOGIN_SCREEN,
    SET_SIGN_IN_ERROR,
    SETUP_CLOTHING,
    SETUP_DASHBOARD,
    SETUP_NEWS,
    SETUP_SPORTS,
    SIGNUP,
    VERIFY_TOKEN
} from "../actions/placeholderActions";
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

export function* watchGetWeather() {
    yield takeEvery(GET_WEATHER, doGetWeather)
}

export function* watchSetupDashboard() {
    yield takeEvery(SETUP_DASHBOARD, doSetUpDashboard)
}

export function* watchSetupNews() {
    yield takeEvery(SETUP_NEWS, doSetUpNews)
}

export function* watchSetupSports() {
    yield takeEvery(SETUP_SPORTS, doSetUpSports)
}

export function* watchSetupClothing() {
    yield takeEvery(SETUP_CLOTHING, doSetUpClothing)
}

export function* watchVerifyToken() {
    yield takeEvery(VERIFY_TOKEN, doVerifyToken)
}

function* doSetUpDashboard(action) {

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
    console.log(action.payload)
    yield put({type: "SET_IS_SIGNING_UP", payload: true})
    let response = yield axios.post('/api/signup', action.payload)
        .then(r => r.data, (error) => {
            console.log(error)
        })
     console.log(response)
    if (response.success) {
        yield put({type: "SET_SIGN_UP_SUCCESS", payload: true})
        yield put({type: "SET_LOGIN_SCREEN", payload: "SIGNIN"})
    }
    else {
        console.log("ERROR" + response.message)
        yield put({type: "SET_SIGN_UP_ERROR", payload: response.message})
    }


    yield put({type: "SET_IS_SIGNING_UP", payload: false})


}

function* doLogout(action) {
    console.log("Logout")
    const token = getFromStorage('therapy_box')

     let response = yield axios.get('/api/logout?token=' + token)
            .then(r => r.data, (error) => {
                console.log(error)
            })
    console.log(response)
    yield put({type: "SET_ALLOW_DASHBOARD", payload: false})
    yield put({type: "SET_TOKEN", payload: ""})
    setInStorage('therapy_box', "")
}

function* doVerifyToken(action) {
    console.log("Verifying token")
    yield put({type: "SET_IS_SIGN_IN_LOADING", payload: true})
    const token = getFromStorage('therapy_box')
    if(token!="") {
        console.log("token not null")
        let response = yield axios.get('/api/verify?token=' + token)
            .then(r => r.data, (error) => {
                console.log(error)
            })
        console.log(response)
        if(response.success){
            yield put({type: "SET_TOKEN", payload: token})
            yield put({type: "SET_USERNAME", payload: response.user.username})
            yield put({type: "SET_ALLOW_DASHBOARD", payload: true})
        }
    }
    yield put({type: "SET_IS_SIGN_IN_LOADING", payload: false})
}

function* doSetUpClothing(action) {
    yield put({type: "SET_IS_GETTING_CLOTHING", payload: true})
    let clothes = yield axios.get('/api/clothes')
        .then(r => r.data, (error) => {
            console.log(error)
        })
    yield put({type: "SET_CLOTHES", payload: clothes})
    yield put({type: "SET_IS_GETTING_CLOTHING", payload: false})
}

function* doGetWeather(action) {
    yield put({type: "SET_IS_GETTING_WEATHER", payload: true})
    let lat = action.payload.coords.latitude
    let lon = action.payload.coords.longitude
    let key = "d0a10211ea3d36b0a6423a104782130e"
    let url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + key
    let weather = yield fetch(url)
        .then(res => res.json(), (error) => {
            console.log(error)
        })
    yield put({type: "SET_WEATHER", payload: weather})
    yield put({type: "SET_IS_GETTING_WEATHER", payload: false})
}

function* doSetUpNews(action) {
    yield put({type: "SET_IS_GETTING_NEWS", payload: true})
    let news = yield axios.get('/api/news')
        .then(r => r.data, (error) => {
            console.log(error)
        })
    console.log(news)
    yield put({type: "SET_NEWS", payload: news})
    yield put({type: "SET_IS_GETTING_NEWS", payload: false})
}

function* doSetUpSports(action) {
    yield put({type: "SET_IS_GETTING_SPORTS", payload: true})
    let news = yield axios.get('/api/sports')
        .then(r => r.data, (error) => {
            console.log(error)
        })
    yield put({type: "SET_SPORTS", payload: news})
    yield put({type: "SET_IS_GETTING_SPORTS", payload: false})
}

