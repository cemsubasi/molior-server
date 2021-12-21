const ip = require('ip');
const Product = require('../models/product.model');
const Customer = require('../models/customer.model');

const winston = require('../loggers/response.logger');
const logger = winston('product');

const find = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).send(products);
  } catch (err) {
    logger.error(err);
    return res.status(404).send(err);
  }
};
// const customer = await Customer.findOne({ ip: ip.address() }).catch(console.log);
//     if (!customer) {
//       const newCustomer = await Customer.create({
//         ip: ip.address(),
//         date: new Date(),
//       })
//         console.log('new customer saved', newCustomer)
// }

const create = async (req, res) => {
  const {
    id,
    productURL,
    productHeader,
    productBody,
    price,
    totalPrice,
    size,
    category,
    collect,
    discount,
    stock,
    shipping,
    date,
    title,
    publish,
    images,
  } = req.body;
  try {
    const product = await Product.create({
      id,
      productURL,
      productHeader,
      productBody,
      price,
      totalPrice,
      size,
      category,
      collect,
      discount,
      stock,
      shipping,
      date,
      title,
      publish,
      images,
    });
    return res.status(201).send(product);
  } catch (err) {
    logger.error(err);
    return res.status(404).send(err);
  }
};

const remove = async (req, res) => {
  const { productURL } = req.body;
  try {
    const product = await Product.findOneAndRemove({
      productURL,
    });
    return res.status(202).send(product);
  } catch (err) {
    logger.error(err);
    return res.status(404).send(err);
  }
};

const updateStatus = async (req, res) => {
  const { productURL, publish } = req.body;
  try {
    const product = await Product.findOneAndUpdate({ productURL }, { publish });
    return res.status(202).send(product);
  } catch (err) {
    logger.error(err);
    return res.status(404).send(err);
  }
};

const increaseStock = async (req, res) => {
  const { productURL, count } = req.body;
  try {
    const product = await Product.findOneAndUpdate(
      { productURL },
      { $inc: { stock: count } }
    );
    return res.status(202).send(product);
  } catch (err) {
    logger.error(err);
    return res.status(404).send(err);
  }
};

const update = async (req, res) => {
  const {
    id,
    productHeader,
    productBody,
    discount,
    shipping,
    size,
    price,
    totalPrice,
    category,
    collect,
    stock,
  } = req.body;
  try {
    const product = await Product.findOneAndUpdate(
      { id },
      {
        productHeader,
        productBody,
        discount,
        shipping,
        size,
        price,
        totalPrice,
        category,
        collect,
        stock,
      }
    );
    return res.status(202).send(product);
  } catch (err) {
    logger.error(err);
    return res.status(402).send(err);
  }
};

module.exports = {
  create,
  find,
  remove,
  update,
  updateStatus,
  increaseStock,
};
