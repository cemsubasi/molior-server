import { Request, Response, NextFunction } from 'express';
import validator from '../validators/auth.validator';

const login = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const { error } = validator.validate({
    username,
    password,
  });
  return error ? res.status(400).send(error) : next();
};

const signup = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const { error } = validator.validate({
    username,
    password,
  });
  return error ? res.status(400).send(error) : next();
};

export { login, signup };
