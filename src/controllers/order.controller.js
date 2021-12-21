const Product = require('../models/product.model');
const Order = require('../models/order.model');
const winston = require('../loggers/response.logger');

const logger = winston('order');

const create = async (req, res) => {
  const {
    orderId,
    name,
    surname,
    address,
    phone,
    email,
    country,
    state,
    zip,
    terms,
  } = req.body.credentials;
  const { cart } = req.body;

  try {
    await Order().create({
      orderId,
      name,
      surname,
      address,
      phone,
      email,
      country,
      state,
      zip,
      terms,
      shipped: false,
    });

    cart.forEach(async (item) => {
      await Order.findOneAndUpdate(
        { orderId },
        {
          $push: {
            cartList: item,
          },
        }
      );
    });

    cart.forEach(async (item) => {
      await Product.findOneAndUpdate(
        { productURL: item.productURL },
        { $inc: { stock: -1 } }
      );
    });
    return res.status(200).send('ok');
  } catch (err) {
    logger.error(err);
    return res.status(500).send(err);
  }
};

const find = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).send(orders);
  } catch (err) {
    logger.error(err);
    return res.status(500).send(err);
  }
};

const update = async (req, res) => {
  const { orderId, arg, cartIndex } = req.body;
  try {
    const order = await Order.findOneAndUpdate(
      { orderId },
      { $set: { 'cartList.$[element].status': arg } },
      {
        arrayFilters: [
          {
            'element.cartIndex': cartIndex,
          },
        ],
        multi: true,
      }
    );
    return res.status(200).send(order);
  } catch (err) {
    logger.error(err);
    return res.status(500).send(err);
  }
};

module.exports = {
  create,
  find,
  update,
};
