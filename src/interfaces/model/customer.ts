import { Document } from 'mongoose';

export default interface ICustomer extends Document {
  ip: string;
  date: Date;
}
