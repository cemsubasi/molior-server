import { Request, Response } from 'express';

import Product from '../models/product.model';
import Order from '../models/order.model';
import winston from '../loggers/response.logger';

import IProduct from '../interfaces/model/product';

const logger = winston('order');

const create = async (req: Request, res: Response) => {
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
  const cart: IProduct[] = req.body.cart;

  try {
    await Order.create({
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

const find = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    return res.status(200).send(orders);
  } catch (err) {
    logger.error(err);
    return res.status(500).send(err);
  }
};

const update = async (req: Request, res: Response) => {
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

export { create, find, update };
