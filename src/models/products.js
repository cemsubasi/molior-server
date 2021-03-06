const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dbSchema = new Schema({
	id: {
		type: Number,
		require: true,
	},
	productURL: {
		type: String,
		require: true,
		unique: true,
	},
	productHeader: {
		type: String,
		require: true,
	},
	productBody: {
		type: String,
		require: true,
	},
	size: {
		type: String,
		require: true,
	},
	price: {
		type: Number,
		require: true,
	},
	category: {
		type: String,
		require: true,
	},
	collect: {
		type: String,
		require: true,
	},
	discount: {
		type: Number,
		require: true,
	},
	stock: {
		type: Number,
		require: true,
	},
	shipping: {
		type: Boolean,
		require: true,
	},
	date: {
		type: String,
		require: true,
	},
	data_url: {
		type: String,
		require: true,
	},
	file: {
		type: Object,
		require: true,
	},
	title: {
		type: String,
		require: true,
	},
	publish: {
		type: Boolean,
		require: true,
	},
	images: {
		type: Array,
		require: true,
	},
});

const Product = mongoose.model("molior", dbSchema);
module.exports = Product;
