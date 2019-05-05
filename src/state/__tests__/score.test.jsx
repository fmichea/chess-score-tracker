import {createAppStore} from "../store";
import {getPlayerScore, getScoreHistoryItemByIDX, getScoreHistoryItemsCount, getTotalGames} from "../readers/score";
import {addResult, clearResults, removeResult} from "../actions/score";
import {DRAW, LOSS, WIN} from "../constants/score";
import {sprintf} from "sprintf-js";

const setup = () => {
    const store = createAppStore();

    return { store };
};

const RESULTS = [
    {result: WIN, score: 1},
    {result: DRAW, score: 0.5},
    {result: LOSS, score: 0},
];

describe("state.score", () => {
    test("initialized store has no score", () => {
        const {store} = setup();

        const state = store.getState();
        expect(getPlayerScore(state)).toEqual(0);
        expect(getTotalGames(state)).toEqual(0);
        expect(getScoreHistoryItemsCount(state)).toEqual(0);
    });

    RESULTS.forEach((item) => {
        const testName = sprintf(
            "adding %s changes total games and player score correctly",
            item.result,
        );

        test(testName, () => {
            const {store} = setup();

            store.dispatch(addResult(item.result));

            const state = store.getState();
            expect(getPlayerScore(state)).toEqual(item.score);
            expect(getTotalGames(state)).toEqual(1);

            expect(getScoreHistoryItemsCount(state)).toEqual(1);

            const historyItem = getScoreHistoryItemByIDX(state, 0);
            expect(historyItem.id).not.toBeUndefined();
            expect(historyItem.ts).not.toBeUndefined();
            expect(historyItem.resultType).toEqual(item.result);
            expect(historyItem.score).toEqual(item.score);
            expect(historyItem.cancelable).toBeTruthy();
            expect(historyItem.isCancellation).toBeFalsy();
        });
    });

    test("adding a few results ends up on the right score", () => {
        const {store} = setup();

        const results = [LOSS, LOSS, WIN, DRAW, DRAW, DRAW, WIN];

        results.forEach(item => store.dispatch(addResult(item)));

        const state = store.getState();
        expect(getPlayerScore(state)).toEqual(3.5);
        expect(getTotalGames(state)).toEqual(7);

        expect(getScoreHistoryItemsCount(state)).toEqual(7);

        results.forEach((item, idx) => {
            expect(getScoreHistoryItemByIDX(state, idx).resultType).toEqual(item);
        })
    });

    test("clearResults puts everything back to init state", () => {
        const {store} = setup();

        [LOSS, WIN, DRAW].forEach(item => store.dispatch(addResult(item)));
        store.dispatch(clearResults());

        const state = store.getState();
        expect(getPlayerScore(state)).toEqual(0);
        expect(getTotalGames(state)).toEqual(0);
        expect(getScoreHistoryItemsCount(state)).toEqual(0);
    });

    RESULTS.forEach((item) => {
        const testName = sprintf("%s result can be cancelled correctly", item.result);

        test(testName, () => {
            const {store} = setup();

            store.dispatch(addResult(item.result));

            const state = store.getState();
            expect(getPlayerScore(state)).toEqual(item.score);
            expect(getTotalGames(state)).toEqual(1);

            expect(getScoreHistoryItemsCount(state)).toEqual(1);

            const resultID = getScoreHistoryItemByIDX(state, 0).id;
            store.dispatch(removeResult(resultID));

            const state2 = store.getState();
            expect(getPlayerScore(state2, 0)).toEqual(0);
            expect(getTotalGames(state2)).toEqual(0);

            expect(getScoreHistoryItemsCount(state2)).toEqual(2);

            const historyItem0 = getScoreHistoryItemByIDX(state2, 0);
            const historyItem1 = getScoreHistoryItemByIDX(state2, 1);

            expect(historyItem0.id).toEqual(resultID);
            expect(historyItem0.cancelable).toBeFalsy();

            expect(historyItem1.resultType).toEqual(item.result);
            expect(historyItem1.cancelable).toBeFalsy();
            expect(historyItem1.isCancellation).toBeTruthy();
        });
    });

    test("removing unknown result is a no-op", () => {
        const {store} = setup();

        store.dispatch(removeResult("unknown-id"));

        const state = store.getState();
        expect(getPlayerScore(state)).toEqual(0);
        expect(getTotalGames(state)).toEqual(0);
    })
});
