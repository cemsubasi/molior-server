const initRouter = require("express").Router();
const Product = require("../models/products");
const Customer = require("../models/customers");
const ip = require("ip");

initRouter.get("/", (req, res) => {
	Product.find()
		.then((result) => {
			Customer.findOne({ ip: ip.address() })
				.then((registry) => {
					if (!registry) {
						const customer = new Customer({
							ip: ip.address(),
							date: new Date(),
						})
							.save()
							.then((res) => console.log("new customer saved", res))
							.catch((err) => console.log("customer model save error", err));
					}
				})
				.catch(console.log);

			if (result) res.status(200).send(result);
		})
		.catch((err) => res.status(404).send(err));
});

module.exports = initRouter;
