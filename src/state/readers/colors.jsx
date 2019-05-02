import {pick} from "../../lib/pick";

export const getColorByColorID = (state, colorID) => {
    return pick(state.colors[colorID], {})
}
