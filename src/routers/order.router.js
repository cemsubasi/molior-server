const orderRouter = require('express').Router();
const { create, find, update } = require('../controllers/order.controller');

orderRouter.route('/').post(create).get(find).put(update);

module.exports = orderRouter;
