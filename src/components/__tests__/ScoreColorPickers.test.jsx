import {mountWithStore} from "../../tests/lib/mountWithStore";
import {ScoreColorPickers} from "../ScoreColorPickers";
import {
    SCORE_BACKGROUND_COLOR_ID,
    SCORE_PLAYER_COLOR_ID,
    SCORE_SLASH_COLOR_ID,
    SCORE_TEXT_COLOR_ID, SCORE_TOTAL_COLOR_ID
} from "../../state/constants/colors";

const setup = () => {
    return mountWithStore(ScoreColorPickers);
};

describe("components.ScoreColorPickers", () => {
    test("can select colors for all in the right order", () => {
        const { compWrapper } = setup();

        const pickers = compWrapper().find(".color-pickers").children();
        expect(pickers).toHaveLength(5);

        expect(pickers.map(item => item.props().colorID)).toEqual([
            SCORE_BACKGROUND_COLOR_ID,
            SCORE_TEXT_COLOR_ID,
            SCORE_PLAYER_COLOR_ID,
            SCORE_SLASH_COLOR_ID,
            SCORE_TOTAL_COLOR_ID,
        ]);
    });
});
