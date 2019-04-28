import React, {PureComponent} from "react";
import {getScoreHistoryItemByIDX} from "../state/readers/score";
import {deepConnect} from "../lib/redux/deepConnect";
import * as PropTypes from "prop-types";
import moment from "moment";
import {removeResult} from "../state/actions/score";

class ScoreHistoryItemInner extends PureComponent {
    static propTypes = {
        idx: PropTypes.number.isRequired,
        item: PropTypes.object.isRequired,
    };

    removeItem = () => {
        return () => this.props.dispatch(removeResult(this.props.item.id));
    };

    render() {
        const {item} = this.props;

        const dt = moment.unix(item.ts).format("YYYY-MM-DD HH:mm:ss");

        let cancel = null;
        if (item.cancelable) {
            cancel = <a onClick={this.removeItem()}>[cancel]</a>
        }

        let isCancellation = null;
        if (item.isCancellation) {
            isCancellation = "cancellation, ";
        }

        return <tr>
            <td>{this.props.idx + 1}</td>
            <td>{dt}</td>
            <td>{item.resultType} ({isCancellation}{item.score})</td>
            <td>{cancel}</td>
        </tr>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        item: getScoreHistoryItemByIDX(state, ownProps.idx),
    }
};

export const ScoreHistoryItem = deepConnect(mapStateToProps)(ScoreHistoryItemInner);
