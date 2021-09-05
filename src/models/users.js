const mongoose = require("mongoose");

module.exports = mongoose.model(
	"users",
	new mongoose.Schema({
		username: {
			type: String,
			require: true,
			unique: true,
		},
		password: {
			type: String,
			require: true,
		},
	})
);
