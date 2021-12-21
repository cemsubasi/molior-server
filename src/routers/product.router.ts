import express from 'express';
import {
  create,
  find,
  remove,
  increaseStock,
  update,
  updateStatus,
} from '../controllers/product.controller';

const productRouter = express.Router();

productRouter
  .route('/')
  .get(find)
  .post(create)
  .delete(remove)
  .put(updateStatus);

productRouter.route('/stock').put(increaseStock);
productRouter.route('/edit').put(update);

export default productRouter;
