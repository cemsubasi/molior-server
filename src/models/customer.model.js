const mongoose = require('mongoose');
const middleware = require('../middlewares/schema.middleware');

const customerSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
  },
  { timestamps: true, versionKey: false }
);

middleware(customerSchema, 'customer');

module.exports = mongoose.model('customers', customerSchema);
