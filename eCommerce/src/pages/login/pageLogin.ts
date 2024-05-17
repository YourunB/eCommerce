import './pageLogin.sass';
import { LoginForm } from './loginForm/loginForm';
import { Dispatch } from '../../modules/login/types';
import { BaseComponent } from '../../components/baseComponent';

export class PageLogin extends BaseComponent {
  loginForm: LoginForm;

  constructor(dispatch: Dispatch) {
    super({ tagName: 'article', classNames: 'page-login-container' });
    this.loginForm = new LoginForm(dispatch);
    this.insertChild(this.loginForm);
  }

  public resetForm(): void {
    this.loginForm.resetForm();
  }
}
