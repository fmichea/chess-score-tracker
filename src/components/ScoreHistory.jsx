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
            items.push(<ScoreHistoryItem key={idx} idx={idx} />);
        }

        if (items.length === 0) {
            items.push(<tr key="default">
                <td>No history item currently available.</td>
            </tr>);
        }

        return <div id="score_history">
            <h3>History</h3>

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
