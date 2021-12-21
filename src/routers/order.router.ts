import express from 'express';
import { create, find, update } from '../controllers/order.controller';

const orderRouter = express.Router();

orderRouter.route('/').post(create).get(find).put(update);

export default orderRouter;
