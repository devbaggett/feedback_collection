// SurveyForm shows a form for a user to add input

// CONTAINS MAP FUNCTION TO ITERATE OVER ARRAY
import _ from "lodash";
// CREATE CLASS-BASED COMPONENT
import React, { Component } from "react";
// IMPORT HELPER TO ALLOW REDUX-FORM CONTROL
import { reduxForm, Field } from "redux-form";
// IMPORT REACT-ROUTER TO USE LINK HELPER
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
// import validEmails func
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
	renderFields() {
		// MAP ITERRATES OVER LIST OF FIELDS
		return _.map(formFields, ({ label, name }) => {
			// CREATE NEW REDUX FORM FIELD AND RETURN IT
			return (
				<Field
					key={name}
					component={SurveyField}
					type="text"
					label={label}
					name={name}
				/>
			);
		});
	}
	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit(
						this.props.onSurveySubmit
					)}
				>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					<button
						type="submit"
						className="teal btn-flat right white-text"
					>
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};
	// take string of emails and pass in validateEmails func
	// errors only cares about properties that have values assigned to it
	// if no emails have been entered, provide empty string
	errors.recipients = validateEmails(values.recipients || "");
	// FOR EVERY FIELD IN FIELDS ARR, PASS IN OBJECT
	_.each(formFields, ({ name, noValueError }) => {
		// IF THIS PROP DOESN'T HAVE VALUE ASSIGNED TO IT
		if (!values[name]) {
			// ADD ERROR MESSAGE FOR THAT PROPERTY
			errors[name] = noValueError;
		}
	});

	return errors;
}

// Redux form helper which initializes and configures survey form
export default reduxForm({
	validate,
	form: "surveyForm",
	// defaults to true, with false it won't dump form data
	destroyOnUnmount: false
})(SurveyForm);
