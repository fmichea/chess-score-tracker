import {mountWithStore} from "../../tests/lib/mountWithStore";
import {ScoreDisplay} from "../ScoreDisplay";
import {addResult} from "../../state/actions/score";
import {DRAW, WIN} from "../../state/constants/score";
import {
    SCORE_BACKGROUND_COLOR_ID,
    SCORE_PLAYER_COLOR_ID,
    SCORE_SLASH_COLOR_ID,
    SCORE_TEXT_COLOR_ID, SCORE_TOTAL_COLOR_ID
} from "../../state/constants/colors";
import {changeColor} from "../../state/actions/colors";

const setup = () => {
    return mountWithStore(ScoreDisplay);
};

describe("components.ScoreDisplay", () => {
    test("score is displayed properly", () => {
        const { store, compWrapper } = setup();

        [WIN, DRAW].forEach(item => store.dispatch(addResult(item)));

        const colors = [
            {colorID: SCORE_TEXT_COLOR_ID, color: '#001'},
            {colorID: SCORE_PLAYER_COLOR_ID, color: '#002'},
            {colorID: SCORE_SLASH_COLOR_ID, color: '#003'},
            {colorID: SCORE_TOTAL_COLOR_ID, color: '#004'},
        ];

        store.dispatch(changeColor(SCORE_BACKGROUND_COLOR_ID, '#000'));
        colors.forEach(item => {
            store.dispatch(changeColor(item.colorID, item.color));
        });

        const comp = compWrapper().find("ScoreDisplayInner");
        expect(comp.text()).toEqual("Score:1.5/2");

        const comp2 = comp.find("#score");
        expect(comp2.props().style.backgroundColor).toEqual('#000');

        const children = comp2.children();
        expect(children).toHaveLength(4);

        children.forEach((item, idx) => {
            expect(item.props().style.color).toEqual(colors[idx].color);
        })
    });
});
