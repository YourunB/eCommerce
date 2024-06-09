import { State, Subscribers, StateKey, StateValue, Callback, AuthState } from './types';

const initialState: State = {
  routes: {
    products: '/yourunb-JSFE2023Q4/ecommerce/products',
  },
  rootCategory: 'All Products',
  authState: AuthState.notLogged,
  access_token: {},
  anonymousId: '',
  customer: {},
  limits: ['8', '16', '32', '64'],
};

const subscribers: Subscribers = {};
const stateHandler = {
  get: (target: State, key: StateKey) => target[key],
  set: (target: State, prop: StateKey, value: StateValue) => {
    target[prop] = value;
    subscribers[prop]?.forEach((callback) => callback());
    return true;
  },
};

export const subscribe = (event: string, calback: Callback) => {
  if (!(event in subscribers)) subscribers[event] = [];
  subscribers[event].push(calback);
};

export default new Proxy(initialState, stateHandler);
