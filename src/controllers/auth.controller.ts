import { Request, Response } from 'express';
import { IUser } from '../index.d';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import winston from '../loggers/response.logger';
import { SECRET } from '../config';

const logger = winston('auth');

const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const token = jwt.sign(password, SECRET);
    const user = await User.create({
      username,
      password: token,
    });
    return res.status(201).send({ _id: user._id, username: user.username });
  } catch (err) {
    logger.error(err);
    res.status(500).send(err);
  }
};

const login = async (req: Request, res: Response) => {
  if (req?.session?.user?._id) return res.sendStatus(400);
  const { username, password } = req.body;

  try {
    const passwordToken = jwt.sign(password, SECRET);
    const user = await User.findOne({
      username,
      password: passwordToken,
    })
      .select('_id username')
      .lean();

    const sessionToken = jwt.sign(user as object, SECRET);
    req.session.user = user as IUser;

    return res
      .cookie('auth-token', sessionToken, {
        // sameSite: 'none',
        // secure: true,
        // httpOnly: true,
      })
      .status(200)
      .send(user);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err);
  }
};

const logout = (req: Request, res: Response) => {
  if (req?.session?.user?._id) {
    delete req.session.user;
    return res.clearCookie('auth-token').sendStatus(200);
  }
  return res.sendStatus(400);
};

export { signup, login, logout };
