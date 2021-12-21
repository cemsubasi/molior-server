const winston = require('../loggers/schema.logger');

module.exports = (schema, type) => {
  const logger = winston(type);

  schema.post('save', (doc) => logger.info(doc));
  schema.post(/^find/, (doc) => logger.info(doc));
  schema.post(/^update/, (doc) => logger.info(doc));
  schema.post(/^delete/, (doc) => logger.info(doc));
};
