import { router } from '../router';
import state from '../../state/state';
import { AuthState } from '../../state/types';
import { Actions, AuthResponse } from './types';
import { isAuthResponse, isCustomer } from '../../components/helpers/predicates';
import { LStorage } from '../localStorage/localStorage';
import { PageLogin } from '../../pages/login/pageLogin';
import { getAccessToken, getCustomer } from '../api/auth';
import { AuthErrorResponse } from '@commercetools/platform-sdk';
import { Dialog } from '../../components/modalDialog/modalDialog';

const dialog = Dialog.getInstance();
const lstorage = new LStorage();

export class Login {
  private page: PageLogin;
  private email = '';
  private password = '';

  constructor() {
    this.page = new PageLogin(this.dispatch);
  }

  public isLogined() {
    return new Promise((resolve, reject) => {
      lstorage
        .getCredentials()
        .then((credential) => {
          if (typeof credential !== 'string') {
            this.email = credential.email;
            this.password = credential.password;
            getAccessToken(this.email, this.password)
              .then(this.processResponse)
              .then(this.saveResponse, this.handleError)
              .then(() => resolve(state.access_token.access_token))
              .catch((e) => reject(e));
          } else reject(credential);
        })
        .catch((e) => reject(e));
    }).finally(() => console.log('global state', state));
  }

  public getPage() {
    return this.page.getElement();
  }

  public dispatch = (action: Actions) => {
    const { type } = action;
    this.email = action.payload.email;
    this.password = action.payload.password;

    switch (type) {
      case 'login':
        getAccessToken(this.email, this.password)
          .then(this.processResponse)
          .then(this.saveResponse, this.handleError)
          .then(this.redirect)
          .catch((error) => dialog.show(`${error}`));
        break;
      case 'register':
        router.route('/yourunb-JSFE2023Q4/ecommerce/404');
        break;
    }
  };

  private redirect() {
    router.route('/yourunb-JSFE2023Q4/ecommerce/');
  }

  private processResponse(response: AuthResponse | AuthErrorResponse) {
    if (isAuthResponse(response)) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  }

  private saveResponse = (response: AuthResponse) => {
    this.saveAccessToken(response);
    this.saveCredential();
    this.saveClient(response);
    state.authState = AuthState.logged;
    return this;
  };

  private saveAccessToken(response: AuthResponse) {
    state.access_token = response;
  }

  private saveCredential() {
    lstorage.saveCredentials({ email: this.email, password: this.password });
  }

  private saveClient(response: AuthResponse) {
    getCustomer(response.access_token)
      .then((customer) => {
        if (isCustomer(customer)) state.customer = customer;
      })
      .catch((error) => dialog.show(error, 'warning'));
  }

  private handleError(response: AuthErrorResponse) {
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
    throw new Error(msg);
  }
}
