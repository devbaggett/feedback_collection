import React from "react";
// IMPORT HELPER OBJECTS: BROSWERROUTER AND ROUTE
// BroswerRouter is the brains, and tells router how to behave
// Route is react component sets rules and components that will be visible on screen
import { BrowserRouter, Route } from "react-router-dom";

// dummy components
const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

// CREATE APP COMPONENT
const App = () => {
	// RETURN JSX
	return <div>Hi there</div>;
};

// EXPORT COMPONENT
export default App;
