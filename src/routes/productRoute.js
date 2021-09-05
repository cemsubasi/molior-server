const productRouter = require("express").Router();
const Product = require("../models/products");

productRouter
	.route("/")
	.post((req, res) => {
		const product = new Product({
			id: req.body.id,
			productURL: req.body.productURL,
			productHeader: req.body.productHeader,
			productBody: req.body.productBody,
			price: req.body.price,
			totalPrice: req.body.totalPrice,
			size: req.body.size,
			category: req.body.category,
			collect: req.body.collect,
			discount: req.body.discount,
			stock: req.body.stock,
			shipping: req.body.shipping,
			date: req.body.date,
			title: req.body.title,
			publish: req.body.publish,
			images: req.body.images,
		});
		product
			.save()
			.then(() => res.status(201).send(product))
			.catch((err) => {
				console.log(req.body);
				res.status(404).send(err);
			});
	})
	.delete((req, res) => {
		Product.findOneAndRemove({ productURL: req.body.productURL })
			.then((result) => res.status(202).send(result))
			.catch((err) => {
				res.status(404).send(err);
			});
	})
	.put((req, res) => {
		Product.findOneAndUpdate(
			{ productURL: req.body.productURL },
			{ publish: req.body.publish }
		)
			.then((result) => res.status(202).send(result))
			.catch((err) => {
				res.status(404).send(err);
			});
	});

productRouter.route("/stock").put((req, res) => {
	Product.findOneAndUpdate(
		{ productURL: req.body.productURL },
		{ $inc: { stock: req.body.count } }
	)
		.then((result) => res.status(202).send(result))
		.catch((err) => {
			console.log(req.body);
			res.status(404).send(err);
		});
});
productRouter.route("/edit").put((req, res) => {
	Product.findOneAndUpdate(
		{ id: req.body.id },
		{
			productHeader: req.body.productHeader,
			productBody: req.body.productBody,
			discount: req.body.discount,
			shipping: req.body.shipping,
			size: req.body.size,
			price: req.body.price,
			totalPrice: req.body.totalPrice,
			category: req.body.category,
			collect: req.body.collect,
			stock: req.body.stock,
		}
	)
		.then((result) => res.status(202).send(result))
		.catch((err) => {
			res.status(402).send(err);
		});
});

module.exports = productRouter;
