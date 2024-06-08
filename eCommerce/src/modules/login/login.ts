import { router } from '../router';
import { MyCart } from '../cart/cart';
import state from '../../state/state';
import { AuthState } from '../../state/types';
import { Actions, AuthResponse } from './types';
import { PageLogin } from '../../pages/login/pageLogin';
import { AuthErrorResponse } from '@commercetools/platform-sdk';
import { Dialog } from '../../components/modalDialog/modalDialog';
import { createAnonymous, getAccessToken, meLogin } from '../api/auth';
import { LStorage, MSG_ERR_NO_DATA } from '../localStorage/localStorage';
import { isAuthResponse, isCustomerSignInResult } from '../../components/helpers/predicates';

const dialog = Dialog.getInstance();
const lstorage = new LStorage();
const cart = new MyCart();

export class Login {
  private page: PageLogin;
  private email = '';
  private password = '';

  constructor() {
    this.page = new PageLogin(this.dispatch);
  }

  public async createAnonymousCustomer() {
    return createAnonymous()
      .then(this.processAuthResponse)
      .then(this.saveAnonymousToken)
      .then(() => cart.create());
  }

  public isLogined() {
    return state.authState;
  }

  public getPage() {
    this.page.resetForm();
    return this.page.getElement();
  }

  public dispatch = (action: Actions) => {
    const { type } = action;
    this.email = action.payload.email;
    this.password = action.payload.password;

    switch (type) {
      case 'login':
        this.page.btnOFF();
        this.execute(this.email, this.password)
          .catch(() => {})
          .finally(() => this.page.btnON());
        break;
    }
  };

  public async execute(email?: string, password?: string): Promise<string> {
    try {
      if (!email || !password) {
        const credential = await lstorage.getCredentials();
        if (typeof credential === 'string') return Promise.reject('');
        this.email = credential.email;
        this.password = credential.password;
      } else {
        this.email = email;
        this.password = password;
      }

      const response = await meLogin(this.email, this.password);
      if (isCustomerSignInResult(response)) {
        state.authState = AuthState.logged;
        state.customer = response.customer;
        if (response.cart) cart.cart = response.cart;
        this.saveCredential();
        await this.getNewToken(this.email, this.password);
        this.redirect();
      } else {
        throw new Error(response.message);
      }
      return Promise.resolve(`${response.customer.firstName} is logined`);
    } catch (error) {
      error !== MSG_ERR_NO_DATA && dialog.show(`${error}`, 'warning');
      return Promise.reject(`${error}`);
    }
  }

  public async getNewToken(email: string, password: string): Promise<AuthResponse | AuthErrorResponse> {
    const token = await getAccessToken(email, password);
    if (isAuthResponse(token)) state.access_token = token;
    return token;
  }

  private redirect() {
    router.route('/yourunb-JSFE2023Q4/ecommerce/');
  }

  private processAuthResponse(response: AuthResponse | AuthErrorResponse) {
    if (isAuthResponse(response)) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  }

  private saveAnonymousToken(response: AuthResponse) {
    state.authState = AuthState.anonymous;
    state.access_token = response;
    [, state.anonymousId] = response.scope.split('anonymous_id:');
  }

  private saveCredential() {
    lstorage.saveCredentials({ email: this.email, password: this.password });
  }
}
