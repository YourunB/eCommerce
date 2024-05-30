import { Customer } from '@commercetools/platform-sdk';
import { AuthResponse } from '../modules/login/types';

export type StateValue = {
  [index: string]: unknown;
};

export type Callback = {
  (): void;
};

export type Subscribers = {
  [index: string]: Callback[];
};

export type StateKey = string;
export enum AuthState {
  notLogged = 'notlogged',
  logged = 'logged',
  anonymous = 'anonymous',
}

export interface State {
  rootCategory: string;
  authState: AuthState;
  access_token: AuthResponse | Record<string, never>;
  customer: Customer | Record<string, never>;
  limits: string[];
  [index: string]: unknown;
}
