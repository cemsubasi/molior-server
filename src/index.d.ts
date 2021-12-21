export interface IUser {
  _id: string;
  username: string;
  password?: string;
}

declare module 'express-session' {
  export interface Session {
    user?: IUser;
  }
}
