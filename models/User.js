const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// use schema object to create schema for new collection
const userSchema = new Schema({
	// every user will have googleID
	googleID: String,
	credits: { type: Number, default: 0 }
});

// CREATE MODEL CLASS
// makes mongoose aware new collection needs to be created if doesn't exist
// 1st arg: create new collection 'users'
// 2nd arg: 'userSchema' we just created
mongoose.model("users", userSchema);
