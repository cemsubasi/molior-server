const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const initRoutes = require('./initRoutes');
const { SESSION_OPT, CORS_OPT } = require('./config');

const initExpress = () => {
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
module.exports = initExpress;
