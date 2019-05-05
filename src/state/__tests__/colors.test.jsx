import {createAppStore} from "../store";
import {getColorByColorID} from "../readers/colors";
import {
    SCORE_BACKGROUND_COLOR_ID,
    SCORE_PLAYER_COLOR_ID,
    SCORE_SLASH_COLOR_ID,
    SCORE_TEXT_COLOR_ID, SCORE_TOTAL_COLOR_ID
} from "../constants/colors";
import {changeColor} from "../actions/colors";

const setup = () => {
    const store = createAppStore();

    return { store };
};

describe("state.colors", () => {
    test("initialized colors in default has color", () => {
        const { store } = setup();

        const state = store.getState();
        expect(getColorByColorID(state, SCORE_BACKGROUND_COLOR_ID)).not.toBeNull();
        expect(getColorByColorID(state, SCORE_TEXT_COLOR_ID)).not.toBeNull();
        expect(getColorByColorID(state, SCORE_PLAYER_COLOR_ID)).not.toBeNull();
        expect(getColorByColorID(state, SCORE_SLASH_COLOR_ID)).not.toBeNull();
        expect(getColorByColorID(state, SCORE_TOTAL_COLOR_ID)).not.toBeNull();
    });

    test("unknown color does not have a color at init", () => {
        const { store } = setup();

        const state = store.getState();
        expect(getColorByColorID(state, "unknown-id")).toBeNull();
    });

    test("color can be changed", () => {
        const { store } = setup();

        const newColor = '#000';

        const color1 = getColorByColorID(store.getState(), SCORE_BACKGROUND_COLOR_ID);
        expect(color1).not.toBeNull();
        expect(color1).not.toEqual(newColor);

        store.dispatch(changeColor(SCORE_BACKGROUND_COLOR_ID, newColor));

        const color2 = getColorByColorID(store.getState(), SCORE_BACKGROUND_COLOR_ID);
        expect(color2).toEqual(newColor);
    });
});
