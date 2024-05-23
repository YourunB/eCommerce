import {
  AuthErrorResponse,
  Customer,
  CustomerSignInResult,
  ErrorResponse,
  MyCustomerDraft,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import {
  AUTH_BASIC,
  AUTH_PARAMS,
  GRANT_PASSWORD,
  AUTH_URL,
  PATH,
  MSG_NETWORK_ERROR,
  AUTH_BEARER,
  PROJECT_KEY,
  API_URL,
  CONTENT_TYPE_APP,
  SCOPES_CLIENT,
} from '../login/constants';
import { AuthResponse } from '../login/types';

async function responseToJSON<T>(response: Response): Promise<T | AuthErrorResponse> {
  if (!response.ok) return response.json().then((resp) => resp as AuthErrorResponse);
  return response.json() as T;
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
