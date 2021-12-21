import mongoose, { Schema } from 'mongoose';
import IProduct from '../interfaces/model/product';
import middleware from '../middlewares/schema.middleware';

const productSchema: Schema = new mongoose.Schema(
  {
    id: {
      type: Number,
      require: true,
    },
    productURL: {
      type: String,
      require: true,
      unique: true,
    },
    productHeader: {
      type: String,
      require: true,
    },
    productBody: {
      type: String,
      require: true,
    },
    size: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    totalPrice: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    collect: {
      type: String,
      require: true,
    },
    discount: {
      type: Number,
      require: true,
    },
    stock: {
      type: Number,
      require: true,
    },
    shipping: {
      type: Boolean,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    publish: {
      type: Boolean,
      require: true,
    },
    images: {
      type: Array,
      require: true,
    },
  },
  { timestamps: true, versionKey: false }
);

middleware(productSchema, 'product');

export default mongoose.model < IProduct > ('products', productSchema);
