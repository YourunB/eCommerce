import { State, Subscribers, StateKey, StateValue, Callback, AuthState } from './types';

const initialState: State = {
  authState: AuthState.notLogged,
  access_token: {},
  customer: {},
  limits: ['10', '20', '30', '40', '50'],
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
