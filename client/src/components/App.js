import React from "react";
// IMPORT HELPER OBJECTS: BROSWERROUTER AND ROUTE
// BroswerRouter is the brains, and tells router how to behave
// Route is react component sets rules and components that will be visible on screen
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
// dummy components
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

// CREATE APP COMPONENT
const App = () => {
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
};

// EXPORT COMPONENT
export default App;
