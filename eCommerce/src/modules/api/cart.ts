import state from '../../state/state';
import { InvalidOperation } from '@commercetools/importapi-sdk';
import { Cart, CartDraft, CartUpdateAction, DiscountCode } from '@commercetools/platform-sdk';
import { API_URL, AUTH_BEARER, CONTENT_TYPE_APP, MSG_NETWORK_ERROR, PROJECT_KEY } from '../login/constants';

function responseProcess<T>(response: Response): Promise<T | Error> {
  if (!response.ok) return response.json().then((resp) => resp);
  return response.json() as Promise<T>;
}

function handleError(e: Error): Error {
  throw new Error(`${MSG_NETWORK_ERROR}. ${e.message}`);
}

type URLs = {
  isCartByCustomerId: URL;
  carts: URL;
  discountCodeById: URL;
};

type RequestUpdateCart = {
  version: number;
  actions: CartUpdateAction[];
};

export const url: URLs = {
  isCartByCustomerId: new URL(`${API_URL}/${PROJECT_KEY}/carts/customer-id=`),
  carts: new URL(`${API_URL}/${PROJECT_KEY}/carts`),
  discountCodeById: new URL(`${API_URL}/${PROJECT_KEY}/discount-codes/`),
};

/**
 * Get discount code by ID.
 */
export function getDiscountCodeById(id: string): Promise<Error | DiscountCode> {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `${AUTH_BEARER} ${state.access_token.access_token}`,
    },
  };

  return fetch(`${url.discountCodeById}${id}`, options)
    .then(responseProcess<DiscountCode>)
    .catch(handleError);
}

/**
 * Checks if a Cart of a Customer exists..
 */
export function isCartExistsByCustomerID(id: string): Promise<boolean> {
  const options = {
    method: 'HEAD',
    headers: {
      Authorization: `${AUTH_BEARER} ${state.access_token.access_token}`,
    },
  };

  return fetch(`${url.isCartByCustomerId}${id}`, options)
    .then((response) => response.status === 200)
    .catch(() => false);
}

/**
 * Creating an anonymous Cart
 */
export function createAnonymousCart() {
  const currency = 'EUR';
  const cartDraft: CartDraft = {
    currency,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPE_APP,
      Authorization: `${AUTH_BEARER} ${state.access_token.access_token}`,
    },
    body: JSON.stringify(cartDraft),
  };

  return fetch(url.carts, options)
    .then(responseProcess<Cart>)
    .catch(handleError);
}

/**
 * Creating My Cart
 */
export function createMyCart(): Promise<Cart | InvalidOperation | Error> {
  const currency = 'EUR';

  // anonymousId: string; Anonymous session associated with the Cart.
  const cartDraft: CartDraft = {
    currency,
    anonymousId: state.anonymousId,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPE_APP,
      Authorization: `${AUTH_BEARER} ${state.access_token.access_token}`,
    },
    body: JSON.stringify(cartDraft),
  };

  return fetch(url.carts, options)
    .then(responseProcess<Cart>)
    .catch(handleError);
}

/**
 * Update My Cart
 */
export function UpdateMyCart(id: string, request: RequestUpdateCart): Promise<Cart | Error> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPE_APP,
      Authorization: `${AUTH_BEARER} ${state.access_token.access_token}`,
    },
    body: JSON.stringify(request),
  };

  return fetch(`${url.carts}/${id}`, options)
    .then(responseProcess<Cart>)
    .catch(handleError);
}

//get cart
export function getCartApi(id: string): Promise<Cart | Error> {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': CONTENT_TYPE_APP,
      Authorization: `${AUTH_BEARER} ${state.access_token.access_token}`,
    },
  };

  return fetch(`${API_URL}/${PROJECT_KEY}/carts/${id}`, options)
    .then(responseProcess<Cart>)
    .catch(handleError);
}

//delete cart
export function deleteCartApi(id: string, version: number): Promise<Cart | Error> {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': CONTENT_TYPE_APP,
      Authorization: `${AUTH_BEARER} ${state.access_token.access_token}`,
    },
  };

  return fetch(`${API_URL}/${PROJECT_KEY}/carts/${id}?version=${version}`, options)
    .then(responseProcess<Cart>)
    .catch(handleError);
}
