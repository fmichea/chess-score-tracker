import update from "immutability-helper";
import {isNotNullOrUndefined} from "../../lib/isNullOrUndefined";
import {Provider} from "react-redux";
import React, {PureComponent} from "react";
import {createAppStore} from "../../state/store";
import {mount} from "enzyme";

const defaultOpts = {
    props: {},
};

export const mountWithStore = (Comp, opts = {}) => {
    opts = update(defaultOpts, {$merge: opts});

    const { props, ...options } = opts;

    const store = createAppStore();

    const _dispatch = store.dispatch;
    let _dispatchDyn = _dispatch;

    store.dispatch = function () {
        _dispatchDyn.apply(this, arguments)
    };

    class WrapperComp extends PureComponent {
        render() {
            return (
                <div>
                    <Provider store={store}>
                        <Comp {...this.props} />
                    </Provider>
                </div>
            )
        }
    }

    const rootCompWrapper = mount(<WrapperComp {...props} />, options);

    _dispatchDyn = function () {
        _dispatch.apply(this, arguments);
        rootCompWrapper.update()
    };

    const compWrapper = function () {
        rootCompWrapper.update();
        return rootCompWrapper.find('Provider').children().at(0)
    };

    return { rootCompWrapper, compWrapper, store, props }
};
