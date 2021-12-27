import request from 'supertest';
import jwt from 'jsonwebtoken';
import initExpress from '../../initExpress';
import User from '../../models/user.model';
import { SECRET } from '../../config';
import { signupCredentials, IUser } from '../constants';

const server = initExpress();

afterAll(
  async () =>
    await User.findOneAndRemove({ username: signupCredentials.username })
);

const postSignup = (user = signupCredentials) =>
  request(server).post('/api/v1/auth/signup').send(user);

describe('User signup', () => {
  it('returns 201 CREATED if username and password is valid', async () => {
    const response = await postSignup();
    expect(response.status).toBe(201);
  });
  it('returns 400 BAD_REQUEST if username less than 4 char', async () => {
    const response = await postSignup({ username: 'cem', password: '123456' });
    expect(response.status).toBe(400);
  });
  it('returns 400 BAD_REQUEST if username more than 30 char', async () => {
    const response = await postSignup({
      username: 'cemilcemsubasicemilcemsubasicemilcem',
      password: '123456',
    });
    expect(response.status).toBe(400);
  });
  it('returns 400 BAD_REQUEST if password less than 8 char', async () => {
    const response = await postSignup({
      username: 'cemilcem',
      password: '12345',
    });
    expect(response.status).toBe(400);
  });
  it('returns 400 BAD_REQUEST if password more than 30 char', async () => {
    const response = await postSignup({
      username: 'cemilcem',
      password: '12345ajksfgkhf1789gf81b2f891by290129bfvb1927b271bv',
    });
    expect(response.status).toBe(400);
  });
  it('returns 400 BAD_REQUEST if username is empty', async () => {
    const response = await postSignup({
      password: '12345ajksfgkhf1789gf81b2f891by290129bfvb1927b271bv',
    } as IUser);
    expect(response.status).toBe(400);
  });
  it('returns 400 BAD_REQUEST if password is empty', async () => {
    const response = await postSignup({
      username: 'cemilcem',
    } as IUser);
    expect(response.status).toBe(400);
  });
  it('returns 400 BAD_REQUEST if password and username are empty', async () => {
    const response = await postSignup({} as IUser);
    expect(response.status).toBe(400);
  });
});
