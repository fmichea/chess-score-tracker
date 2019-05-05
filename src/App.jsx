import React, {PureComponent} from "react";
import {Provider} from "react-redux";

import {MainLayout} from "./components/MainLayout";
import {createAppStore} from "./state/store";

export class App extends PureComponent {
  render() {
    const store = createAppStore();

    return <Provider store={store}>
      <MainLayout />
    </Provider>
  }
}
