// DEFINE AND IMMEDIATELY EXPORT ARROW FUNCTION

// This indicates we are possibly passing it off to the next middleware in chain
module.exports = (req, res, next) => {
	// IF CURRENT USER HAS LESS THAN 1 CREDITS
	if (!req.user.credits > 1) {
		// end request early (set status on request and send error msg)
		return res.status(403).send({ error: "Not enough credits" });
	}
	// call this when middleware is complete
	next();
};
