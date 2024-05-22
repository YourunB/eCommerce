import {
  compose,
  Validation,
  isNotEmpty,
  isToLong33,
  isPassLeast8,
  isEnoughOlder,
  isRightCountry,
  isEmailContainDog,
  isCorrectKeyboard,
  isRightPostalCode,
  isPassContainNumber,
  isContainOnlyLetters,
  isPassContainUppercase,
  isPassContainLowercase,
  isNotContainWhitespaces,
  isEmailProperlyFormatted,
  isEmailContainDomainName,
  isContainAtLeastOneLetters,
} from '../../../components/helpers/validation-rules';
import './profileForm.sass';
//import { router } from '../../../modules/router';
//import { Login } from '../../../modules/login/login';
import { AddressForm } from './adressForm/adressForm';
import { MyCustomerDraft } from '@commercetools/platform-sdk';
import { Input } from '../../../components/baseInput/baseInput';
import { BaseComponent } from '../../../components/baseComponent';
import { Button } from '../../../components/basebutton/baseButton';
import { Dialog } from '../../../components/modalDialog/modalDialog';
//import { LStorage } from '../../../modules/localStorage/localStorage';
//import { createAnonymous, createCustomer } from '../../../modules/api/auth';
import { InputWithNotice } from '../../../components/inputWithNotice/inputWithNotice';
import { PageProfilePropsType } from '../../../modules/profil/helpers/types';
import { isErrorResponse } from '../../../components/helpers/predicates'; // remove isAuthResponse, isCustomerSignInResult,
import state from '../../../state/state';

const dialog = Dialog.getInstance();
//const lstorage = new LStorage();
//const login = new Login();

export class ProfileForm extends BaseComponent {
  private isSubmitted: boolean;
  private inputEmail: InputWithNotice;
  private inputPass: InputWithNotice;
  private inputFirstName: InputWithNotice;
  private inputLastName: InputWithNotice;
  private inputDateOfBirth: InputWithNotice;
  private addressForm: AddressForm;
  private btnEdit: Button;
  private btnCancel: Button;
  private btnSave: Button;
  private showPassword: BaseComponent;
  private label: BaseComponent;
  private btnsContainer: BaseComponent;

