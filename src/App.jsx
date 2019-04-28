import React, {PureComponent} from "react";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {reducers} from "./state/reducers";

import {MainLayout} from "./components/MainLayout";

export class App extends PureComponent {
  render() {
    const store = createStore(reducers);

    return <Provider store={store}>
      <MainLayout />
    </Provider>
  }
}
