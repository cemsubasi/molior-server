import { Request, Response, NextFunction } from 'express';
import logger from '../loggers/request.logger';

export default (type: string) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { url, body, headers } = req;
  logger(type).info({ url, headers, body });
  next();
};
