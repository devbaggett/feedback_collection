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

// ALL CAPS SO KNOW NOT TO CHANGE
const FIELDS = [
	{
		label: "Survey Title",
		name: "title",
		noValueError: "You must provide a survey title"
	},
	{
		label: "Subject Line",
		name: "subject",
		noValueError: "You must provide a subject title"
	},
	{
		label: "Email Body",
		name: "body",
		noValueError: "You must provide an email body"
	},
	{
		label: "Recipient List",
		name: "emails",
		noValueError: "You must provide a recipient list"
	}
];

class SurveyForm extends Component {
	renderFields() {
		// MAP ITERRATES OVER LIST OF FIELDS
		return _.map(FIELDS, ({ label, name }) => {
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
					onSubmit={this.props.handleSubmit(values =>
						console.log(values)
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
	errors.emails = validateEmails(values.emails || "");
	// FOR EVERY FIELD IN FIELDS ARR, PASS IN OBJECT
	_.each(FIELDS, ({ name, noValueError }) => {
		// IF THIS PROP DOESN'T HAVE VALUE ASSIGNED TO IT
		if (!values[name]) {
			// ADD ERROR MESSAGE FOR THAT PROPERTY
			errors[name] = noValueError;
		}
	});

	return errors;
}

export default reduxForm({
	validate,
	form: "surveyForm"
})(SurveyForm);
