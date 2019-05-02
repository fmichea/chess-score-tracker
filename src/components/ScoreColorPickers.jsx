import React, {PureComponent} from "react";
import {ColorPicker} from "./ColorPicker";
import {
    SCORE_BACKGROUND_COLOR_ID,
    SCORE_PLAYER_COLOR_ID,
    SCORE_SLASH_COLOR_ID,
    SCORE_TEXT_COLOR_ID, SCORE_TOTAL_COLOR_ID
} from "../state/constants/colors";

export class ScoreColorPickers extends PureComponent {
    render() {
        return <div className="color-pickers">
            <ColorPicker colorID={SCORE_BACKGROUND_COLOR_ID} />
            <ColorPicker colorID={SCORE_TEXT_COLOR_ID} />
            <ColorPicker colorID={SCORE_PLAYER_COLOR_ID} />
            <ColorPicker colorID={SCORE_SLASH_COLOR_ID} />
            <ColorPicker colorID={SCORE_TOTAL_COLOR_ID} />
        </div>
    }
}
