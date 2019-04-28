import {pick} from "../../lib/pick";

const getScoreState = (state) => {
    return pick(state.score, {});
};

const getScoreStateHistory = (state) => {
    return pick(getScoreState(state).history, [])
}

export const getPlayerScore = (state) => {
    return pick(getScoreState(state).playerScore, 0)
};

export const getTotalGames = (state) => {
    return pick(getScoreState(state).totalGames, 0)
};

export const getScoreHistoryItemsCount = (state) => {
    return pick(getScoreStateHistory(state).length, 0);
};

export const getScoreHistoryItemByIDX = (state, idx) => {
    return pick(getScoreStateHistory(state)[idx], {});
};
