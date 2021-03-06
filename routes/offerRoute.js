const Product = require('../models/products')
const offerRoute = require('express').Router()

offerRoute
	.route('/')
	.post((req, res) => {
		try{
		req.body.map(item => Product.findOneAndUpdate({productURL: item.productURL}, {$inc: {stock: -1}})
	.then(() => console.log('success')))

		res.status(200).send('ok')
	}
	catch{

		res.status(400).send('stock error')
	}
	})

module.exports = offerRoute
