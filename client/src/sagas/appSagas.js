import {put, takeEvery} from "@redux-saga/core/effects";

import axios from "axios";
import {
    DELETE_TO_DO,
    GET_TO_DOS,
    GET_WEATHER, NEW_TO_DO,
    POST_IMAGE,
    SET_IS_TITLE_SUBMITTING,
    SET_UP_IMAGES,
    SETUP_CLOTHING,
    SETUP_NEWS,
    SETUP_SPORTS,
    SUBMIT_COMPLETED,
    SUBMIT_NOTES,
    SUBMIT_TITLE
} from "../actions/appActions";


export function* watchSetUpImages() {
    yield takeEvery(SET_UP_IMAGES, doSetUpImages)
}

export function* watchGetWeather() {
    yield takeEvery(GET_WEATHER, doGetWeather)
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

export function* watchPostImage() {
    yield takeEvery(POST_IMAGE, doPostImage)
}

export function* watchGetToDos() {
    yield takeEvery(GET_TO_DOS, doGetToDos)
}

export function* watchSubmitTitle() {
    yield takeEvery(SUBMIT_TITLE, doSubmitTitle)
}

export function* watchSubmitNotes() {
    yield takeEvery(SUBMIT_NOTES, doSubmitNotes)
}

export function* watchSubmitCompleted() {
    yield takeEvery(SUBMIT_COMPLETED, doSubmitComplete)
}

export function* watchDeleteToDo() {
    yield takeEvery(DELETE_TO_DO, doDeleteToDo)
}

export function* watchNewToDo() {
    yield takeEvery(NEW_TO_DO, doNewToDo)
}

function* doDeleteToDo(action) {
    yield put({type: "SET_IS_TO_DO_CHANGE_SUBMITTING", payload: true})
    console.log("saga deleting")
    let update = yield axios.post('/api/todo/delete', action.payload)
    console.log(update)
    yield put({type: "SET_IS_TO_DO_CHANGE_SUBMITTING", payload: false})
    yield put({type: "SET_TO_DO_DIALOG", payload: false})
    yield put({type: "GET_TO_DOS", payload: action.payload.userId})
}

function* doNewToDo(action) {
    yield put({type: "SET_IS_TO_DO_CHANGE_SUBMITTING", payload: true})
    console.log("saga submitting title")
    let update = yield axios.post('/api/todo/new', action.payload)
    console.log(update)
    yield put({type: "SET_IS_TO_DO_CHANGE_SUBMITTING", payload: false})
    yield put({type: "SET_TO_DO_DIALOG", payload: false})
    yield put({type: "GET_TO_DOS", payload: action.payload.userId})
}

function* doSubmitTitle(action) {
    yield put({type: "SET_IS_TO_DO_CHANGE_SUBMITTING", payload: true})
    console.log("saga submitting title")
    let update = yield axios.post('/api/todo/updatetitle', action.payload)
    console.log(update)
    yield put({type: "SET_IS_TO_DO_CHANGE_SUBMITTING", payload: false})
}

function* doSubmitNotes(action) {
    yield put({type: "SET_IS_TO_DO_CHANGE_SUBMITTING", payload: true})
    console.log("saga submitting notes")
    console.log(action.payload)
    let update = yield axios.post('/api/todo/updatenotes', action.payload)
    console.log(update)
    yield put({type: "SET_IS_TO_DO_CHANGE_SUBMITTING", payload: false})
}

function* doSubmitComplete(action) {
    yield put({type: "SET_IS_TO_DO_CHANGE_SUBMITTING", payload: true})
    console.log("saga submitting title ")
    let update = yield axios.post('/api/todo/updatecompleted', action.payload)
    console.log(update)
    console.log(action.payload)
    yield put({type: "SET_IS_TO_DO_CHANGE_SUBMITTING", payload: false})
}

function* doGetToDos(action) {
    yield put({type: "SET_IS_GETTING_TODOS", payload: true})
    let body = {userId: action.payload}
    let todos = yield axios.post('/api/todo', body)
    console.log(todos.data)
    yield put({type: "SET_TODOS", payload: todos.data})
    yield put({type: "SET_IS_GETTING_TODOS", payload: false})

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

