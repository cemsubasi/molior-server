const express = require("express");
const Product = require("../models/products");
const mySchema = require("../models/customers");
const initRoute = express.Router();
const ip = require("ip");

initRoute.get("/", (req, res) => {
	mySchema.findOne({ ip: ip.address() }).then((result) => {
		if (!result) {
			const schema = new mySchema({
				ip: ip.address(),
				date: new Date(),
			})
				.save()
				.then((res) => console.log("new customer saved" + res))
				.catch((err) => console.log("customer model save error", err));
		}
	});

	Product.find()
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => res.status(404).send(err));
});

module.exports = initRoute;
