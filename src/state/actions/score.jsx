import {ADD_RESULT, CLEAR_RESULTS, REMOVE_RESULT} from "../constants/score";

export const addResult = (resultType) => {
    return {
        type: ADD_RESULT,
        resultType,
    }
};

export const removeResult = (id) => {
    return {
        type: REMOVE_RESULT,
        id,
    }
};

export const clearResults = () => {
    return {
        type: CLEAR_RESULTS,
    }
};
