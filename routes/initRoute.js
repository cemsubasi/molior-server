const express = require("express");
const Product = require("../models/products");
const initRoute = express.Router();

initRoute.get("/", (req, res) => {
  Product.find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => res.status(404).send(err));
});

module.exports = initRoute;
