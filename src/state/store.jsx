import {createStore} from "redux";
import {reducers} from "./reducers";

export const createAppStore = () => {
    return createStore(reducers);
};
