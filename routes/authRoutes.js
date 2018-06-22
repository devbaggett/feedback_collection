// IMPORT PASSPORT AND PASSPORT STRATEGY
const passport = require("passport");

// EXPORT FUNCTION FROM FILE / CALL THIS FUNCTION FROM EXPRESS APP OBJECT
module.exports = app => {
	// ROUTE HANDLER THAT MAKES SURE USER IS KICKED INTO OAUTH PASSPORT FLOW
	app.get(
		"/auth/google",
		// passport attempts to authenticate user coming in on above route
		// using "google" strategy
		passport.authenticate("google", {
			// OPTIONS OBJECT
			// asks google to give access to profile info and email
			// scope contains fixed list of available permissions
			scope: ["profile", "email"]
		})
	);

	// ROUTE HANDLER FOR CODE EXCHANGE (FOLLOWUP REQUEST) WITH GOOGLE AFTER USER GETS SENT BACK
	// access token will be console logged from 'passport.use' callback
	app.get("/auth/google/callback", passport.authenticate("google"));
};
