import state from '../../state/state';
import { API_URL, AUTH_BEARER, MSG_NETWORK_ERROR, PROJECT_KEY } from '../login/constants';
import { CategoryPagedQueryResponse, PagedQueryResponse } from '@commercetools/platform-sdk';

function responseProcess<T>(response: Response): Promise<T | Error> {
  if (!response.ok) return response.json().then((resp) => resp);
  return response.json() as Promise<T>;
}

function handleError(e: Error): Error {
  throw new Error(`${MSG_NETWORK_ERROR}. ${e.message}`);
}

type URLs = {
  [index: string]: URL;
};

export const url: URLs = {
  pruducts: new URL(`${API_URL}/${PROJECT_KEY}/product-projections/search?`),
  categories: new URL(`${API_URL}/${PROJECT_KEY}/categories`),
};

export function queryProducts(url: URL): Promise<PagedQueryResponse | Error> {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `${AUTH_BEARER} ${state.access_token.access_token}`,
    },
  };

  return fetch(url, options)
    .then(responseProcess<PagedQueryResponse>)
    .catch(handleError);
}

export function queryCategories(): Promise<CategoryPagedQueryResponse | Error> {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `${AUTH_BEARER} ${state.access_token.access_token}`,
    },
  };

  return fetch(url.categories, options)
    .then(responseProcess<CategoryPagedQueryResponse>)
    .catch(handleError);
}
