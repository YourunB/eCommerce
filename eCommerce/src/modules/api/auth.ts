import {
  Customer,
  ErrorResponse,
  MyCustomerDraft,
  MyCustomerSignin,
  AuthErrorResponse,
  CustomerSignInResult,
  MyCustomerUpdateAction,
  MyCustomerChangePassword,
} from '@commercetools/platform-sdk';
import {
  API_URL,
  PATH,
  AUTH_URL,
  AUTH_BASIC,
  AUTH_BEARER,
  AUTH_PARAMS,
  PROJECT_KEY,
  SCOPES_CLIENT,
  GRANT_PASSWORD,
  CONTENT_TYPE_APP,
  MSG_NETWORK_ERROR,
} from '../login/constants';
import state from '../../state/state';
import { AuthResponse } from '../login/types';

export type InvalidCredentials = {
  code: string;
  message: string;
};

async function responseToJSON<T, E = AuthErrorResponse>(response: Response): Promise<T | E> {
  if (!response.ok) return response.json().then((resp) => resp as E);
  return response.json() as T;
}

export function meLogin<T = CustomerSignInResult>(email: string, password: string): Promise<T | InvalidCredentials> {
  const body: MyCustomerSignin = {
    email,
    password,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPE_APP,
      Authorization: `${AUTH_BEARER} ${state.access_token.access_token}`,
    },
    body: JSON.stringify(body),
  };

  return fetch(`${API_URL}/${PROJECT_KEY}/me/login`, options)
    .then(responseToJSON<T, InvalidCredentials>)
    .catch(() => {
      throw new Error(MSG_NETWORK_ERROR);
    });
}

export function getAccessToken<T = AuthResponse>(email: string, password: string): Promise<T | AuthErrorResponse> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPE_APP,
      Authorization: `${AUTH_BASIC} ${AUTH_PARAMS}`,
    },
    body: `grant_type=${GRANT_PASSWORD}&username=${email}&password=${password}`,
  };

  return fetch(AUTH_URL + PATH, options)
    .then(responseToJSON<T>)
    .catch(() => {
      throw new Error(MSG_NETWORK_ERROR);
    });
}

export function getCustomer<T = Customer>(access_token: string): Promise<T | AuthErrorResponse> {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `${AUTH_BEARER} ${access_token}`,
    },
  };

  return fetch(`${API_URL}/${PROJECT_KEY}/me`, options)
    .then(responseToJSON<T>)
    .catch(() => {
      throw new Error(MSG_NETWORK_ERROR);
    });
}

export function createAnonymous<T = AuthResponse>(): Promise<T | AuthErrorResponse> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPE_APP,
      Authorization: `${AUTH_BASIC} ${AUTH_PARAMS}`,
    },
    body: `grant_type=client_credentials&scope=${SCOPES_CLIENT}`,
  };

  return fetch(`${AUTH_URL}/oauth/${PROJECT_KEY}/anonymous/token`, options)
    .then(responseToJSON<T>)
    .catch(() => {
      throw new Error(MSG_NETWORK_ERROR);
    });
}

export function createCustomer<T = MyCustomerDraft, C = CustomerSignInResult>(
  customer: T,
  token: string
): Promise<ErrorResponse | C> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPE_APP,
      Authorization: `${AUTH_BEARER} ${token}`,
    },
    body: JSON.stringify(customer),
  };

  return fetch(`${API_URL}/${PROJECT_KEY}/me/signup`, options)
    .then(responseToJSON<C>)
    .catch(() => {
      throw new Error(MSG_NETWORK_ERROR);
    });
}

export function updateCustomerApi<T = MyCustomerUpdateAction, C = Customer>(
  customer: T,
  token: string
): Promise<ErrorResponse | C> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPE_APP,
      Authorization: `${AUTH_BEARER} ${token}`,
    },
    body: JSON.stringify(customer),
  };

  return fetch(`${API_URL}/${PROJECT_KEY}/me`, options)
    .then(responseToJSON<C>)
    .catch(() => {
      throw new Error(MSG_NETWORK_ERROR);
    });
}

export function updatePasswordApi<T = MyCustomerChangePassword, C = Customer>(
  customer: T,
  token: string
): Promise<ErrorResponse | C> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPE_APP,
      Authorization: `${AUTH_BEARER} ${token}`,
    },
    body: JSON.stringify(customer),
  };

  return fetch(`${API_URL}/${PROJECT_KEY}/me/password`, options)
    .then(responseToJSON<C>)
    .catch(() => {
      throw new Error(MSG_NETWORK_ERROR);
    });
}
