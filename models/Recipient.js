const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = new Schema({
	email: String,
	responded: { type: Boolean, default: false }
});

// rather than register schema with mongoose we will export
module.exports = recipientSchema;
