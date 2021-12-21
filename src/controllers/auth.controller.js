const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const winston = require('../loggers/response.logger');
const { SECRET } = require('../config');

const logger = winston('auth');

const signup = async (req, res) => {
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

const login = async (req, res) => {
  if (req.session?.user?._id) return res.sendStatus(400);
  const { username, password } = req.body;

  try {
    const passwordToken = jwt.sign(password, SECRET);
    const user = await User.findOne({
      username,
      password: passwordToken,
    })
      .select('_id username')
      .lean();

    const sessionToken = jwt.sign(user, SECRET);
    req.session.user = user;

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

const logout = (req, res) => {
  if (req.session?.user?._id) {
    delete req.session.user;
    return res.clearCookie('auth-token').sendStatus(200);
  }
  return res.sendStatus(400);
};

module.exports = {
  signup,
  login,
  logout,
};
