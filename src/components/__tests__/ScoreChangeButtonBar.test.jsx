import {mountWithStore} from "../../tests/lib/mountWithStore";
import {ScoreChangeButtonBar} from "../ScoreChangeButtonBar";
import {Button} from "reactstrap";
import {DRAW, LOSS, WIN} from "../../state/constants/score";
import {sprintf} from "sprintf-js";
import {getPlayerScore, getTotalGames} from "../../state/readers/score";

const setup = () => {
    return mountWithStore(ScoreChangeButtonBar);
};

describe("components.ScoreChangeButtonBar", () => {
    test("buttons are displayed to change score", () => {
        const { compWrapper } = setup();

        const comp = compWrapper().find(Button);
        expect(comp).toHaveLength(4);

        ["Add WIN", "Add DRAW", "Add LOSS", "Clear"].forEach((item, idx) => {
            expect(comp.at(idx).text()).toEqual(item);
        })
    });

    [
        {idx: 0, result: WIN, score: 1},
        {idx: 1, result: DRAW, score: 0.5},
        {idx: 2, result: LOSS, score: 0},
    ].forEach(item => {
        const testName = sprintf("clicking on %s adds a result", item.result);

        test(testName, () => {
            const { store, compWrapper } = setup();

            const button = compWrapper().find(Button).at(item.idx);
            expect(button.text()).toEqual(sprintf("Add %s", item.result));

            button.props().onClick();

            const state = store.getState();
            expect(getPlayerScore(state)).toEqual(item.score);
            expect(getTotalGames(state)).toEqual(1);
        });
    });

    test("clicking on clear resets state", () => {
        const { store, compWrapper } = setup();

        const button = compWrapper().find(Button).at(3);
        expect(button.text()).toEqual("Clear");

        button.props().onClick();

        const state = store.getState();
        expect(getPlayerScore(state)).toEqual(0);
        expect(getTotalGames(state)).toEqual(0);
    });
});
