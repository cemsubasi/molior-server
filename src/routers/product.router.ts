import express from 'express';
import {
  create,
  find,
  remove,
  updateStock,
  update,
  publish,
} from '../controllers/product.controller';
import authorization from '../middlewares/authorization.middleware';

const productRouter = express.Router();

productRouter
  .route('/')
  .get(find)
  .post(authorization, create)
  .delete(authorization, remove)
  .patch(authorization, publish);
productRouter.route('/stock').patch(authorization, updateStock);
productRouter.route('/update').put(authorization, update);

export default productRouter;
