const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	ip: {
		type: String,
		require: true,
	},
	date: {
		type: Date,
		require: true,
	},
});

const mySchema = mongoose.model("customers", schema);

module.exports = mySchema;
