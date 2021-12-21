const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
const User = require('../models/user.model');

const authorization = (req, res, next) => {
  if (req?.session?.user?._id) return next();
  jwt.verify(req.cookies['auth-token'], SECRET, async (err, decoded) => {
    if (err) res.status(500).send(err);
    const user = await User.findOne({ _id: decoded._id })
      .select('_id username')
      .lean()
      .catch((err) => res.status(401).send(err));
    if (user) {
      req.session.user = user;
      return next();
    }
    return res.sendStatus(401);
  });
};

module.exports = authorization;
