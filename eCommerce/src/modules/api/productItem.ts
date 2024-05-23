import { responseToJSON } from '../../components/helpers/predicates';
import { API_URL, AUTH_BEARER, MSG_NETWORK_ERROR, PROJECT_KEY } from '../login/constants';

export function getProduct(access_token: string) {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `${AUTH_BEARER} ${access_token}`,
    },
  };

  return fetch(`${API_URL}/${PROJECT_KEY}/products/f606d30c-12b3-49c6-b6d4-7162b9a50103`, options)
    .then(responseToJSON)
    .catch(() => {
      throw new Error(MSG_NETWORK_ERROR);
    });
}
