import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import initRoutes from './initRoutes';
import { SESSION_OPT, CORS_OPT } from './config';

const initServer = () => {
  const server = express();
  server.use(express.json({ limit: '50mb' }));
  server.use(cookieParser());
  server.use(cors(CORS_OPT));
  server.use(session(SESSION_OPT));
  server.use(helmet());
  server.use(compression());

  initRoutes(server);

  return server;
};
export default initServer;
