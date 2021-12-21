const authorization = require('./authorization.middleware');
const logger = require('./logger.middleware');
const schema = require('./schema.middleware');
const validation = require('./validation.middleware');

module.exports = {
  authorization,
  logger,
  schema,
  validation,
};
