import React, {PureComponent} from "react";
import {getScoreHistoryItemsCount} from "../state/readers/score";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import {Table} from "reactstrap";
import {ScoreHistoryItem} from "./ScoreHistoryItem";

class ScoreHistoryInner extends PureComponent {
    static propTypes = {
        historyItemsCount: PropTypes.number.isRequired,
    };

    render() {
        const items = [];

        for (let idx = 0; idx < this.props.historyItemsCount; idx++) {
            items.push(<ScoreHistoryItem idx={idx} />);
        }

        if (items.length === 0) {
            items.push()
        }

        return <div id="score_history">
            <h3>History</h3>

            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Time</th>
                    <th>Result</th>
                    <th>Cancel</th>
                </tr>
                </thead>
            </Table>

            <div id="score_history_wrapper">
                <Table>
                    <tbody>{items}</tbody>
                </Table>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        historyItemsCount: getScoreHistoryItemsCount(state),
    }
};

export const ScoreHistory = connect(mapStateToProps)(ScoreHistoryInner);
