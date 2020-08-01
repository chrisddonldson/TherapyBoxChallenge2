import {TEST_REDUCER} from "../actions/placeholderActions";

const initialState = {
    test: false,

}

export default function (state = initialState, action) {
    switch (action.type) {
        case TEST_REDUCER:
            return {
                test: action.payload,
                ...state,

            }
        default:
            return {...state};
    }
}