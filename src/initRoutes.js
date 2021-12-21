const { order, product, auth } = require('./routers');
const logger = require('./middlewares/logger.middleware');

const initRoutes = (server) => {
  // server.use('/', logger);
  server.use('/api/v1/auth', logger('auth'), auth);
  server.use('/api/v1/products', logger('product'), product);
  server.use('/api/v1/orders', logger('orders'), order);

  server.use((req, res, next) => {
    res.status(403).send('not found!');
  });
};

module.exports = initRoutes;
