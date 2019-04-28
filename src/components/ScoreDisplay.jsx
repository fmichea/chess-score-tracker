import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {getPlayerScore, getTotalGames} from "../state/readers/score";
import * as PropTypes from "prop-types";

class ScoreDisplayInner extends PureComponent {
    static propTypes = {
        playerScore: PropTypes.number.isRequired,
        totalGames: PropTypes.number.isRequired,
    };

    render() {
        const {playerScore, totalGames} = this.props;

        return <div id="score">
            <strong>Score:</strong> {playerScore} / {totalGames}
        </div>
    }
}

export const mapStateToProps = (state) => {
    return {
        playerScore: getPlayerScore(state),
        totalGames: getTotalGames(state),
    }
};

export const ScoreDisplay = connect(mapStateToProps)(ScoreDisplayInner);
