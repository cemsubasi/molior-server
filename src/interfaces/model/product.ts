import { Document } from 'mongoose';

interface IFile {
  name: string;
  lastModified: number;
  size: number;
  type: string;
  webkitRelativePath?: string;
}
interface IImage {
  data_url: string;
  file: IFile;
}

export default interface IProduct extends Document {
  id: number;
  productURL: string;
  productHeader: string;
  productBody: string;
  size: string;
  price: number;
  totalPrice: number;
  category: string;
  collect: string;
  discount: number;
  stock: number;
  shipping: boolean;
  date: string;
  title: string;
  publish: boolean;
  images: IImage[];
}
