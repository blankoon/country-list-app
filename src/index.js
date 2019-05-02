import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./components/App";
import countryListApp from "./reducers/index";

let store = createStore(countryListApp);

let rootElement = document.getElementById("root");
React.render(<Provider store={store}>{() => <App />}</Provider>, rootElement);
