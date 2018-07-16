// SurveyFormReview shows users their form inputs for review
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";

const SurveyFormReview = ({ onCancel, formValues }) => {
	const reviewFields = _.map(formFields, ({ name, label }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});

	return (
		<div>
			<h5>Please confirm your entries</h5>
			{reviewFields}
			<button className="yellow darken-3 btn-flat" onClick={onCancel}>
				Back
			</button>
		</div>
	);
};

// taking redux state, and transforming to props to send to component
// is called with entire state object out of redux store
function mapStateToProps(state) {
	// return values that will be added as props to component
	return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps)(SurveyFormReview);
