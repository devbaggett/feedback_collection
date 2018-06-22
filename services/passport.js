// IMPORT PASSPORT AND PASSPORT STRATEGY
const passport = require("passport");
// IMPORTS 2 DIFF PROPERTIES, WE ONLY NEED STRATEGY
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// IMPORT KEYS.JS INTO KEYS OBJECT
// any file that ends in .js doesn't need the extension when importing
const keys = require("../config/keys.js");
// IMPORT MONGOOSE LIBRARY
const mongoose = require("mongoose");

// GIVE ACCESS TO USER MODEL CLASS
const User = mongoose.model("users");

// GENERATE IDENTIFYING PIECE OF INFO
// user is whatever we pulled out of db
passport.serializeUser((user, done) => {
	// done is callback that we have to call after we've done some work
	// null means nothing went wrong
	// user.id is identifying piece of info for user from db
	done(null, user.id);
});

// TAKE ID FROM COOKIE AND TURN INTO USER MODEL INSTANCE
// first arg that we stuffed into cookie: user's id
// second arg we have to call after we have turned id back into user
passport.deserializeUser((id, done) => {
	// search our collection for user and call done with user
	// assume that it returns promise after a user with id is found
	User.findById(id).then(user => {
		// (1) takes air object (null)
		// (2) pass in user that we just pulled out
		done(null, user);
	});
});

// CREATES A NEW INSTANCE OF THE GOOGLE PASSPORT STRATEGY
// inside the function constructor tells google how to authenticate users inside app
// passport.use - be aware of new strategy available
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback"
		},
		// SECOND ARGUMENT AS CALLBACK
		(accessToken, refreshToken, profile, done) => {
			// QUERY DATABASE OVER ALL RECORDS
			// attempt to find first record in User collection where googleId = profile.id
			// this returns a promise
			User.findOne({ googleID: profile.id }).then(existingUser => {
				// to figure out if we have an existing user
				if (existingUser) {
					// we already have a record with given profile ID (null)
					done(null, existingUser);
				} else {
					// we don't have user record with this ID, make a new record!
					new User({ googleID: profile.id })
						.save()
						.then(user => done(null, user));
				}
			});
		}
	)
);
