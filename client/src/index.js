import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
// IMPORT STATEMENT FOR ALL THE DIFFERENT REDUCERS
import reducers from "./reducers";

// USE CREATESTORE HELPER TO CREATE NEW REDUX STORE INSTANCE
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// CREATE PROVIDOR TAG AND PLACE APP COMPONENT INSIDE IT
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector("#root")
);
