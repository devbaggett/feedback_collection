// SurveyForm shows a form for a user to add input

// CREATE CLASS-BASED COMPONENT
import React, { Component } from "react";
// IMPORT HELPER TO ALLOW REDUX-FORM CONTROL
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";

// ALL CAPS SO KNOW NOT TO CHANGE
const FIELDS = [];

class SurveyForm extends Component {
	renderFields() {
		return (
			<div>
				<Field
					label="Survey Title"
					type="text"
					name="title"
					component={SurveyField}
				/>
				<Field
					label="Subject Line"
					type="text"
					name="subject"
					component={SurveyField}
				/>
				<Field
					label="Email Body"
					type="text"
					name="body"
					component={SurveyField}
				/>
				<Field
					label="Recipient List"
					type="text"
					name="emails"
					component={SurveyField}
				/>
			</div>
		);
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
					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

export default reduxForm({
	// one arg: form
	form: "surveyForm"
})(SurveyForm);
