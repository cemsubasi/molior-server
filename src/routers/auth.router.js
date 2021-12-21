const authRouter = require('express').Router();
const { signup, login, logout } = require('../controllers/auth.controller');
const { authorization, validation } = require('../middlewares');

authRouter
  .get('/test', authorization, (req, res) => res.sendStatus(204))
  .post('/signup', validation.signup, signup)
  .post('/login', validation.login, login)
  .get('/logout', logout);

module.exports = authRouter;
