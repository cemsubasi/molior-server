import { Request, Response } from 'express';

/* import ip from 'ip'; */
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
// const customer = await Customer.findOne({ ip: ip.address() }).catch(console.log);
//     if (!customer) {
//       const newCustomer = await Customer.create({
//         ip: ip.address(),
//         date: new Date(),
//       })
//         console.log('new customer saved', newCustomer)
// }

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

const updateStatus = async (req: Request, res: Response) => {
  const { productURL, publish } = req.body;
  try {
    const product = await Product.findOneAndUpdate({ productURL }, { publish });
    return res.status(202).send(product);
  } catch (err) {
    logger.error(err);
    return res.status(404).send(err);
  }
};

const increaseStock = async (req: Request, res: Response) => {
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
      }
    );
    return res.status(202).send(product);
  } catch (err) {
    logger.error(err);
    return res.status(402).send(err);
  }
};

export { create, find, remove, update, updateStatus, increaseStock };
