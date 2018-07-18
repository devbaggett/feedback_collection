// REQUIRE IN MONGOOSE
const mongoose = require("mongoose");
// REQUIRE IN REQUIRELOGIN FUNCTION FROM MIDDLEWARES DIR
const _ = require("lodash");
const Path = require("path-parser").default;
// import URL module from nodeJS to help parse URLs
const { URL } = require("url");
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
	app.get("/api/surveys/:surveyID/:choice", (req, res) => {
		res.send("Thanks for voting!");
	});

	app.post("/api/surveys/webhooks", (req, res) => {
		// pull off survey ID and choice
		const p = new Path("/api/surveys/:surveyID/:choice");
		// use lodash to iterate over req.body
		// 2nd: for every iteration, run that function
		_.chain(req.body)
			.map(({ email, url }) => {
				// extract the URL path: /api/surveys/<ID>/<choice>
				const match = p.test(new URL(url).pathname);
				// if not null
				if (match) {
					// return email also
					return {
						email,
						surveyID: match.surveyID,
						choice: match.choice
					};
				}
			})
			.compact()
			.uniqBy("email", "surveyID")
			// iterate over list of events and issue query for everyone
			.each(({ surveyID, email, choice }) => {
				// find and update one survey
				Survey.updateOne(
					{
						_id: surveyID,
						recipients: {
							$elemMatch: { email: email, responded: false }
						}
					},
					{
						// find choice property, and increment by 1
						$inc: { [choice]: 1 },
						// update responded property to true
						$set: { "recipients.$.responded": true },
						lastResponded: new Date()
					}
				).exec(); // execute query
			})
			.value();

		res.send({});
	});

	// any # of functions can be passed in and they will be executed inline
	app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
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
		try {
			// call send on mailer so it attempts to send itself
			await mailer.send();
			await survey.save();
			// deduct credits for sending a survey campaign
			req.user.credits -= 1;
			const user = await req.user.save();
			// send back updated user model
			res.send(user);
		} catch (err) {
			// unprocessable entity error
			res.status(422).send(err);
		}
	});
};
