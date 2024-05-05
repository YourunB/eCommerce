import { Actions, AuthResponse } from './types';
import { PageLogin } from '../../pages/login/pageLogin';
import { getAccessToken, getCustomer } from './api/login';
import { AuthErrorResponse } from '@commercetools/platform-sdk';
import { isAuthResponse } from './helpers/predicates';
import { Dialog } from '../../components/modalDialog/modalDialog';
import state from '../../state/state';

const dialog = Dialog.getInstance();

export class Login {
  access_token: string | undefined;

  public getPage() {
    // ---
    //   здесь должна быть проверка, может быть пользователь уже авторизован,
    //   - авторизован: редирект на main page
    //   - не авторизован: отдаем страницу логина
    // ---
    const pageLogin = new PageLogin(this.dispatch);
    return pageLogin.getElement();
  }

  public dispatch = (action: Actions) => {
    const {
      type,
      payload: { email, password },
    } = action;

    switch (type) {
      case 'login':
        getAccessToken(email, password)
          .then(this.processResponse)
          .then(this.saveAccessToken, this.handleErrorAccessToken)
          .catch((error) => dialog.show(`${error}`));
        break;
    }
  };

  private processResponse(response: AuthResponse | AuthErrorResponse) {
    if (isAuthResponse(response)) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  }

  private saveAccessToken(response: AuthResponse) {
    state.access_token = response;
    dialog.show(`Token: ${response.access_token}`);

    getCustomer(response.access_token).then((customer) => {
      state.customer = customer;
      dialog.show(`Client: ${customer.firstName} ${customer.lastName}`);
      console.log(state);
    });
  }

  private handleErrorAccessToken(response: AuthErrorResponse) {
    let msg;
    switch (response.statusCode) {
      case 400:
        msg = `Authentication error: ${response.message} Please check that you have entered the correct email and password.`;
        break;
      case 401:
        msg = `Unauthorized: ${response.message} Please check that you have entered the correct email and password.`;
        break;
      case 403:
        msg = `Forbidden: ${response.message}`;
        break;
      case 404:
        msg = `Resource Not Found: ${response.message}`;
        break;

      default:
        msg = response.message;
        break;
    }
    dialog.show(msg, 'warning');
  }
}
