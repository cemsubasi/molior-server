const request = require('supertest');
const jwt = require('jsonwebtoken');
const initExpress = require('../../initExpress');
const User = require('../../models/user.model');
const { SECRET } = require('../../config');

const server = initExpress();

const credentials = {
  username: 'cesdjkhasfil',
  password: '123123',
};

afterAll(
  async () => await User.findOneAndRemove({ username: credentials.username })
);

const postSignup = (user = credentials) =>
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
    });
    expect(response.status).toBe(400);
  });
  it('returns 400 BAD_REQUEST if password is empty', async () => {
    const response = await postSignup({
      username: 'cemilcem',
    });
    expect(response.status).toBe(400);
  });
  it('returns 400 BAD_REQUEST if password and username are empty', async () => {
    const response = await postSignup({});
    expect(response.status).toBe(400);
  });
});
