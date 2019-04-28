import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Button, ButtonGroup} from "reactstrap";
import {addResult, clearResults} from "../state/actions/score";
import {DRAW, LOSS, WIN} from "../state/constants/score";

class ScoreChangeButtonBarInner extends PureComponent {
    addResultFunc = (resultType) => {
        return () => this.props.dispatch(addResult(resultType));
    };

    clearResults = () => {
        return () => this.props.dispatch(clearResults())
    };

    render() {
        return <div>
            <ButtonGroup>
                <Button color="success" onClick={this.addResultFunc(WIN)}>Add WIN</Button>
                <Button color="warning" onClick={this.addResultFunc(DRAW)}>Add DRAW</Button>
                <Button color="danger" onClick={this.addResultFunc(LOSS)}>Add LOSS</Button>
            </ButtonGroup>

            <span id="clear_spacer"></span>

            <Button color="primary" onClick={this.clearResults()}>Clear</Button>
        </div>

    }
}

export const ScoreChangeButtonBar = connect()(ScoreChangeButtonBarInner);
