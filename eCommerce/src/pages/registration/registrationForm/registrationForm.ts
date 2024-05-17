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
  isEnoughOlder,
  isRightPostalCode,
  isContainOnlyLetters,
  isCorrectKeyboard,
  isContainAtLeastOneLetters,
  isRightCountry,
} from '../../../components/helpers/validation-rules';
import './registrationForm.sass';
import { router } from '../../../modules/router';
import { AddressForm } from './adressForm/adressForm';
import { MyCustomerDraft } from '@commercetools/platform-sdk';
import { BaseComponent } from '../../../components/baseComponent';
import { Button } from '../../../components/basebutton/baseButton';
import { Dialog } from '../../../components/modalDialog/modalDialog';
import { LStorage } from '../../../modules/localStorage/localStorage';
import { createAnonymous, createCustomer } from '../../../modules/api/auth';
import { InputWithNotice } from '../../../components/inputWithNotice/inputWithNotice';
import { PageRegistrationPropsType } from '../../../modules/registration/helpers/types';
import { isAuthResponse, isCustomerSignInResult, isErrorResponse } from '../../../components/helpers/predicates';
import { Input } from '../../../components/baseInput/baseInput';

const dialog = Dialog.getInstance();
const lstorage = new LStorage();

export class RegistrationForm extends BaseComponent {
  private isSubmitted: boolean;
  private inputEmail: InputWithNotice;
  private inputPass: InputWithNotice;
  private inputFirstName: InputWithNotice;
  private inputLastName: InputWithNotice;
  private inputDateOfBirth: InputWithNotice;
  private addressForm: AddressForm;
  private button: Button;
  private showPassword: BaseComponent;

  constructor(props: PageRegistrationPropsType) {
    super({ tagName: 'form', classNames: 'registration-form-container', ...props });
    this.isSubmitted = false;
    this.getElement().addEventListener('submit', (e) => this.handleSubmit(e));

    // email
    this.inputEmail = new InputWithNotice({
      attribute: { name: 'name', value: 'email' },
      classNames: 'registration-email__input',
      parentNode: this.element,
    });
    this.inputEmail.notice.setClassName('registration-notice');
    this.inputEmail.setAttribute({ name: 'autofocus', value: '' });
    this.inputEmail.setAttribute({ name: 'autocomplete', value: '' });
    this.inputEmail.setAttribute({ name: 'placeholder', value: 'e-mail' });
    this.inputEmail.getElement().addEventListener('keyup', () => this.handleChangeInput());

    // password
    this.inputPass = new InputWithNotice({
      attribute: { name: 'name', value: 'password' },
      classNames: 'registration-password__input',
    });
    this.inputPass.notice.setClassName('registration-notice_password');
    this.inputPass.setAttribute({ name: 'placeholder', value: 'password' });
    this.inputPass.setAttribute({ name: 'autocomplete', value: '' });
    this.inputPass.setAttribute({ name: 'type', value: 'password' });
    this.inputPass.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.showPassword = new Input({
      attribute: { name: 'type', value: 'checkbox' },
    });
    this.showPassword.setAttribute({ name: 'hidden', value: '' });
    const labelCheckbox = new BaseComponent({ tagName: 'label', classNames: 'password-checkbox__label' });
    labelCheckbox.insertChild(this.showPassword);
    const passwordContainer = new BaseComponent({
      tagName: 'div',
      classNames: 'password__container',
      parentNode: this.element,
    });
    passwordContainer.insertChildren([this.inputPass, labelCheckbox]);
    labelCheckbox.getElement().addEventListener('change', () => this.handleCheckbox());

    // first name
    this.inputFirstName = new InputWithNotice({
      attribute: { name: 'name', value: 'firstName' },
      classNames: 'registration-firstName__input',
      parentNode: this.element,
    });
    this.inputFirstName.notice.setClassName('registration-notice');
    this.inputFirstName.setAttribute({ name: 'placeholder', value: 'first name' });
    this.inputFirstName.setAttribute({ name: 'autocomplete', value: '' });
    this.inputFirstName.getElement().addEventListener('keyup', () => this.handleChangeInput());

    // last name
    this.inputLastName = new InputWithNotice({
      attribute: { name: 'name', value: 'lastName' },
      classNames: 'registration-lastName__input',
      parentNode: this.element,
    });
    this.inputLastName.notice.setClassName('registration-notice');
    this.inputLastName.setAttribute({ name: 'placeholder', value: 'last name' });
    this.inputLastName.setAttribute({ name: 'autocomplete', value: '' });
    this.inputLastName.getElement().addEventListener('keyup', () => this.handleChangeInput());

    // date of birth
    this.inputDateOfBirth = new InputWithNotice({
      attribute: { name: 'name', value: 'date of birth' },
      classNames: 'registration-dateOfBirth__input',
      parentNode: this.element,
    });
    this.inputDateOfBirth.notice.setClassName('registration-notice');
    this.inputDateOfBirth.setAttribute({ name: 'placeholder', value: 'date of birth' });
    this.inputDateOfBirth.getElement().addEventListener('focus', () => {
      this.inputDateOfBirth.setAttribute({ name: 'type', value: 'date' });
    });
    this.inputDateOfBirth.getElement().addEventListener('blur', () => {
      this.inputDateOfBirth.removeAttribute({ name: 'type' });
    });
    this.inputDateOfBirth.getElement().addEventListener('keyup', () => this.handleChangeInput());

    // address
    this.addressForm = new AddressForm({ parentNode: this.element });
    this.addressForm.inputCityBilling.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputCityShipping.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputStreetBilling.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputStreetShipping.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputPostalCodeBilling.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputPostalCodeShipping.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputCountryBilling.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputCountryShipping.getElement().addEventListener('keyup', () => this.handleChangeInput());

    this.button = new Button({
      textContent: 'register',
      classNames: 'registration__btn-submit',
      parentNode: this.element,
    });
  }
  private handleCheckbox(): void {
    this.inputPass.type = this.inputPass.type === 'password' ? 'text' : 'password';
  }

