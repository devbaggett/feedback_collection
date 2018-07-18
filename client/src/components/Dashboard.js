import React from "react";
import { Link } from "react-router-dom";
import SurveyList from "./surveys/SurveyList";

// declare dashboard component
const Dashboard = () => {
	return (
		<div>
			<SurveyList />
			<div className="fixed-action-btn">
				<Link to="/surveys/new" className="btn-floating btn-large red">
					<i className="material-icons">add</i>
				</Link>
			</div>
		</div>
	);
};

// export dashboard component
export default Dashboard;
