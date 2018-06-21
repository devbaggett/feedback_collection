// *** import express library (commonJS module syntax for node) ***
const express = require("express");

// IMPORT PASSPORT AND PASSPORT STRATEGY
const passport = require("passport");
// IMPORTS 2 DIFF PROPERTIES, WE ONLY NEED STRATEGY
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// IMPORT KEYS.JS INTO KEYS OBJECT
// any file that ends in .js doesn't need the extension when importing
const keys = require("./config/keys.js");

// CREATES A NEW INSTANCE OF THE GOOGLE PASSPORT STRATEGY
// inside the function constructor tells google how to authenticate users inside app
// passport.use - be aware of new strategy available
passport.use(
	new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: "/auth/google/callback"
	})
);

// *** use express library to create express application (single app) ***
const app = express();

// *** wait for Heroku to tell us what our app's port will be ***
// if there is a Heroku port available, set it for production
// otherwise, handle case where we are using dev environment
const PORT = process.env.PORT || 5000;

// *** listen on PORT const ***
app.listen(PORT);
