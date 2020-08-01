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
