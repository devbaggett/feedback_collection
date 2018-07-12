// take in email list
export default emails => {
	// split on comma and remove spaces
	const emailsArray = emails
		.split(",")
		// map over email strings from array
		// create new array and return from map
		.map(email => email.trim());
};
