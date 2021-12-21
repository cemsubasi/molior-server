const logger = require(`../loggers/request.logger`);

module.exports = (type) => (req, res, next) => {
  const { url, body, headers } = req;
  logger(type).info({ url, headers, body });
  next();
};
