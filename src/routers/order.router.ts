import express from 'express';
import { create, find, update } from '../controllers/order.controller';
import authorization from '../middlewares/authorization.middleware';

const orderRouter = express.Router();

orderRouter
  .route('/')
  .post(create)
  .get(authorization, find)
  .put(authorization, update);

export default orderRouter;
