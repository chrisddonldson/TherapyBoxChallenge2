import {

    SET_TOKEN,
    SET_IS_SIGN_IN_LOADING,
    SET_LOGIN_SCREEN,
    SET_IS_LOGGING_IN,
    SET_IS_SIGNING_UP,
    SET_SIGN_IN_ERROR,
    SET_SIGN_UP_ERROR,
    SET_ALLOW_DASHBOARD,
    SET_USERNAME,
    SET_SIGN_UP_SUCCESS,
    SET_USER_ID,

} from "../actions/appActions";

const initialState = {

    token: "",
    isSignInLoading: true,
    loginScreen: "SIGNIN",
    isSigningUp: false,
    isLoggingIn: false,
    signInError: "",
    signUpError: "",
    allowDashboard: false,
    username: "",
    signUpSuccess: false,
    userId: "",

}

export default function (state = initialState, action) {
    switch (action.type) {

        case SET_USER_ID:
            return {
                ...state,
                userId: action.payload,
            }
        case SET_SIGN_UP_SUCCESS:

            return {
                ...state,
                signUpSuccess: action.payload,
            }
        case SET_ALLOW_DASHBOARD:
            return {
                ...state,
                allowDashboard: action.payload,
            }
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload,
            }
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            }
        case SET_IS_SIGNING_UP:
            return {
                ...state,
                isSigningUp: action.payload,
            }
        case SET_IS_LOGGING_IN:
            return {
                ...state,
                isLoggingIn: action.payload,
            }
        case SET_IS_SIGN_IN_LOADING:
            return {
                ...state,
                isSignInLoading: action.payload,
            }
        case SET_LOGIN_SCREEN:
            return {
                ...state,
                loginScreen: action.payload,
            }
        case SET_SIGN_IN_ERROR:
            return {
                ...state,
                signInError: action.payload,
            }
        case SET_SIGN_UP_ERROR:
            return {
                ...state,
                signUpError: action.payload,
            }


        default:
            return {...state};
    }
}

