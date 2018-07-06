// IMPORT KEYS FILE
const keys = require("../../config/keys");

// EXPORT SURVEY BODY
module.exports = survey => {
	// return string that will function as body of email
	return `
		<html>
			<body>
				<div style="text-align: center;">
					<h3>I'd like your input!</h3>
					<p>Please answer the following question:</p>
					<p>${survey.body}</p>
					<div>
						<a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a>
					</div>
					<div>
						<a href="${keys.redirectDomain}/api/surveys/thanks">No</a>
					</div>
				</div>
			</body>
		</html>
	`;
};
