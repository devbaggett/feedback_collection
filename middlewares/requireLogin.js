// DEFINE AND IMMEDIATELY EXPORT ARROW FUNCTION
// NEXT is a function we call when middleware is complete
// This indicates we are possibly passing it off to the next middleware in chain
module.exports = (req, res, next) => {
	// if passport did not find a user referenced inside cookie included in request
	if (!req.user) {
		// end request early (set status on request and send error msg)
		return res.status(401).send({ error: "You must log in!" });
	}
	// if user is logged in, request can now continue to middleware or handler itself
	next();
};
