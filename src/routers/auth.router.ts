import express from 'express';
import { signup, login, logout } from '../controllers/auth.controller';
import { authorization, validation } from '../middlewares';

const authRouter = express.Router();

authRouter
  .get('/test', authorization, (req, res) => res.sendStatus(204))
  .post('/signup', validation.signup, signup)
  .post('/login', validation.login, login)
  .get('/logout', logout);

export default authRouter;
