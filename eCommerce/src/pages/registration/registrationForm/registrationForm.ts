import { BaseComponent } from '../../../components/baseComponent';

import { Button } from '../../../components/basebutton/baseButton';
import { PageRegistrationPropsType } from '../../../modules/registration/helpers/types';
import {
  Validation,
  compose,
  isEmailContainDog,
  isEmailContainDomainName,
  isEmailProperlyFormatted,
  isNotContainWhitespaces,
  isNotEmpty,
  isPassContainLowercase,
  isPassContainNumber,
  isPassContainUppercase,
  isPassLeast8,
  isToLong33,
} from '../../login/helpers/validation-rules';
import { InputWithNotice } from '../../login/inputWithNotice/inputWithNotice';
import { AddressForm } from './adressForm/adressForm';

import './registrationForm.sass';
import {
  isEnoughOlder,
  isNotContainSpecialCharactersAndNumbers,
  isRightPostalCode,
} from './validationRules/validationRules';

export class RegistrationForm extends BaseComponent {
  private isSubmitted: boolean;
  public inputEmail: InputWithNotice;
  public inputPass: InputWithNotice;
  public inputFirstName: InputWithNotice;
  public inputLastName: InputWithNotice;
  public inputDateOfBirth: InputWithNotice;
  public addressForm: AddressForm;
  public button: Button;

  constructor(props: PageRegistrationPropsType) {
    super({ tagName: 'div', classNames: 'registration-form-container', ...props });
    this.isSubmitted = false;

    // email
    this.inputEmail = new InputWithNotice({
      attribute: { name: 'name', value: 'email' },
      classNames: 'registration-email__input',
      parentNode: this.element,
    });
    this.inputEmail.setAttribute({ name: 'autofocus', value: '' });
    this.inputEmail.setAttribute({ name: 'autocomplete', value: '' });
    this.inputEmail.setAttribute({ name: 'placeholder', value: 'e-mail' });
    this.inputEmail.getElement().addEventListener('input', () => this.clearNotice(this.inputEmail));

    // password
    this.inputPass = new InputWithNotice({
      attribute: { name: 'name', value: 'password' },
      classNames: 'registration-password__input',
      parentNode: this.element,
    });
    this.inputPass.setAttribute({ name: 'placeholder', value: 'password' });
    this.inputPass.setAttribute({ name: 'autocomplete', value: '' });
    this.inputPass.setAttribute({ name: 'type', value: 'password' });
    this.inputPass.getElement().addEventListener('input', () => this.clearNotice(this.inputPass));

    // first name
    this.inputFirstName = new InputWithNotice({
      attribute: { name: 'name', value: 'firstName' },
      classNames: 'registration-firstName__input',
      parentNode: this.element,
    });
    this.inputFirstName.setAttribute({ name: 'placeholder', value: 'first name' });
    this.inputFirstName.setAttribute({ name: 'autocomplete', value: '' });
    this.inputFirstName.getElement().addEventListener('input', () => this.clearNotice(this.inputFirstName));

    // last name
    this.inputLastName = new InputWithNotice({
      attribute: { name: 'name', value: 'lastName' },
      classNames: 'registration-lastName__input',
      parentNode: this.element,
    });
    this.inputLastName.setAttribute({ name: 'placeholder', value: 'last name' });
    this.inputLastName.setAttribute({ name: 'autocomplete', value: '' });
    this.inputLastName.getElement().addEventListener('input', () => this.clearNotice(this.inputLastName));

    // date of birth
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
    this.inputDateOfBirth.getElement().addEventListener('input', () => this.clearNotice(this.inputDateOfBirth));

    // address
    this.addressForm = new AddressForm({ parentNode: this.element });
    this.addressForm.inputCityBilling
      .getElement()
      .addEventListener('input', () => this.clearNotice(this.addressForm.inputCityBilling));
    this.addressForm.inputCityShipping
      .getElement()
      .addEventListener('input', () => this.clearNotice(this.addressForm.inputCityShipping));
    this.addressForm.inputStreetBilling
      .getElement()
      .addEventListener('input', () => this.clearNotice(this.addressForm.inputStreetBilling));
    this.addressForm.inputStreetShipping
      .getElement()
      .addEventListener('input', () => this.clearNotice(this.addressForm.inputStreetShipping));
    this.addressForm.inputPostalCodeBilling
      .getElement()
      .addEventListener('input', () => this.clearNotice(this.addressForm.inputPostalCodeBilling));
    this.addressForm.inputPostalCodeShipping
      .getElement()
      .addEventListener('input', () => this.clearNotice(this.addressForm.inputPostalCodeShipping));
    this.addressForm.inputCountryBilling
      .getElement()
      .addEventListener('input', () => this.clearNotice(this.addressForm.inputCountryBilling));
    this.addressForm.inputCountryShipping
      .getElement()
      .addEventListener('input', () => this.clearNotice(this.addressForm.inputCountryShipping));

    this.button = new Button({
      textContent: 'register',
      classNames: 'registration__btn-submit',
      parentNode: this.element,
    });

    this.button.getElement().addEventListener('click', this.handleSubmit);
  }

