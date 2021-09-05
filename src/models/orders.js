const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	orderId: {
		type: Number,
		require: true,
		unique: true,
	},
	cartList: {
		type: Array,
	},
	name: {
		type: String,
		require: true,
	},
	surname: {
		type: String,
		require: true,
	},
	address: {
		type: String,
		require: true,
	},
	phone: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	country: {
		type: String,
		require: true,
	},
	state: {
		type: String,
		require: true,
	},
	zip: {
		type: Number,
	},
	terms: {
		type: Boolean,
		require: true,
	},
	shipped: {
		type: Boolean,
	},
});

module.exports = mongoose.model("orders", orderSchema);
