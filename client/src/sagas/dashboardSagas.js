import {put, takeEvery} from "@redux-saga/core/effects";
import {GET_WEATHER, SETUP_CLOTHING, SETUP_DASHBOARD, SETUP_NEWS, SETUP_SPORTS} from "../actions/placeholderActions";
import axios from "axios";

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

function* doSetUpDashboard(action) {

}

function* doSetUpClothing(action) {

      yield put({type: "SET_IS_GETTING_CLOTHING", payload: true})
        let clothes = yield axios.get('/api/clothes').then(r => r.data)
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
        .then(res => res.json())
    yield put({type: "SET_WEATHER", payload: weather})
    yield put({type: "SET_IS_GETTING_WEATHER", payload: false})
}

function* doSetUpNews(action) {
    yield put({type: "SET_IS_GETTING_NEWS", payload: true})
    let news = yield axios.get('/api/news').then(r => r.data)
    yield put({type: "SET_NEWS", payload: news})
    yield put({type: "SET_IS_GETTING_NEWS", payload: false})
}
function* doSetUpSports(action) {
    yield put({type: "SET_IS_GETTING_SPORTS", payload: true})
    let news = yield axios.get('/api/sports').then(r => r.data)
    yield put({type: "SET_SPORTS", payload: news})
    yield put({type: "SET_IS_GETTING_SPORTS", payload: false})
}

