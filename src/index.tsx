import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { configure } from 'mobx';
import { Provider } from "mobx-react";
import App from "./components/App";
import { testStore, menuStore, listsStore, pokemonStore } from "./stores/index"
import './index.css';

const stores = {
    testStore,
    menuStore,
    listsStore,
    pokemonStore
};
configure({ enforceActions: "observed" })

ReactDOM.render(
  <Provider {...stores}>
    <BrowserRouter>
      <App />
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);