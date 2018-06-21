// *** import express library (commonJS module syntax for node) ***
const express = require("express");

// *** use express library to create express application (single app) ***
// used to set up configuration that will listen for incoming requests
// that are being routed to the Express side of the app from the Node side
// then route those requests on to different route handlers
const app = express();

// *** create route handler and associate it with given route ***
app.get("/", (req, res) => {
	res.send({ loveyou: "boo bear" });
});

// *** wait for Heroku to tell us what our app's port will be ***
// if there is a Heroku port available, set it for production
// otherwise, handle case where we are using dev environment
const PORT = process.env.PORT || 5000;

// *** listen on PORT const ***
app.listen(PORT);
