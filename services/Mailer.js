// REQUIRE SENDGRID MODULE
const sendgrid = require("sendgrid");
// PULL PROPERTY OFF SENDGRID OBJECT
const helper = sendgrid.mail;
// IMPORT API KEY FROM KEYS FILE
const keys = require("../config/keys");

// SETUP MAILER CLASS
class Mailer extends helper.Mail {
	// first method that's called automatically; used for initialization
	// 1st arg: object has to contain subject and recipients
	// 2nd arg: HTML (body) string that we got from surveyTemplate
	constructor({ subject, recipients }, content) {
		super();
		// pass in sendGridKey object to send to SendGrid API
		this.sgAPI = sendgrid(keys.sendGridKey);
		// who this email appears to be sent from (emaily.com, us)
		this.from_email = new helper.Email("no-reply@emaily.com");
		// subject line of email
		this.subject = subject;
		// body - actual HTML content
		this.body = new helper.Content("text/html", content);
		// list of recipients of email to be sent to
		this.recipients = this.formatAddresses(recipients);

		// add body as content of Mailer
		this.addContent(this.body);
		// enable click tracking inside of email
		this.addClickTracking();
		// register formated list and register with actual email
		this.addRecipients();
	}
	// iterate through list of recipients
	formatAddresses(recipients) {
		// return extracted email
		return recipients.map(({ email }) => {
			// format email we just extracted by passing it in as arg
			return new helper.Email(email);
		});
	}
	// define helper function used above
	addClickTracking() {
		// 2 helper vars
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}
	// define helper function
	addRecipients() {
		// sendgrid stuff
		const personalize = new helper.Personalization();
		// iterate over list of recipients we assigned to this.recipients
		this.recipients.forEach(recipient => {
			// add them to personalized object
			personalize.addTo(recipient);
		});
		// add entire personalized object
		this.addPersonalization(personalize);
	}
	// take Mailer and send it off to SendGrid to be emailed to recipients
	async send() {
		// create SendGrid API request and send off to SendGrid
		try {
			const request = this.sgAPI.emptyRequest({
				method: "POST",
				path: "/v3/mail/send",
				body: this.toJSON()
			});
			// send off request to SendGrid API
			const response = await this.sgAPI.API(request);
			return response;
		} catch (err) {
			console.log(err.response.body.errors);
		}
	}
}

module.exports = Mailer;
