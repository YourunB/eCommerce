import './loginHeader.sass';
import { BaseComponent } from '../../../../components/baseComponent';

export class LoginHeader extends BaseComponent {
  constructor() {
    super({ tagName: 'div', classNames: 'login__header' });

    const spanLogin = new BaseComponent({ tagName: 'span', textContent: 'Login', classNames: 'header__login' });
    this.insertChildren([spanLogin]);
  }
}
