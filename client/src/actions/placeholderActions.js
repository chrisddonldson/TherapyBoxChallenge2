export const TEST_REDUCER = "TEST_REDUCER"
export const SETUP_DASHBOARD = "SETUP_DASHBOARD"
export const GET_WEATHER = "GET_WEATHER"
export const SET_IS_GETTING_WEATHER = "SET_IS_GETTING_WEATHER"
export const SET_WEATHER = "SET_WEATHER"
export const SETUP_NEWS = "SETUP_NEWS"
export const SET_IS_GETTING_NEWS = "SET_IS_GETTING_NEWS"
export const SET_NEWS = "SET_NEWS"
export const SET_NEWS_MODAL = "SET_NEWS_MODAL"
export const SET_SPORTS = "SET_SPORTS"
export const SET_IS_GETTING_SPORTS = "SET_IS_GETTING_SPORTS"
export const SETUP_SPORTS = "SETUP_SPORTS"
export const SET_CLOTHES = "SET_CLOTHES"
export const SET_IS_GETTING_CLOTHING = "SET_IS_GETTING_CLOTHING"
export const SETUP_CLOTHING = "SETUP_CLOTHING"
export const SET_IS_TEAM_INSPECTOR_OPEN = "SET_IS_TEAM_INSPECTOR_OPEN"
export const SETUP_SIGN_IN = "SETUP_SIGN_IN"
export const SET_IS_SIGN_IN_LOADING = "SET_IS_SIGN_IN_LOADING"
export const SET_TOKEN = "SET_TOKEN"
export const SET_LOGIN_SCREEN = "SET_LOGIN_SCREEN"
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const SIGNUP = "SIGNUP"
export const SET_IS_LOGGING_IN = "SET_IS_LOGGING_IN"
export const SET_IS_SIGNING_UP = "SET_IS_SIGNING_UP"
export const SET_SIGN_IN_ERROR = "SET_SIGN_IN_ERROR"
export const SET_SIGN_UP_ERROR = "SET_SIGN_UP_ERROR"
export const SET_ALLOW_DASHBOARD = "SET_ALLOW_DASHBOARD"
export const VERIFY_TOKEN = "VERIFY_TOKEN"
export const SET_USERNAME = "SET_USERNAME"
export const SET_SIGN_UP_SUCCESS = "SET_SIGN_UP_SUCCESS"
export const SET_SELECTED_TEAM = "SET_SELECTED_TEAM"
export const GET_TO_DOS = "GET_TO_DOS"
export const SET_IS_IMAGE_MODAL_OPEN = "SET_IS_IMAGE_MODAL_OPEN"
export const SET_UP_IMAGES = "SET_UP_IMAGES"
export const POST_IMAGE = "POST_IMAGE"
export const SET_IS_GETTING_IMAGES = "SET_IS_GETTING_IMAGES"
export const SET_USER_ID = "SET_USER_ID"
export const SET_IS_POSTING_IMAGE = "SET_IS_POSTING_IMAGE"
export const SET_IMAGES = "SET_IMAGES"
export const SET_IS_GETTING_TODOS = "SET_IS_GETTING_TODOS"
export const SET_TODOS = "SET_IMAGES"


export const setupImages = (data) => dispatch => {
    dispatch({
        type: SET_UP_IMAGES,
        payload:data
    })
}

export const postImage = (data) => dispatch => {
    dispatch({
        type: POST_IMAGE,
        payload:data
    })
}

export const setImageModalOpen = (data) => dispatch => {
    dispatch({
        type: SET_IS_IMAGE_MODAL_OPEN,
        payload:data
    })
}

export const setSelectedTeam = (data) => dispatch => {
    dispatch({
        type: SET_SELECTED_TEAM,
        payload:data
    })
}
export const getToDos = (data) => dispatch => {
    dispatch({
        type: GET_TO_DOS,
        payload:data
    })
}

export const setAllowDashboard = (data) => dispatch => {
    dispatch({
        type: SET_ALLOW_DASHBOARD,
        payload:data
    })
}
export const setSignupSuccess = (data) => dispatch => {
    dispatch({
        type: SET_SIGN_UP_SUCCESS,
        payload:data
    })
}

export const setSignInError = (data) => dispatch => {
    dispatch({
        type: SET_SIGN_IN_ERROR,
        payload:data
    })
}


export const setSignUpError = (data) => dispatch => {
    dispatch({
        type: SET_SIGN_UP_ERROR,
        payload:data
    })
}

export const verifyToken = () => dispatch => {
    dispatch({
        type: VERIFY_TOKEN
    })
}

export const login = (data) => dispatch => {
    dispatch({
        type: LOGIN,
        payload:data
    })
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT,
    })
}

export const signup = (data) => dispatch => {
    dispatch({
        type: SIGNUP,
        payload:data
    })
}

export const setLoginScreen = (payload) => dispatch => {
    dispatch({
        type: SET_LOGIN_SCREEN,
        payload:payload
    })
}
export const setupSports = (payload) => dispatch => {
    dispatch({
        type: SETUP_SPORTS,
        payload: payload
    })
}
export const testReducer = (payload) => dispatch => {
    dispatch({
        type: TEST_REDUCER,
        payload: payload
    })
}

export const setNewsModal = (payload) => dispatch => {
    dispatch({
        type: SET_NEWS_MODAL,
        payload: payload
    })
}

export const setupDashboard = () => dispatch => {
    dispatch({
        type: SETUP_DASHBOARD,
    })
}
export const setupNews = () => dispatch => {
    dispatch({
        type: SETUP_NEWS,
    })
}
export const getWeather = (position) => dispatch => {
    dispatch({
        type: GET_WEATHER,
        payload: position
    })
}

export const setupClothing = (position) => dispatch => {
    dispatch({
        type: SETUP_CLOTHING,

    })
}
export const setIsTeamInspectorOpen = (data) => dispatch => {
    dispatch({
        type: SET_IS_TEAM_INSPECTOR_OPEN,
        payload: data

    })
}
