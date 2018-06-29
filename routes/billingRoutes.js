// IMPORT KEYS
const keys = require("../config/keys");
// IMPORT STRIPE
const stripe = require("stripe")(keys.stripeSecretKey);
// REQUIRE AUTH MIDDLEWARE TO USE ONLY ON THIS ROUTE
const requireLogin = require("../middlewares/requireLogin");

// CREATE ARROW FUNCTION AND IMMEDIATELY EXPORT
module.exports = app => {
	// ROUTE HANDLER
	// watches for POST requests made to /api/route
	// take request and throw it in auth middleware: requireLogin
	app.post("/api/stripe", requireLogin, async (req, res) => {
		// handle token, reach out to api, and finalize charge
		const charge = await stripe.charges.create({
			// specify amount we want to bill on back-end
			amount: 500,
			currency: "usd",
			description: "$5 for 5 credits",
			// what source we want to bill (id: from req.body/token)
			source: req.body.id
		});
		// after successful charge, add (persist) 5 credits to user model
		req.user.credits += 5;
		// save user (ASYNC request)
		const user = await req.user.save();
		// send user model back to client
		res.send(user);
	});
};
