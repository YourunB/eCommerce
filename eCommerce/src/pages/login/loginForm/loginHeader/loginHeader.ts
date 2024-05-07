import './loginHeader.sass';
import { BaseComponent } from '../../../../components/baseComponent';
import { Dispatch } from '../../../../modules/login/types';

export class LoginHeader extends BaseComponent {
  private dispatch: Dispatch;

  constructor(dispatch: Dispatch) {
    super({ tagName: 'div', classNames: 'login__header' });
    this.dispatch = dispatch;

    const spanLogin = new BaseComponent({ tagName: 'span', textContent: 'Login', classNames: 'header__login' });
    const spanLine = new BaseComponent({ tagName: 'span', textContent: '|', classNames: 'header_line' });
    const linkRegister = new BaseComponent({ tagName: 'a', textContent: 'Register', classNames: 'header_link' });
    linkRegister.getElement().addEventListener('click', (e) => this.handleClick(e));
    this.insertChildren([spanLogin, spanLine, linkRegister]);
  }

  private handleClick(e: Event): void {
    e.preventDefault();
    this.dispatch({ type: 'register', payload: { email: '', password: '' } });
  }
}
