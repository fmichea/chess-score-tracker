import {CHANGE_COLOR} from "../constants/colors";

export const changeColor = (colorID, color) => {
    return {
        type: CHANGE_COLOR,
        colorID,
        color,
    }
};
