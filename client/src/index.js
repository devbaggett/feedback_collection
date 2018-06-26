import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import App from "./components/App";

// USE CREATESTORE HELPER TO CREATE NEW REDUX STORE INSTANCE
// First argument to createStore is diff reducers we have in app
// Below is a dummy reducer so we can get Redux started up
// Second argument is initial state of app
// Third arg is applyMiddleware
const store = createStore(() => [], {}, applyMiddleware());

// CREATE PROVIDOR TAG AND PLACE APP COMPONENT INSIDE IT
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector("#root")
);
