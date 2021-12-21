import express, { Request, Response } from 'express';
import logger from './middlewares/logger.middleware';
import { order, product, auth } from './routers';

const initializeRoutes = (server: express.Application) => {
  // server.use('/', logger);
  server.use('/api/v1/auth', logger('auth'), auth);
  server.use('/api/v1/products', logger('product'), product);
  server.use('/api/v1/orders', logger('orders'), order);

  server.use((req: Request, res: Response) => {
    res.status(403).send('not found!');
  });
};

export default initializeRoutes;
