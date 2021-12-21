import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  ORIGIN,
  SECRET,
  DB_NAME,
  DB_PASSWORD,
  DB_COLLECTION,
  MAIL_FROM,
  MAIL_TO,
  MAIL_PASSWORD,
} = process.env;

const CORS_OPT = { credentials: true, origin: ORIGIN };
const SESSION_OPT = {
  secret: 'Keep it secret, keep it safe',
  resave: true,
  saveUninitialized: true,
};

const DB_URL = `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0.zoi2e.mongodb.net/${DB_COLLECTION}?retryWrites=true&w=majority`;
const DB_OPT = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const DB_CONNECT = mongoose
  .connect(DB_URL)
  .then(() => {
    console.log(`server start on localhost:${PORT}`);
    console.log('DB Connected');
  })
  .catch((err: any) => console.log('DB Connection Error', err));

export {
  DB_CONNECT,
  SESSION_OPT,
  CORS_OPT,
  SECRET,
  PORT,
  MAIL_FROM,
  MAIL_TO,
  MAIL_PASSWORD,
};
