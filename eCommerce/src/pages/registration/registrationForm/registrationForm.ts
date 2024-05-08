import { BaseComponent } from '../../../components/baseComponent';
import { Button } from '../../../components/basebutton/baseButton';
import { PageRegistrationPropsType } from '../../../modules/registration/helpers/types';
import { InputWithNotice } from '../../login/inputWithNotice/inputWithNotice';
import { AddressForm } from './adressForm/adressForm';

import './registrationForm.sass';

export class RegistrationForm extends BaseComponent {
  public inputEmail: InputWithNotice;
  public inputPass: InputWithNotice;
  public inputFirstName: InputWithNotice;
  public inputLastName: InputWithNotice;
  public inputDateOfBirth: InputWithNotice;
  public addressForm: AddressForm;
  public button: Button;

  constructor(props: PageRegistrationPropsType) {
    super({ tagName: 'div', classNames: 'registration-form-container', ...props });

    this.inputEmail = new InputWithNotice({
      attribute: { name: 'name', value: 'email' },
      classNames: 'registration-email__input',
      parentNode: this.element,
    });
    this.inputEmail.setAttribute({ name: 'autofocus', value: '' });
    this.inputEmail.setAttribute({ name: 'autocomplete', value: '' });
    this.inputEmail.setAttribute({ name: 'placeholder', value: 'e-mail' });

    this.inputPass = new InputWithNotice({
      attribute: { name: 'name', value: 'password' },
      classNames: 'registration-password__input',
      parentNode: this.element,
    });
    this.inputPass.setAttribute({ name: 'placeholder', value: 'password' });
    this.inputPass.setAttribute({ name: 'autocomplete', value: '' });
    this.inputPass.setAttribute({ name: 'type', value: 'password' });

    this.inputFirstName = new InputWithNotice({
      attribute: { name: 'name', value: 'firstName' },
      classNames: 'registration-firstName__input',
      parentNode: this.element,
    });
    this.inputFirstName.setAttribute({ name: 'placeholder', value: 'first name' });
    this.inputFirstName.setAttribute({ name: 'autocomplete', value: '' });

    this.inputLastName = new InputWithNotice({
      attribute: { name: 'name', value: 'lastName' },
      classNames: 'registration-lastName__input',
      parentNode: this.element,
    });
    this.inputLastName.setAttribute({ name: 'placeholder', value: 'last name' });
    this.inputLastName.setAttribute({ name: 'autocomplete', value: '' });

    this.inputDateOfBirth = new InputWithNotice({
      attribute: { name: 'name', value: 'date of birth' },
      classNames: 'registration-dateOfBirth__input',
      parentNode: this.element,
    });
    this.inputDateOfBirth.setAttribute({ name: 'placeholder', value: 'date of birth' });
    this.inputDateOfBirth.getElement().addEventListener('focus', () => {
      this.inputDateOfBirth.setAttribute({ name: 'type', value: 'date' });
    });
    this.inputDateOfBirth.getElement().addEventListener('blur', () => {
      this.inputDateOfBirth.removeAttribute({ name: 'type' });
    });

    this.addressForm = new AddressForm({ parentNode: this.element });

    this.button = new Button({
      textContent: 'register',
      classNames: 'registration__btn-submit',
      parentNode: this.element,
    });
  }
}
