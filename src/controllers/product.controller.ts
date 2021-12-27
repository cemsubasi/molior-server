import { Request, Response } from 'express';

import Product from '../models/product.model';
import Customer from '../models/customer.model';
import winston from '../loggers/response.logger';

const logger = winston('product');

const find = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    return res.status(200).send(products);
  } catch (err) {
    logger.error(err);
    return res.status(404).send(err);
  }
};

const create = async (req: Request, res: Response) => {
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

const remove = async (req: Request, res: Response) => {
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

const publish = async (req: Request, res: Response) => {
  const { productURL, publish } = req.body;
  try {
    const product = await Product.findOneAndUpdate(
      { productURL },
      { publish },
      { new: true }
    )
      .select('productURL')
      .lean();
    return res.status(202).send(product);
  } catch (err) {
    logger.error(err);
    return res.status(404).send(err);
  }
};

const updateStock = async (req: Request, res: Response) => {
  const { increase } = req.query;
  const { productURL } = req.body;
  const operation = increase ? { $inc: { stock: 1 } } : { $inc: { stock: -1 } };
  try {
    const product = await Product.findOneAndUpdate({ productURL }, operation, {
      new: true,
    });
    return res.status(202).send(product);
  } catch (err) {
    logger.error(err);
    return res.status(404).send(err);
  }
};

const update = async (req: Request, res: Response) => {
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
      },
      { new: true }
    );
    return res.status(202).send(product);
  } catch (err) {
    logger.error(err);
    return res.status(402).send(err);
  }
};

export { create, find, remove, update, publish, updateStock };
