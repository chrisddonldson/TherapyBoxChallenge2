import {
    SET_IS_GETTING_NEWS,
    SET_IS_GETTING_WEATHER,
    SET_IS_GETTING_SPORTS,
    SET_NEWS,
    SET_NEWS_MODAL,
    SET_WEATHER,
    TEST_REDUCER,
    SET_SPORTS,
    SET_CLOTHES,
    SET_IS_GETTING_CLOTHING,
    SET_IS_TEAM_INSPECTOR_OPEN,
    SET_TOKEN,
    SET_IS_SIGN_IN_LOADING,
    SET_LOGIN_SCREEN,
    SET_IS_LOGGING_IN,
    SET_IS_SIGNING_UP,
    SET_SIGN_IN_ERROR,
    SET_SIGN_UP_ERROR,
    SET_ALLOW_DASHBOARD,
    SET_USERNAME,
    SET_SIGN_UP_SUCCESS, SET_SELECTED_TEAM
} from "../actions/placeholderActions";

const initialState = {
    test: false,
    isWeatherLoading: true,
    isNewsLoading: true,
    weather: null,
    news: null,
    isNewsModalOpen: false,
    isSportsLoading: true,
    sports: null,
    clothes: null,
    isClothesLoading: true,
    clothesCounted: null,
    isTeamInspectorOpen: false,
    teamsVictoryInfo: [],
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
    selectedTeam: null,
selectedTeamValue:""
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SELECTED_TEAM:
            let resultingTeam = state.teamsVictoryInfo.find(e=>e.HomeTeam === action.payload)
            console.log(resultingTeam)
            //selected team in as string.
            //find it in teams array

            return {
                ...state,
                selectedTeamValue: action.payload,
                selectedTeam: resultingTeam,
            }
        case SET_CLOTHES:
            let data = action.payload.payload
            let uniqueArray = Array.from(new Set(data.map(s => s.clothe))).map(clothe => {
                return {
                    clothe: clothe
                };
            })
            let result_pairs = []
            for (let i = 0; i < uniqueArray.length; i++) {
                let item_count = 0
                let current_item = uniqueArray[i]
                for (let j = 0; j < data.length; j++) {
                    //compare current item to

                    if (data[j].clothe === current_item.clothe) {
                        item_count++
                    }
                }

                result_pairs.push({name: current_item.clothe, count: item_count})
            }

            return {
                ...state,
                clothes: action.payload,
                clothesCounted: result_pairs
            }
        case SET_IS_GETTING_CLOTHING:
            return {
                ...state,
                isClothesLoading: action.payload,
            }
        case SET_ALLOW_DASHBOARD:
            return {
                ...state,
                allowDashboard: action.payload,
            }
        case SET_IS_TEAM_INSPECTOR_OPEN:
            return {
                ...state,
                isTeamInspectorOpen: action.payload,
            }
        case SET_WEATHER:

            return {
                ...state,
                weather: action.payload,
            }
        case SET_SIGN_UP_SUCCESS:

            return {
                ...state,
                signUpSuccess: action.payload,
            }
        case SET_IS_GETTING_WEATHER:
            return {
                ...state,
                isWeatherLoading: action.payload,
            }
        case SET_IS_GETTING_SPORTS:
            return {
                ...state,
                isSportsLoading: action.payload,
            }
        case SET_IS_GETTING_NEWS:
            return {
                ...state,
                isNewsLoading: action.payload,
            }
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload,
            }
        case SET_NEWS:
            return {
                ...state,
                news: action.payload,
            }
        case SET_NEWS_MODAL:
            return {
                ...state,
                isNewsModalOpen: action.payload,
            }

        case SET_TOKEN:
            return {
                ...state,
                token: action.payload,
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
        case SET_SPORTS:

            let games = action.payload
            let teams = Array.from(new Set(games.map(s => s.HomeTeam))).map(HomeTeam => {
                return {
                    HomeTeam
                };
            })


            for (let i = 0; i < teams.length; i++) {
                let currentTeam = teams[i]
                currentTeam.hasBeat = []
                for (let j = 0; j < games.length; j++) {

                    if (currentTeam.HomeTeam === games[j].AwayTeam) {
                        if (games[j].FTR === "A") {

                            currentTeam.hasBeat.push(games[j].HomeTeam)
                        }
                    }
                    if (currentTeam.HomeTeam === games[j].HomeTeam) {
                        if (games[j].FTR === "H") {

                            currentTeam.hasBeat.push(games[j].AwayTeam)
                        }
                    }
                }
            }
            let selectedTeam =  teams[0]

            return {
                ...state,
                sports: action.payload,
                teamsVictoryInfo: teams,
                selectedTeamValue: selectedTeam.HomeTeam,
                selectedTeam: selectedTeam
            }
        default:
            return {...state};
    }
}

