import { Document } from 'mongoose';
import IProduct from './product';

export default interface IOrder extends Document {
  orderId: number;
  cartList: IProduct[];
  name: string;
  surname: string;
  address: string;
  phone: string;
  email: string;
  country: string;
  state: string;
  zip: number;
  terms: boolean;
  shipped: boolean;
}
