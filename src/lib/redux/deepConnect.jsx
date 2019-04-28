import {connect} from "react-redux";
import _ from "lodash"
import update from "immutability-helper";
import {pick} from "../pick";

export const deepConnect = (mapStateToProps, options = {}) => {
    const mapDispatchToProps = pick(options.mapDispatchToProps, null);
    const mergeProps = pick(options.mergeProps, null);

    options = update(options, {$unset: ['mapDispatchToProps', 'mergeProps']});
    options = update(options, {$merge: {
        areStatePropsEqual: _.isEqual,
    }});

    return connect(mapStateToProps, mapDispatchToProps, mergeProps, options)
};
