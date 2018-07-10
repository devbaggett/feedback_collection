import React, { Component } from "react";
// IMPORT HELPER OBJECTS: BROSWERROUTER AND ROUTE
// BroswerRouter is the brains, and tells router how to behave
// Route is react component sets rules and components that will be visible on screen
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

// CREATE APP COMPONENT
class App extends Component {
	// add lifecycle method we will use to fetch current user
	componentDidMount() {
		this.props.fetchUser();
	}
	render() {
		// RETURN JSX
		return (
			<div className="container">
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/" component={Landing} />
						<Route exact path="/surveys" component={Dashboard} />
						<Route path="/surveys/new" component={SurveyNew} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

// EXPORT COMPONENT
export default connect(
	null,
	actions
)(App);
