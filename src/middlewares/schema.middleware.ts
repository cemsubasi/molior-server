import { Schema } from 'mongoose';
import winston from '../loggers/schema.logger';

export default (schema: Schema, type: string) => {
  const logger = winston(type);

  schema.post('save', (doc) => logger.info(doc));
  schema.post(/^find/, (doc) => logger.info(doc));
  schema.post(/^update/, (doc) => logger.info(doc));
  schema.post(/^delete/, (doc) => logger.info(doc));
};
