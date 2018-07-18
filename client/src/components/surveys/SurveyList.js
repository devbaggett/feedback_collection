// class-based component
import React, { Component } from "react";
// helper for wiring to redux
import { connect } from "react-redux";
// action creator FETCH_SURVEYS
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
	// render component using fetchSurveys action creator
	componentDidMount() {
		this.props.fetchSurveys();
	}

	// helper method
	renderSurveys() {
		// iterate over list of surveys
		return this.props.surveys.reverse().map(survey => {
			// return card
			return (
				<div className="card darken-1" key={survey._id}>
					<div className="card-content">
						<span className="card-title">{survey.title}</span>
						<p>{survey.body}</p>
						<p className="right">
							Sent On:{" "}
							{new Date(survey.dateSent).toLocaleDateString()}
						</p>
					</div>
					<div className="card-action">
						<a>Yes: {survey.yes}</a>
						<a>No: {survey.no}</a>
					</div>
				</div>
			);
		});
	}

	render() {
		return <div>{this.renderSurveys()}</div>;
	}
}

function mapStateToProps({ surveys }) {
	return { surveys };
}

export default connect(
	mapStateToProps,
	{ fetchSurveys }
)(SurveyList);