  constructor(props: PageProfilePropsType) {
    super({ tagName: 'form', classNames: 'profile-form-container', ...props });
    this.isSubmitted = false;
    //this.getElement().addEventListener('submit', (e) => this.handleSubmit(e));
    console.log(state.customer);
    // email
    this.label = new BaseComponent({
      tagName: 'label',
      textContent: 'Email:',
      classNames: 'pofile-label',
      parentNode: this.element,
    });
    this.inputEmail = new InputWithNotice({
      attribute: { name: 'name', value: 'email' },
      classNames: 'profile-email__input',
      parentNode: this.element,
    });
    this.inputEmail.notice.setClassName('profile-notice');
    this.inputEmail.setAttribute({ name: 'autocomplete', value: 'off' });
    this.inputEmail.setAttribute({ name: 'placeholder', value: 'e-mail' });
    this.inputEmail.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.inputEmail.getElement().value = state.customer.email || '';

    // password
    this.label = new BaseComponent({
      tagName: 'label',
      textContent: 'Password:',
      classNames: 'pofile-label',
      parentNode: this.element,
    });
    this.inputPass = new InputWithNotice({
      attribute: { name: 'name', value: 'password' },
      classNames: 'profile-password__input',
    });
    this.inputPass.notice.setClassName('profile-notice_password');
    this.inputPass.setAttribute({ name: 'placeholder', value: 'password' });
    this.inputPass.setAttribute({ name: 'autocomplete', value: 'off' });
    this.inputPass.setAttribute({ name: 'type', value: 'password' });
    this.inputPass.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.inputPass.getElement().value = state.customer.password || '';
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
    this.label = new BaseComponent({
      tagName: 'label',
      textContent: 'First name:',
      classNames: 'pofile-label',
      parentNode: this.element,
    });
    this.inputFirstName = new InputWithNotice({
      attribute: { name: 'name', value: 'firstName' },
      classNames: 'profile-firstName__input',
      parentNode: this.element,
    });
    this.inputFirstName.notice.setClassName('profile-notice');
    this.inputFirstName.setAttribute({ name: 'placeholder', value: 'first name' });
    this.inputFirstName.setAttribute({ name: 'autocomplete', value: 'off' });
    this.inputFirstName.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.inputFirstName.getElement().value = state.customer.firstName || '';

    // last name
    this.label = new BaseComponent({
      tagName: 'label',
      textContent: 'Last name:',
      classNames: 'pofile-label',
      parentNode: this.element,
    });
    this.inputLastName = new InputWithNotice({
      attribute: { name: 'name', value: 'lastName' },
      classNames: 'profile-lastName__input',
      parentNode: this.element,
    });
    this.inputLastName.notice.setClassName('profile-notice');
    this.inputLastName.setAttribute({ name: 'placeholder', value: 'last name' });
    this.inputLastName.setAttribute({ name: 'autocomplete', value: 'off' });
    this.inputLastName.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.inputLastName.getElement().value = state.customer.lastName || '';

    // date of birth
    this.label = new BaseComponent({
      tagName: 'label',
      textContent: 'Birthday:',
      classNames: 'pofile-label',
      parentNode: this.element,
    });
    this.inputDateOfBirth = new InputWithNotice({
      attribute: { name: 'name', value: 'date of birth' },
      classNames: 'profile-dateOfBirth__input',
      parentNode: this.element,
    });
    this.inputDateOfBirth.notice.setClassName('profile-notice');
    this.inputDateOfBirth.setAttribute({ name: 'placeholder', value: 'date of birth' });
    this.inputDateOfBirth.getElement().addEventListener('focus', () => {
      this.inputDateOfBirth.setAttribute({ name: 'type', value: 'date' });
    });
    this.inputDateOfBirth.getElement().addEventListener('blur', () => {
      this.inputDateOfBirth.removeAttribute({ name: 'type' });
    });
    this.inputDateOfBirth.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.inputDateOfBirth.getElement().value = state.customer.dateOfBirth || '';

    // address
    this.addressForm = new AddressForm({ parentNode: this.element });
    this.addressForm.inputStreetShipping.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputStreetShipping.getElement().value = state.customer.addresses[0].streetName || '';
    this.addressForm.inputStreetBilling.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputStreetBilling.getElement().value = state.customer.addresses[1].streetName || '';
    this.addressForm.inputCityShipping.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputCityShipping.getElement().value = state.customer.addresses[0].city || '';
    this.addressForm.inputCityBilling.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputCityBilling.getElement().value = state.customer.addresses[1].city || '';
    this.addressForm.inputPostalCodeShipping.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputPostalCodeShipping.getElement().value = state.customer.addresses[0].postalCode || '';
    this.addressForm.inputPostalCodeBilling.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputPostalCodeBilling.getElement().value = state.customer.addresses[1].postalCode || '';
    this.addressForm.inputCountryShipping.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputCountryShipping.getElement().value = state.customer.addresses[0].country || '';
    this.addressForm.inputCountryBilling.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputCountryBilling.getElement().value = state.customer.addresses[1].country || '';

    //edit btn
    this.btnEdit = new Button({
      textContent: 'Edit',
      classNames: 'profile__btn',
      parentNode: this.element,
    });

    this.btnsContainer = new BaseComponent({
      tagName: 'div',
      classNames: ['profile-btns-container', 'uvisible'],
      parentNode: this.element,
    });

    //cancel btn
    this.btnCancel = new Button({
      textContent: 'Cancel',
      classNames: 'profile__btn',
      parentNode: this.btnsContainer.getElement(),
    });

    //save btn
    this.btnSave = new Button({
      textContent: 'Save',
      classNames: 'profile__btn',
      parentNode: this.btnsContainer.getElement(),
    });

    this.btnEdit.getElement().addEventListener('click', (event) => {
      event.preventDefault();
      this.btnEdit.getElement().classList.add('uvisible');
      this.btnsContainer.getElement().classList.remove('uvisible');
    });

    this.btnCancel.getElement().addEventListener('click', (event) => {
      event.preventDefault();
      this.btnsContainer.getElement().classList.add('uvisible');
      this.btnEdit.getElement().classList.remove('uvisible');
    });

    this.btnSave.getElement().addEventListener('click', (event) => {
      event.preventDefault();
      this.btnsContainer.getElement().classList.add('uvisible');
      this.btnEdit.getElement().classList.remove('uvisible');
      console.log('save...');
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
  /*
  handleSubmit = (e: SubmitEvent): void => {
    e.preventDefault();
    this.isSubmitted = true;
    if (!this.validateForm()) {
      return;
    }

    const newCustomerData = this.createJSONfromForm();
    this.button.off();
    createAnonymous()
      .then((result) => {
        if (isAuthResponse(result)) {
          const tokenAnonymous = result.access_token;
          createCustomer(newCustomerData, tokenAnonymous)
            .then((result) => {
              if (isCustomerSignInResult(result)) {
                dialog.show(`Welcome ${result.customer?.firstName || ''}!`);
                lstorage
                  .saveCredentials({ email: this.inputEmail.value, password: this.inputPass.value })
                  .then(() =>
                    login
                      .execute(this.inputEmail.value, this.inputPass.value)
                      .then(() => router.route('/yourunb-JSFE2023Q4/ecommerce/'))
                  );
              } else {
                this.showErrorMessage(result);
              }
            })
            .catch(this.showErrorMessage);
        }
      })
      .catch(this.showErrorMessage)
      .finally(() => this.button.on());
  };
  */
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
    this.addressForm.inputCountryBilling.value = 'this.addressForm.inputCountryShipping.value';
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
