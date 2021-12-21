import mongoose, { Schema } from 'mongoose';
import ICustomer from '../interfaces/model/customer';
import middleware from '../middlewares/schema.middleware';

const customerSchema: Schema = new mongoose.Schema(
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

export default mongoose.model < ICustomer > ('customers', customerSchema);
