import { Product } from '@commercetools/platform-sdk';
import { responseToJSON } from '../../components/helpers/predicates';
import state from '../../state/state';
import { API_URL, AUTH_BEARER, MSG_NETWORK_ERROR, PROJECT_KEY } from '../login/constants';

export function getProduct(ID: string) {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `${AUTH_BEARER} ${state.access_token.access_token}`,
    },
  };

  return fetch(`${API_URL}/${PROJECT_KEY}/products/${ID}`, options)
    .then(responseToJSON<Product>)
    .catch(() => {
      throw new Error(MSG_NETWORK_ERROR);
    });
}
