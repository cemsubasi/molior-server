import mongoose, { Schema } from 'mongoose';
import middleware from '../middlewares/schema.middleware';
import IUser from '../interfaces/model/user';

const userSchema: Schema = new mongoose.Schema(
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

export default mongoose.model<IUser>('users', userSchema);
