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

export interface State {
  access_token: AuthResponse | Record<string, never>;
  customer: Customer | Record<string, never>;
  [index: string]: unknown;
}
