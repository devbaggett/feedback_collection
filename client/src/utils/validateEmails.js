// JS email regex
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// take in email list
export default emails => {
	// remove trailing commas
	emails = emails.replace(/,\s*$/, "");
	// split on comma and remove spaces
	const invalidEmails = emails
		.split(",")
		// map over email strings from array
		// create new array and return from map
		.map(email => email.trim())
		// capture emails that fail test
		.filter(email => re.test(email) === false);
	// if has any emails invalid emails
	if (invalidEmails.length) {
		// use `` for template strings
		return `These emails are invalid: ${invalidEmails}`;
	}

	return;
};
