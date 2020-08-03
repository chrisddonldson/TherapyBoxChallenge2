import {put, takeEvery} from "@redux-saga/core/effects";
import {
    GET_TO_DOS,
    GET_WEATHER,
    LOGIN,
    LOGOUT, POST_IMAGE, SET_IS_IMAGE_MODAL_OPEN,
    SET_IS_SIGNING_UP,
    SET_LOGIN_SCREEN,
    SET_SIGN_IN_ERROR, SET_UP_IMAGES, SET_USER_ID,
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

export function* watchSetUpImages() {
    yield takeEvery(SET_UP_IMAGES, doSetUpImages)
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

export function* watchPostImage() {
    yield takeEvery(POST_IMAGE, doPostImage)
}
export function* watchGetToDos() {
    yield takeEvery(GET_TO_DOS, doGetToDos)
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

function* doGetToDos(action) {
    yield put({type: "SET_IS_GETTING_TODOS", payload: true})
    let todos = yield axios.get('/api/todo')
        .then(r => r.data, (error) => {
            console.log(error)
        })
    console.log(todos)
     yield put({type: "SET_IS_GETTING_TODOS", payload: false})
    yield put({type: "SET_TODOS", payload: todos})

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

function* doPostImage(action) {
    console.log(action.payload)
    yield put({type: "SET_IS_POSTING_IMAGE", payload: true})

    let formData = new FormData();

    formData.append("imagePost", action.payload.file);
    formData.append("userId", action.payload.userId);
    let resp = yield axios.post('/api/file/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(r => r, (error) => {
        console.log(error)
    })
    yield put({type: "SET_IS_POSTING_IMAGE", payload: false})
    yield put({type: "SET_IS_IMAGE_MODAL_OPEN", payload: false})
    yield put({type: "SET_UP_IMAGES", payload: action.payload.userId})
}

function* doSetUpImages(action) {
    yield put({type: "SET_IS_GETTING_IMAGES", payload: true})
    let images = yield axios.get('/api/file?userId=' + action.payload)
        .then(r => r, (error) => {
            console.log(error)
        })
    yield put({type: "SET_IMAGES", payload: images.data.data})
    yield put({type: "SET_IS_GETTING_IMAGES", payload: false})
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

