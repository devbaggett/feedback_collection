// *** import express library (commonJS module syntax for node) ***
const express = require("express");
// IMPORT MONGOOSE
const mongoose = require("mongoose");
// IMPORT COOKIE-SESSION MODULE
const cookieSession = require("cookie-session");
// IMPORT PASSPORT HELPER
const passport = require("passport");
// IMPORT KEYS.JS
const keys = require("./config/keys");
// IMPORT BODYPARSER
const bodyParser = require("body-parser");

// IMPORT USER.JS FILE WITHOUT ASSIGNMENT
require("./models/User");
// IMPORT SURVEYS.JS FILE WITHOUT ASSIGNMENT
require("./models/Surveys");
// IMPORT PASSPORT FILE WITHOUT ASSIGNMENT
require("./services/passport");

mongoose.Promise = global.Promise;
// INSTRUCT MONGOOSE TO ATTEMPT TO CONNECT TO MONGODB
mongoose.connect(keys.mongoURI);

// *** use express library to create express application (single app) ***
const app = express();

// WIRE UP BODYPARSER MIDDLEWARE
app.use(bodyParser.json());

// ENABLE COOKIES AND GET EXPRESS TO CARE ABOUT THEM
app.use(
	cookieSession({
		// PROVIDE CONFIG OBJECT WITH 2 DIFFERENT PROPERTIES
		// how long this cookie can exist in browser before it expires
		// has to be passed in by milliseconds (we want 30 days)
		// 30 days * 24 hr * 60 min % 60 sec * 1000 ms
		maxAge: 30 * 24 * 60 * 60 * 1000,
		// KEY TO ENCRYPT COOKIE
		keys: [keys.cookieKey]
	})
);

// TELL PASSPORT TO MAKE USE OF COOKIES TO HANDLE AUTHENTICATION
// 2 additional calls:
app.use(passport.initialize());
app.use(passport.session());

// CALL AUTHROUTES FUNCTION WITH APP OBJECT
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

// CONFIG SO EXPRESS BEHAVES CORRECTLY IN PROD ENV (only ran in prod)
// NODE_ENV is automatically set by Heroku in production
if (process.env.NODE_ENV === "production") {
	// Express will serve up production assets (i.e. main.js/main.css)
	app.use(express.static("client/build"));
	// CATCH-ALL ROUTE
	// Express will serve up index.html file if doesn't recognize route
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

// *** wait for Heroku to tell us what our app's port will be ***
// if there is a Heroku port available, set it for production
// otherwise, handle case where we are using dev environment
const PORT = process.env.PORT || 5000;

// *** listen on PORT const ***
app.listen(PORT);
