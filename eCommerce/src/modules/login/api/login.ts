import { AuthErrorResponse, Customer } from '@commercetools/platform-sdk';
import {
  CONTENT_TYPE_APP,
  AUTH_BASIC,
  AUTH_PARAMS,
  GRANT_PASSWORD,
  AUTH_URL,
  PATH,
  MSG_NETWORK_ERROR,
  AUTH_BEARER,
  PROJECT_KEY,
  API_URL,
} from '../constants';
import { AuthResponse } from '../types';

async function responseToJSON(response: Response): Promise<AuthResponse | AuthErrorResponse> {
  if (!response.ok) return response.json().then((resp) => resp as AuthErrorResponse);
  return response.json() as unknown as AuthResponse;
}

export function getAccessToken(email: string, password: string) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPE_APP,
      Authorization: `${AUTH_BASIC} ${AUTH_PARAMS}`,
    },
    body: `grant_type=${GRANT_PASSWORD}&username=${email}&password=${password}`,
  };

  return fetch(AUTH_URL + PATH, options)
    .then(responseToJSON)
    .catch(() => {
      throw new Error(MSG_NETWORK_ERROR);
    });
}

export function getCustomer(access_token: string): Promise<Customer> {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `${AUTH_BEARER} ${access_token}`,
    },
  };

  return fetch(`${API_URL}/${PROJECT_KEY}/me`, options)
    .then((response) => {
      if (!response.ok) return response.json().then((resp) => resp);
      return response.json() as unknown as Customer;
    })
    .catch(() => {
      throw new Error(MSG_NETWORK_ERROR);
    });
}
