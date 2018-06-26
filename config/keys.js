// keys.js - figure out what set of credentials to return

// process.env is at bottom of index.js file
if (process.env.NODE_ENV === "production") {
	// we are in product - return the prod set of keys
	// require prod file and assign it to module.exports
	module.exports = require("./prod");
} else {
	// we are in development - return the dev keys
	// pull dev set of keys in and passback to whoever's asking for keys
	module.exports = require("./dev");
}
