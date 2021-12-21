const validator = require('../validators/auth.validator');

const login = (req, res, next) => {
  const { username, password } = req.body;
  const { error } = validator.validate({
    username,
    password,
  });
  return error ? res.status(400).send(error) : next();
};

const signup = (req, res, next) => {
  const { username, password } = req.body;
  const { error } = validator.validate({
    username,
    password,
  });
  return error ? res.status(400).send(error) : next();
};

module.exports = {
  login,
  signup,
};
