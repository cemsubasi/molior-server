import joi from 'joi';

export default joi.object({
  username: joi.string().min(4).max(30).required(),
  password: joi.string().min(6).max(30).required(),
});
