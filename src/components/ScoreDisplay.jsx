import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {getPlayerScore, getTotalGames} from "../state/readers/score";
import * as PropTypes from "prop-types";
import {ColorPicker} from "./ColorPicker";
import {getColorByColorID} from "../state/readers/colors";
import {
    SCORE_BACKGROUND_COLOR_ID,
    SCORE_PLAYER_COLOR_ID,
    SCORE_SLASH_COLOR_ID,
    SCORE_TEXT_COLOR_ID, SCORE_TOTAL_COLOR_ID
} from "../state/constants/colors";

class ScoreDisplayInner extends PureComponent {
    static propTypes = {
        playerScore: PropTypes.number.isRequired,
        totalGames: PropTypes.number.isRequired,

        scoreBackgroundColor: PropTypes.string.isRequired,
        scoreTextColor: PropTypes.string.isRequired,
        scorePlayerColor: PropTypes.string.isRequired,
        scoreSlashColor: PropTypes.string.isRequired,
        scoreTotalColor: PropTypes.string.isRequired,
    };

    render() {
        const {playerScore, totalGames} = this.props;

        const styles = {
            overall: {backgroundColor: this.props.scoreBackgroundColor},
            scoreText: {color: this.props.scoreTextColor},
            scorePlayer: {color: this.props.scorePlayerColor},
            scoreSlash: {color: this.props.scoreSlashColor},
            scoreTotal: {color: this.props.scoreTotalColor},
        };

        return <div id="score" style={styles.overall}>
            <strong style={styles.scoreText}>Score:</strong>
            <span style={styles.scorePlayer}>{playerScore}</span>
            <span  style={styles.scoreSlash}>/</span>
            <span style={styles.scoreTotal}>{totalGames}</span>
        </div>
    }
}

export const mapStateToProps = (state) => {
    return {
        playerScore: getPlayerScore(state),
        totalGames: getTotalGames(state),

        scoreBackgroundColor: getColorByColorID(state, SCORE_BACKGROUND_COLOR_ID),
        scoreTextColor: getColorByColorID(state, SCORE_TEXT_COLOR_ID),
        scorePlayerColor: getColorByColorID(state, SCORE_PLAYER_COLOR_ID),
        scoreSlashColor: getColorByColorID(state, SCORE_SLASH_COLOR_ID),
        scoreTotalColor: getColorByColorID(state, SCORE_TOTAL_COLOR_ID),
    }
};

export const ScoreDisplay = connect(mapStateToProps)(ScoreDisplayInner);
