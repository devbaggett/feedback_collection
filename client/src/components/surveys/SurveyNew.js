// SurveyNew shows SurveyForm and SurveyFormReview

// CREATE CLASS-BASED COMPONENT
import React, { Component } from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
	state = { showFormReview: false };

	// helper method
	renderContent() {
		// if showFromReview === true
		if (this.state.showFormReview) {
			return (
				<SurveyFormReview
					onCancel={() => this.setState({ showFormReview: false })}
				/>
			);
		}
		// otherwise, show SurveyForm component
		// callback function to update state on submit
		return (
			<SurveyForm
				onSurveySubmit={() => this.setState({ showFormReview: true })}
			/>
		);
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}

export default SurveyNew;
