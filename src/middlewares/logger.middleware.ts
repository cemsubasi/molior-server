import { Request, Response, NextFunction } from 'express';
import logger from '../loggers/request.logger';

const filter = (body: any): object =>
  Object.keys(body).reduce(
    (acc: object[], curr: string) =>
      curr === 'password' || curr === 'images'
        ? acc
        : [...acc, { [curr]: body[curr] }],
    []
  );

export default (type: string) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { url, body, headers } = req;
  logger(type).info({ url, headers, body: filter(body) });
  next();
};
