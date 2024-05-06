import './pageLogin.sass';
import { Dispatch } from '../../modules/login/types';
import { BaseComponent } from '../../components/baseComponent';
import { LoginForm } from './loginForm/loginForm';

export class PageLogin extends BaseComponent {
  constructor(dispatch: Dispatch) {
    super({ tagName: 'article', classNames: 'page-login-container' });
    this.insertChild(new LoginForm(dispatch));
  }
}
