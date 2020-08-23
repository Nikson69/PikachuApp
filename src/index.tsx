import ReactDOM from "react-dom";
import React from "react";
import { HashRouter } from "react-router-dom";
import { configure } from 'mobx';
import { Provider } from "mobx-react";
import App from "./components/App";
import { testStore } from "./stores/index"
import './index.css';

const stores = {
    testStore
};
configure({ enforceActions: "observed" })

ReactDOM.render(
  <Provider {...stores}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);