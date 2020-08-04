import {
    SET_IS_GETTING_NEWS,
    SET_NEWS,
    SET_NEWS_MODAL,

    SET_IS_GETTING_WEATHER,
    SET_WEATHER,

    SET_IS_GETTING_SPORTS,
    SET_SPORTS,
    SET_IS_TEAM_INSPECTOR_OPEN,
    SET_SELECTED_TEAM,

    SET_CLOTHES,
    SET_IS_GETTING_CLOTHING,

    SET_IS_IMAGE_MODAL_OPEN,
    SET_IS_GETTING_IMAGES,
    SET_IS_POSTING_IMAGE,
    SET_IMAGES,

    SET_IS_GETTING_TODOS,
    SET_TODOS,
    SET_SELECTED_TODO,
    SET_TO_DO_DIALOG,
    SET_DASHBOARD_SCREEN,
    SET_TO_DO_DIALOG_MODE,
    SET_IS_TITLE_SUBMITTING,
    SET_IS_NOTES_SUBMITTING, SET_IS_COMPLETED_SUBMITTING, SET_IS_TO_DO_CHANGE_SUBMITTING
} from "../actions/appActions";
import React from "react";

const initialState = {
    weather: null,
    isWeatherLoading: true,

    isNewsLoading: true,
    news: null,
    isNewsModalOpen: false,

    isSportsLoading: true,
    sports: null,
    selectedTeam: null,
    selectedTeamValue: "",

    clothes: null,
    isClothesLoading: true,
    clothesCounted: null,

    isTeamInspectorOpen: false,
    teamsVictoryInfo: [],
    token: "",

    isImageModalOpen: false,
    isGettingImages: true,
    isPostingImage: false,
    images: [],

    isGettingToDos: true,
    toDos: [],
    selectedToDo: null,
    isToDoDialogOpen: false,
    toDoDialogMode: "CREATE",
    dashboardScreen: "DASHBOARD",

    toDoChangeSubmitting: false,

}

export default function (state = initialState, action) {
    switch (action.type) {
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
        case SET_SELECTED_TEAM:
            let resultingTeam = state.teamsVictoryInfo.find(e => e.HomeTeam === action.payload)
            return {
                ...state,
                selectedTeamValue: action.payload,
                selectedTeam: resultingTeam,
            }
        case SET_IS_TEAM_INSPECTOR_OPEN:
            return {
                ...state,
                isTeamInspectorOpen: action.payload,
            }
        case SET_TO_DO_DIALOG_MODE:
            return {
                ...state,
                toDoDialogMode: action.payload,
            }
        case SET_IS_GETTING_SPORTS:
            return {
                ...state,
                isSportsLoading: action.payload,
            }
        case SET_IS_GETTING_CLOTHING:
            return {
                ...state,
                isClothesLoading: action.payload,
            }
        case SET_IMAGES:
            return {
                ...state,
                images: action.payload,
            }
        case SET_IS_GETTING_IMAGES:
            return {
                ...state,
                isGettingImages: action.payload,
            }
        case SET_IS_POSTING_IMAGE:
            return {
                ...state,
                isPostingImage: action.payload,
            }
        case SET_IS_IMAGE_MODAL_OPEN:
            return {
                ...state,
                isImageModalOpen: action.payload,
            }
        case SET_DASHBOARD_SCREEN:

            return {
                ...state,
                dashboardScreen: action.payload,
                selectedToDo: null
            }

        case SET_IS_TO_DO_CHANGE_SUBMITTING:
            return {
                ...state,
                toDoChangeSubmitting: action.payload,
            }

        case SET_TODOS:
            return {
                ...state,
                toDos: action.payload,
            }
        case SET_TO_DO_DIALOG:
            return {
                ...state,
                isToDoDialogOpen: action.payload,
            }
        case SET_SELECTED_TODO:
            let result = action.payload
            if (action.payload == state.selectedToDo) {
                result = null
            }
            return {
                ...state,
                selectedToDo: result,
            }
        case SET_WEATHER:
            return {
                ...state,
                weather: action.payload,
            }
        case SET_IS_GETTING_WEATHER:
            return {
                ...state,
                isWeatherLoading: action.payload,
            }
        case SET_IS_GETTING_TODOS:
            return {
                ...state,
                isGettingToDos: action.payload,
            }
        case SET_IS_GETTING_NEWS:
            console.log("is getting news")
            console.log(action.payload)
            return {
                ...state,
                isNewsLoading: action.payload,
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
            let selectedTeam = teams[0]

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

