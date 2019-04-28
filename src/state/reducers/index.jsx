import {scoreReducer} from "./score";
import {combineReducers} from "redux";

export const reducers = combineReducers({
    score: scoreReducer,
});
