const Product = require("../models/products");
const offerRoute = require("express").Router();

offerRoute.route("/").post((req, res) => {
	req.body.map((item) =>
		Product.findOneAndUpdate(
			{ productURL: item.productURL },
			{ $inc: { stock: -1 } }
		).then(() => console.log("success"))
	);

	res.status(200).send("ok");
});

module.exports = offerRoute;
