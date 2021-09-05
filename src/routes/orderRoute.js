const Product = require("../models/products");
const Order = require("../models/orders");
const orderRouter = require("express").Router();

orderRouter
	.route("/")
	.post((req, res) => {
		const order = new Order({
			orderId: req.body.credentials.orderId,
			name: req.body.credentials.name,
			surname: req.body.credentials.surname,
			address: req.body.credentials.address,
			phone: req.body.credentials.phone,
			email: req.body.credentials.email,
			country: req.body.credentials.country,
			state: req.body.credentials.state,
			zip: req.body.credentials.zip,
			terms: req.body.credentials.terms,
			shipped: false,
		});
		order
			.save()
			.then(() => {
				console.log("order document created successfully");
				req.body.cart.forEach((item) => {
					Order.findOneAndUpdate(
						{ orderId: req.body.credentials.orderId },
						{
							$push: {
								cartList: item,
							},
						}
					)
						.then(() =>
							console.log("order document filled with orders successfully")
						)
						.catch((err) => console.log("order document fill error: ", err));
				});
			})
			.catch((err) => console.log("order document create error: ", err));
		req.body.cart.forEach((item) => {
			Product.findOneAndUpdate(
				{ productURL: item.productURL },
				{ $inc: { stock: -1 } }
			)
				.then(() => console.log("stock decreased successfully"))
				.catch((err) => console.log("stock decrease error: ", err));
		});

		res.status(200).send("ok");
	})
	.get((req, res) => {
		Order.find()
			.then((result) => res.status(200).send(result))
			.catch((err) => console.log(err));
	})
	.put((req, res) => {
		Order.findOneAndUpdate(
			{ orderId: req.body.orderId },
			{ $set: { "cartList.$[element].status": req.body.arg } },
			{
				arrayFilters: [
					{
						"element.cartIndex": req.body.cartIndex,
					},
				],
				multi: true,
			}
		)
			.then((result) => res.status(200).send(result))
			.catch((err) => console.log("orderRouter put error: ", err));
	});

module.exports = orderRouter;
