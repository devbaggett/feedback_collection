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

// ALL CAPS SO KNOW NOT TO CHANGE
const FIELDS = [
	{ label: "Survey Title", name: "title" },
	{ label: "Subject Line", name: "subject" },
	{ label: "Email Body", name: "body" },
	{ label: "Recipient List", name: "emails" }
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
	// validate if there is title
	if (!values.title) {
		errors.title = "You must provide a title";
	}

	return errors;
}

export default reduxForm({
	validate,
	form: "surveyForm"
})(SurveyForm);
