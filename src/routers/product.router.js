const productRouter = require('express').Router();
const {
  create,
  find,
  remove,
  increaseStock,
  update,
  updateStatus,
} = require('../controllers/product.controller');

productRouter
  .route('/')
  .get(find)
  .post(create)
  .delete(remove)
  .put(updateStatus);

productRouter.route('/stock').put(increaseStock);
productRouter.route('/edit').put(update);

module.exports = productRouter;
