const mongoose = require("mongoose");

module.exports = mongoose.model(
	"customers",
	new mongoose.Schema({
		ip: {
			type: String,
			require: true,
		},
		date: {
			type: Date,
			require: true,
		},
	})
);
