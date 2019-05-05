import {ADD_RESULT, CLEAR_RESULTS, DRAW, LOSS, REMOVE_RESULT, WIN} from "../constants/score";
import update from "immutability-helper";
import moment from "moment";
import uuid4 from "uuid/v4";
import {showError} from "../../lib/showError";

const defaultState = {
    playerScore: 0,
    totalGames: 0,
    history: [],
};

const convertResultTypeToScore = (resultType) => {
    switch (resultType) {
        case WIN:
            return 1;
        case DRAW:
            return 0.5;
        case LOSS:
            return 0;

        default:
            showError("received unknown result type %s, scoring as loss", resultType);
            return 0;
    }
};

const addResultWithResult = (state, resultType, direction) => {
    const resultTypeScore = direction * convertResultTypeToScore(resultType);

    const historyItem = {
        id: uuid4(),
        ts: moment().unix(),
        resultType: resultType,
        score: resultTypeScore,
        cancelable: direction === 1,
        isCancellation: direction === -1,
    };
    const history = update(state.history, {$push: [historyItem]});

    return update(state, {$merge: {
        id: uuid4(),
        playerScore: state.playerScore + resultTypeScore,
        totalGames: state.totalGames + direction,
        history: history,
    }});
};

export const scoreReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_RESULT:
            return addResultWithResult(state, action.resultType, 1);

        case REMOVE_RESULT:
            const historyItemsWithID = state.history.filter(item => {
                return item.id === action.id
            });

            if (historyItemsWithID.length !== 1) {
                showError("received cancellation for unknown id %s", action.id);
                return state;
            }

            const resultType = historyItemsWithID[0].resultType;

            const newState = addResultWithResult(state, resultType, -1);

            return update(newState, {$merge: {
                history: newState.history.map((item) => {
                    if (item.id !== action.id) {
                        return item
                    }
                    return update(item, {$merge: {
                        cancelable: false,
                    }});
                })
            }});

        case CLEAR_RESULTS:
            return defaultState;

        default:
            return state;
    }
};
