import express from 'express';
import {
  create,
  find,
  remove,
  updateStock,
  update,
  publish,
} from '../controllers/product.controller';

const productRouter = express.Router();

productRouter.route('/').get(find).post(create).delete(remove).patch(publish);

productRouter.route('/stock').patch(updateStock);
productRouter.route('/update').put(update);

export default productRouter;
