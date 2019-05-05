import {mountWithStore} from "../../tests/lib/mountWithStore";
import {ScoreHistory} from "../ScoreHistory";
import {addResult, removeResult} from "../../state/actions/score";
import {DRAW, LOSS, WIN} from "../../state/constants/score";
import {getScoreHistoryItemByIDX} from "../../state/readers/score";
import {sprintf} from "sprintf-js";
import {pick} from "../../lib/pick";

const setup = () => {
    return mountWithStore(ScoreHistory);
};

describe("components.ScoreHistory", () => {
    test("no history items is empty table", () => {
        const { compWrapper } = setup();

        const comp = compWrapper().find("tbody").children();
        expect(comp).toHaveLength(1);
        expect(comp.at(0).text()).toEqual("No history item currently available.")
    });

    test("history items are displayed properly", () => {
        const { store, compWrapper } = setup();

        store.dispatch(addResult(WIN));
        store.dispatch(addResult(DRAW));
        store.dispatch(addResult(LOSS));

        const historyItem = getScoreHistoryItemByIDX(store.getState(), 1);
        store.dispatch(removeResult(historyItem.id));

        const comp = compWrapper().find("tbody").children();
        expect(comp).toHaveLength(4);

        const items = [
            {text: "WIN (1)"},
            {text: "DRAW (0.5)", hasCancel: false},
            {text: "LOSS (0)"},
            {text: "DRAW (cancellation, -0.5)", hasCancel: false},
        ];

        comp.forEach((item, idx) => {
            const tds = item.find("td");
            expect(tds).toHaveLength(4);

            const text = items[idx].text;
            const hasCancel = pick(items[idx].hasCancel, true);

            expect(tds.at(0).text()).toEqual(sprintf("%d", idx+1));
            expect(tds.at(2).text()).toEqual(text);
            expect(tds.at(3).children()).toHaveLength(hasCancel ? 1 : 0);
        });
    });
});