  private handleChangeInput(): void {
    if (this.isSubmitted) this.validateForm();
  }

  private createJSONfromForm(): MyCustomerDraft {
    let customerDraft: MyCustomerDraft = {
      email: this.inputEmail.value,
      password: this.inputPass.value,
      firstName: this.inputFirstName.value,
      lastName: this.inputLastName.value,
      dateOfBirth: this.inputDateOfBirth.value,
      addresses: [
        {
          country: this.addressForm.inputCountryShipping.value,
          streetName: this.addressForm.inputStreetShipping.value,
          postalCode: this.addressForm.inputPostalCodeShipping.value,
          city: this.addressForm.inputCityShipping.value,
        },
        {
          country: this.addressForm.inputCountryBilling.value,
          streetName: this.addressForm.inputStreetBilling.value,
          postalCode: this.addressForm.inputPostalCodeBilling.value,
          city: this.addressForm.inputCityBilling.value,
        },
      ],
    };
    if (this.addressForm.useAsDefaultShipping.getElement().checked) {
      customerDraft = { ...customerDraft, defaultShippingAddress: 0 };
    }
    if (this.addressForm.useAsDefaultBilling.getElement().checked) {
      customerDraft = { ...customerDraft, defaultBillingAddress: 1 };
    }
    return customerDraft;
  }

  handleSubmit = (e: SubmitEvent): void => {
    e.preventDefault();
    this.isSubmitted = true;
    if (!this.validateForm()) {
      return;
    }

    const newCustomerData = this.createJSONfromForm();
    createAnonymous() // TODO in Sprint3 createAnonymous should move to index.ts
      .then((result) => {
        if (isAuthResponse(result)) {
          const tokenAnonymous = result.access_token;
          createCustomer(newCustomerData, tokenAnonymous)
            .then((result) => {
              if (isCustomerSignInResult(result)) {
                dialog.show(`Welcome ${result.customer?.firstName || ''}!`);
                lstorage.saveCredentials({ email: this.inputEmail.value, password: this.inputPass.value });
                router.route('/yourunb-JSFE2023Q4/ecommerce/login');
              } else {
                this.showErrorMessage(result);
              }
            })
            .catch(this.showErrorMessage);
        }
      })
      .catch(this.showErrorMessage);
  };

  private showErrorMessage(error: unknown): void {
    if (isErrorResponse(error)) {
      const detailedErrorMessage = error.errors ? error.errors[0].detailedErrorMessage : '';
      if (detailedErrorMessage) {
        dialog.show(`${error.message} ${detailedErrorMessage}`, 'warning');
      }
      dialog.show(`${error.message}`, 'warning');
    }
  }

  private copyShippingToBilling(): void {
    this.addressForm.inputCountryBilling.value = this.addressForm.inputCountryShipping.value;
    this.addressForm.inputStreetBilling.value = this.addressForm.inputStreetShipping.value;
    this.addressForm.inputPostalCodeBilling.value = this.addressForm.inputPostalCodeShipping.value;
    this.addressForm.inputCityBilling.value = this.addressForm.inputCityShipping.value;
  }

  private validateForm(): boolean {
    if (this.addressForm.useAsBilling.getElement().checked) this.copyShippingToBilling();

    const isValidLogin = this.validateEmail(this.inputEmail.value);
    const isValidPassword = this.validatePassword(this.inputPass.value);
    const isValidFirstName = this.validateNamesAndCity(this.inputFirstName.value);
    const isValidLastName = this.validateNamesAndCity(this.inputLastName.value);
    const isValidDateOfBirth = this.validateDateOfBirth(this.inputDateOfBirth.value);
    const isValidCityShipping = this.validateNamesAndCity(this.addressForm.inputCityShipping.value);
    const isValidCityBilling = this.validateNamesAndCity(this.addressForm.inputCityBilling.value);
    const isValidStreetShipping = this.validateStreet(this.addressForm.inputStreetShipping.value);
    const isValidStreetBilling = this.validateStreet(this.addressForm.inputStreetBilling.value);
    const isValidPostalCodeShipping = this.validatePostalCode(this.addressForm.inputPostalCodeShipping.value);
    const isValidPostalCodeBilling = this.validatePostalCode(this.addressForm.inputPostalCodeBilling.value);
    const isValidCountryShipping = this.validateCountry(this.addressForm.inputCountryShipping.value);
    const isValidCountryBilling = this.validateCountry(this.addressForm.inputCountryBilling.value);
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
      isEmailContainDog
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

  private validateNamesAndCity(input: string): Validation {
    return compose(
      isNotContainWhitespaces,
      isContainAtLeastOneLetters,
      isContainOnlyLetters
    )({ subject: input, validate: true, errors: [] });
  }
  private validateDateOfBirth(input: string): Validation {
    return compose(isNotEmpty, isEnoughOlder)({ subject: input, validate: true, errors: [] });
  }
  private validateStreet(input: string): Validation {
    return compose(
      isNotContainWhitespaces,
      isContainAtLeastOneLetters,
      isCorrectKeyboard
    )({ subject: input, validate: true, errors: [] });
  }
  private validatePostalCode(input: string): Validation {
    return isRightPostalCode({ subject: input, validate: true, errors: [] });
  }
  private validateCountry(input: string): Validation {
    return compose(isNotEmpty, isRightCountry)({ subject: input, validate: true, errors: [] });
  }
}
