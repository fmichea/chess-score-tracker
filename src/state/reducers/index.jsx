import {scoreReducer} from "./score";
import {combineReducers} from "redux";
import {colorReducer} from "./colors";

export const reducers = combineReducers({
    score: scoreReducer,
    colors: colorReducer,
});
