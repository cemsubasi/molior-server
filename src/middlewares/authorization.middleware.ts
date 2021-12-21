import { Request, Response, NextFunction } from 'express';
import { IUser } from '../index.d';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config';
import User from '../models/user.model';

const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.session?.user?._id) return next();
    const decoded = jwt.verify(req.cookies['auth-token'], SECRET);
    const user = await User.findOne({ _id: (<any>decoded)._id })
      .select('_id username')
      .lean();
    if (!user) return res.sendStatus(404);
    req.session.user = user as IUser;
    return next();
  } catch (err) {
    return res.status(401).send(err);
  }
};

export default authorization;
