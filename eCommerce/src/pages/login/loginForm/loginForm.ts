import {
  compose,
  Validation,
  isToLong33,
  isPassLeast8,
  isPassContainNumber,
  isPassContainLowercase,
  isPassContainUppercase,
  isNotContainWhitespaces,
  isEmailProperlyFormatted,
  isEmailContainDomainName,
} from '../../../components/helpers/validation-rules';
import { Dispatch } from '../../../modules/login/types';
import { LoginHeader } from './loginHeader/loginHeader';
import { Input } from '../../../components/baseInput/baseInput';
import { BaseComponent } from '../../../components/baseComponent';
import { Button } from '../../../components/basebutton/baseButton';
import { InputWithNotice } from '../../../components/inputWithNotice/inputWithNotice';

export class LoginForm extends BaseComponent {
  private dispatch: Dispatch;
  private inputEmail: InputWithNotice;
  private inputPass: InputWithNotice;
  private showPassword: Input;
  private isSubmitted = false;

  constructor(dispatch: Dispatch) {
    super({ tagName: 'div', classNames: 'form__conteiner' });
    this.dispatch = dispatch;
    const header = new LoginHeader();
    const labelEmail = new BaseComponent({
      tagName: 'label',
      textContent: 'Enter your email and password to login.',
      classNames: 'login-email__label',
    });
    this.inputEmail = new InputWithNotice({
      attribute: { name: 'name', value: 'email' },
      classNames: 'login-email__input',
    });
    this.inputPass = new InputWithNotice({
      attribute: { name: 'name', value: 'password' },
      classNames: 'login-password__input',
    });
    this.showPassword = new Input({
      attribute: { name: 'type', value: 'checkbox' },
    });
    const form = new BaseComponent({ tagName: 'form', classNames: 'login-form' });
    const button = new Button({ textContent: 'Login', classNames: 'login__btn-submit' });

    form.setAttribute({ name: 'novalidate', value: '' });
    this.inputEmail.setAttribute({ name: 'autocomplete', value: 'off' });
    this.inputEmail.setAttribute({ name: 'placeholder', value: 'e-mail' });
    this.inputPass.setAttribute({ name: 'placeholder', value: 'password' });
    this.inputPass.setAttribute({ name: 'autocomplete', value: 'off' });
    this.inputPass.setAttribute({ name: 'type', value: 'password' });
    this.showPassword.setAttribute({ name: 'hidden', value: '' });
    const labelCheckbox = new BaseComponent({ tagName: 'label', classNames: 'password-checkbox__label' });
    labelCheckbox.insertChild(this.showPassword);
    const passwordContainer = new BaseComponent({ tagName: 'div', classNames: 'password__conteiner' });
    passwordContainer.insertChildren([this.inputPass, labelCheckbox]);
    form.insertChildren([header, labelEmail, this.inputEmail, passwordContainer, button]);
    this.inputEmail.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.inputPass.getElement().addEventListener('keyup', () => this.handleChangeInput());
    labelCheckbox.getElement().addEventListener('change', () => this.handleCheckbox());
    form.getElement().addEventListener('submit', (e) => this.handleSubmit(e));
    this.insertChild(form);
  }

  public resetForm(): void {
    this.inputEmail.value = '';
    this.inputPass.value = '';
  }

  private handleCheckbox(): void {
    this.inputPass.type = this.inputPass.type === 'password' ? 'text' : 'password';
  }

  private handleSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this.isSubmitted = true;
    if (!this.validateForm()) return;
    this.dispatch({
      type: 'login',
      payload: {
        email: this.inputEmail.value,
        password: this.inputPass.value,
      },
    });
  }

  private handleChangeInput(): void {
    if (this.isSubmitted) this.validateForm();
  }

  private validateForm(): boolean {
    const isValidLogin = this.validateEmail(this.inputEmail.value);
    const isValidPassword = this.validatePassword(this.inputPass.value);
    this.inputEmail.showNotice(isValidLogin.errors);
    this.inputPass.showNotice(isValidPassword.errors);
    return isValidLogin.validate && isValidPassword.validate;
  }

  private validateEmail(input: string): Validation {
    return compose(
      isEmailProperlyFormatted,
      isNotContainWhitespaces,
      isEmailContainDomainName
    )({ subject: input, validate: true, errors: [] });
  }

  private validatePassword(input: string): Validation {
    return compose(
      isPassLeast8,
      isPassContainUppercase,
      isPassContainLowercase,
      isPassContainNumber,
      isNotContainWhitespaces,
      isToLong33
    )({ subject: input, validate: true, errors: [] });
  }
}
