import {
    CHANGE_COLOR,
    SCORE_BACKGROUND_COLOR_ID,
    SCORE_PLAYER_COLOR_ID,
    SCORE_SLASH_COLOR_ID,
    SCORE_TEXT_COLOR_ID, SCORE_TOTAL_COLOR_ID
} from "../constants/colors";
import update from "immutability-helper";

const defaultState = {
    [SCORE_BACKGROUND_COLOR_ID]: '#e9ecef',
    [SCORE_TEXT_COLOR_ID]: '#202428',
    [SCORE_PLAYER_COLOR_ID]: '#202428',
    [SCORE_SLASH_COLOR_ID]: '#202428',
    [SCORE_TOTAL_COLOR_ID]: '#202428',
};

export const colorReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_COLOR:
            return update(state, {$merge: {
                [action.colorID]: action.color,
            }});

        default:
            return state;
    }
};
