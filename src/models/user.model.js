const mongoose = require('mongoose');
const middleware = require('../middlewares/schema.middleware');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true, versionKey: false }
);

middleware(userSchema, 'auth');

module.exports = mongoose.model('users', userSchema);
