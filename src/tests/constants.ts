interface IUser {
  username: string;
  password: string;
}
const loginCredentials: IUser = {
  username: 'ceil',
  password: '123123',
};

const signupCredentials: IUser = {
  username: 'cesdjkhasfil',
  password: '123123',
};

const order = {
  orderId: 123,
  cartList: [],
  name: 'adssaf',
  surname: 'asfjasf',
  address: 'asfbng',
  phone: '2158512925',
  email: 'alskfn@saf.com',
  country: 'asnggasjgh',
  state: 'askfnasf',
  zip: 12412,
  terms: true,
  shipped: false,
};

export { loginCredentials, signupCredentials, order, IUser };
