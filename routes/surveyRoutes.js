// REQUIRE IN MONGOOSE
const mongoose = require("mongoose");
// REQUIRE IN REQUIRELOGIN FUNCTION FROM MIDDLEWARES DIR
const requireLogin = require("../middlewares/requireLogin");
// REQUIRE IN REQUIRECREDITS FUNCTION FROM MIDDLEWARES
const requireCredits = require("../middlewares/requireCredits");
// REQUIRE IN MAILER HELPER
const Mailer = require("../services/Mailer");
// IMPORT SURVEY TEMPLATE HELPER
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

// GET ACCESS TO MONGOOSE MODEL CLASS: "SURVEYS"
const Survey = mongoose.model("surveys");

module.exports = app => {
	// any # of functions can be passed in and they will be executed inline
	app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
		const { title, subject, body, recipients } = req.body;

		// CREATE NEW INSTANCE OF SURVEY
		const survey = new Survey({
			title,
			subject,
			body,
			// map function takes every single email in array
			// it runs some function, and creates a new array
			// return an object with the property email that points to the user's email
			recipients: recipients
				.split(",")
				.map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now()
		});
		// great place to send an email
		// CREATE NEW MAILER INSTANCE
		// 1st arg: entire survey object created above
		// 2nd arg: template of email HTML body. Func to be called with survey object/model
		const mailer = new Mailer(survey, surveyTemplate(survey));
		// call send on mailer so it attempts to send itself
		mailer.send();
	});
};