  handleSubmit = (e: MouseEvent): void => {
    e.preventDefault();
    this.isSubmitted = true;
    if (!this.validateForm()) {
      return;
    }
  };

  private validateForm(): boolean {
    const isValidLogin = this.validateEmail(this.inputEmail.value);
    const isValidPassword = this.validatePassword(this.inputPass.value);
    const isValidFirstName = this.validateNames(this.inputFirstName.value);
    const isValidLastName = this.validateNames(this.inputLastName.value);
    const isValidDateOfBirth = this.validateDateOfBirth(this.inputDateOfBirth.value);
    const isValidCityShipping = this.validateCity(this.addressForm.inputCityShipping.value);
    const isValidCityBilling = this.validateCity(this.addressForm.inputCityBilling.value);
    const isValidStreetShipping = this.validateStreet(this.addressForm.inputStreetShipping.value);
    const isValidStreetBilling = this.validateStreet(this.addressForm.inputStreetBilling.value);
    const isValidPostalCodeShipping = this.validatePostalCode(this.addressForm.inputPostalCodeShipping.value);
    const isValidPostalCodeBilling = this.validatePostalCode(this.addressForm.inputPostalCodeBilling.value);
    const isValidCountryShipping = this.validateStreet(this.addressForm.inputCountryShipping.value);
    const isValidCountryBilling = this.validateStreet(this.addressForm.inputCountryBilling.value);
    this.inputEmail.showNotice(isValidLogin.errors);
    this.inputPass.showNotice(isValidPassword.errors);
    this.inputFirstName.showNotice(isValidFirstName.errors);
    this.inputLastName.showNotice(isValidLastName.errors);
    this.inputDateOfBirth.showNotice(isValidDateOfBirth.errors);
    this.addressForm.inputCityShipping.showNotice(isValidCityShipping.errors);
    this.addressForm.inputCityBilling.showNotice(isValidCityBilling.errors);
    this.addressForm.inputStreetShipping.showNotice(isValidStreetShipping.errors);
    this.addressForm.inputStreetBilling.showNotice(isValidStreetBilling.errors);
    this.addressForm.inputPostalCodeShipping.showNotice(isValidPostalCodeShipping.errors);
    this.addressForm.inputPostalCodeBilling.showNotice(isValidPostalCodeBilling.errors);
    this.addressForm.inputCountryShipping.showNotice(isValidCountryShipping.errors);
    this.addressForm.inputCountryBilling.showNotice(isValidCountryBilling.errors);

    return (
      isValidLogin.validate &&
      isValidPassword.validate &&
      isValidFirstName.validate &&
      isValidLastName.validate &&
      isValidDateOfBirth.validate &&
      isValidCityBilling.validate &&
      isValidCityShipping.validate &&
      isValidCountryBilling.validate &&
      isValidCountryShipping.validate &&
      isValidPostalCodeBilling.validate &&
      isValidPostalCodeShipping.validate &&
      isValidStreetBilling.validate &&
      isValidStreetShipping.validate
    );
  }

  private validateEmail(input: string): Validation {
    return compose(
      isEmailProperlyFormatted,
      isNotContainWhitespaces,
      isEmailContainDomainName,
      isEmailContainDog,
      isNotEmpty
    )({ subject: input, validate: true, errors: [] });
  }

  private validatePassword(input: string): Validation {
    return compose(
      isPassLeast8,
      isPassContainUppercase,
      isPassContainLowercase,
      isPassContainNumber,
      isNotContainWhitespaces,
      isNotEmpty,
      isToLong33
    )({ subject: input, validate: true, errors: [] });
  }

  private validateNames(input: string): Validation {
    return compose(isNotEmpty, isNotContainSpecialCharactersAndNumbers)({ subject: input, validate: true, errors: [] });
  }
  private validateDateOfBirth(input: string): Validation {
    return compose(isNotEmpty, isEnoughOlder)({ subject: input, validate: true, errors: [] });
  }
  private validateCity(input: string): Validation {
    return compose(isNotEmpty, isNotContainSpecialCharactersAndNumbers)({ subject: input, validate: true, errors: [] });
  }
  private validateStreet(input: string): Validation {
    return compose(isNotEmpty)({ subject: input, validate: true, errors: [] });
  }
  private validatePostalCode(input: string): Validation {
    return compose(isRightPostalCode)({ subject: input, validate: true, errors: [] });
  }
  private clearNotice(input: InputWithNotice) {
    if (input.notice.getTextContent()) {
      input.notice.setTextContent('');
    }
  }
}
