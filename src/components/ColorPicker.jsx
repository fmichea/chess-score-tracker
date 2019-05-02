import React, {PureComponent} from "react";
import * as PropTypes from "prop-types";
import {SketchPicker} from "react-color";
import {connect} from "react-redux";
import {getColorByColorID} from "../state/readers/colors";
import {changeColor} from "../state/actions/colors";

class ColorPickerInner extends PureComponent {
    static propTypes = {
        colorID: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
        }
    }

    handlePickerClick = () => {
        this.setState({visible: !this.state.visible});
    };

    handleClose = () => {
        this.setState({visible: false});
    };

    handleChange = (color) => {
        this.props.dispatch(changeColor(this.props.colorID, color.hex))
    };

    render() {
        const buttonStyle = {backgroundColor: this.props.color};

        let popover = null;
        if (this.state.visible) {
            popover = <div className="color-picker-popover">
                <div className="color-picker-cover" onClick={this.handleClose}/>
                <SketchPicker color={this.props.color} onChange={this.handleChange}/>
            </div>
        }

        return <React.Fragment>
            <div
                className="color-picker-button"
                style={buttonStyle}
                onClick={this.handlePickerClick}
            />

            {popover}
        </React.Fragment>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        color: getColorByColorID(state, ownProps.colorID),
    }
};

export const ColorPicker = connect(mapStateToProps)(ColorPickerInner);
