import request from 'supertest';
import jwt from 'jsonwebtoken';
import initExpress from '../../initExpress';
import User from '../../models/user.model';
import { SECRET } from '../../config';
import { loginCredentials, IUser } from '../constants';

const server = initExpress();

beforeAll(async () => {
  await User.create({
    username: loginCredentials.username,
    password: jwt.sign(loginCredentials.password, SECRET),
  });
});

afterAll(async () =>
  User.findOneAndRemove({ username: loginCredentials.username })
);

const postLogin = (user = loginCredentials) =>
  request(server).post('/api/v1/auth/login').send(user);

describe('User login', () => {
  it('returns 200 OK when login request is valid', async () => {
    const response = await postLogin();
    expect(response.status).toBe(200);
  });

  it('returns 200 OK if auth-token is valid', async () => {
    await postLogin()
      .set(
        'set-cookie',
        `auth-token=${jwt.sign(loginCredentials.password, SECRET)}`
      )
      .expect(200);
  });
  it('returns 400 BAD_REQUEST if username is empty', async () => {
    const response = await postLogin({ password: '123456' } as IUser);
    expect(response.status).toBe(400);
  });
  it('returns 400 BAD_REQUEST if password is empty', async () => {
    const response = await postLogin({ username: 'cemil' } as IUser);
    expect(response.status).toBe(400);
  });
  it('returns 400 BAD_REQUEST if username and password are empty', async () => {
    const response = await postLogin({} as IUser);
    expect(response.status).toBe(400);
  });
  it('returns 400 BAD_REQUEST if username less than 4 char', async () => {
    const response = await postLogin({ username: 'cem', password: '123456' });
    expect(response.status).toBe(400);
  });
  it('returns 400 BAD_REQUEST if username more than 30 char', async () => {
    const response = await postLogin({
      username: 'cemilcemsubasicemilcemsubasicemilcem',
      password: '123456',
    });
    expect(response.status).toBe(400);
  });
  it('returns 400 BAD_REQUEST if password less than 8 char', async () => {
    const response = await postLogin({
      username: 'cemilcem',
      password: '12345',
    });
    expect(response.status).toBe(400);
  });
  it('returns 400 BAD_REQUEST if password more than 30 char', async () => {
    const response = await postLogin({
      username: 'cemilcem',
      password: '12345ajksfgkhf1789gf81b2f891by290129bfvb1927b271bv',
    });
    expect(response.status).toBe(400);
  });
});
