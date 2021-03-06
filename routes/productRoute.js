const express = require("express");
const Product = require("../models/products");
const postRoute = express.Router();

postRoute
  .route("/")
  .post((req, res) => {
    const product = new Product({
      id: req.body.id,
      productURL: req.body.productURL,
      productHeader: req.body.productHeader,
      productBody: req.body.productBody,
			price: req.body.price,
      size: req.body.size,
      category: req.body.category,
      collect: req.body.collect,
      discount: req.body.discount,
      stock: req.body.stock,
      shipping: req.body.shipping,
      date: req.body.date,
      data_url: req.body.data_url,
      file: req.body.file,
			title: req.body.title,
			publish: req.body.publish,
    })
    product
      .save()
      .then(() => res.status(201).send(product))
      .catch((err) => {
        console.log(req.body);
        res.status(404).send(err);
      })
  })
  .delete((req, res) => {
    Product.findOneAndRemove({ productURL: req.body.productURL })
      .then((result) => res.status(202).send(result))
      .catch((err) => {
        res.status(404).send(err);
      })
  })
  .put((req, res) => {
    Product.findOneAndUpdate(
      { productURL: req.body.productURL },
      { publish: req.body.publish }
    )
      .then((result) => res.status(202).send(result))
      .catch((err) => {
        res.status(404).send(err);
      })
  })

  postRoute.route('/stock')
	.put((req, res) => {
    Product.findOneAndUpdate(
      { productURL: req.body.productURL },
      { $inc: {stock: req.body.count }}
		)
      .then((result) => res.status(202).send(result))
      .catch((err) => {
				console.log(req.body)
        res.status(404).send(err);
      })
  })
	postRoute.route('/edit').put((req, res) => {
		Product.findOneAndUpdate(
			{ productURL: req.body.productURL },
			{
				productHeader: req.body.productHeader,
				productBody: req.body.productBody,
				discount: req.body.discount,    
				shipping: req.body.shipping,    
				size: req.body.size,            
				price: req.body.price,          
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

module.exports = postRoute;
