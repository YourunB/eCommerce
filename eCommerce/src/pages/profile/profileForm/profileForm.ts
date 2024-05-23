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
import { AddressForm } from './adressForm/adressForm';
import { Customer } from '@commercetools/platform-sdk';
import { Input } from '../../../components/baseInput/baseInput';
import { BaseComponent } from '../../../components/baseComponent';
import { Button } from '../../../components/basebutton/baseButton';
import { Dialog } from '../../../components/modalDialog/modalDialog';
//import { LStorage } from '../../../modules/localStorage/localStorage';
import { updateCustomerApi } from '../../../modules/api/auth';
import { InputWithNotice } from '../../../components/inputWithNotice/inputWithNotice';
import { PageProfilePropsType } from '../../../modules/profil/helpers/types';
import { isErrorResponse } from '../../../components/helpers/predicates'; // remove isAuthResponse, isCustomerSignInResult,
import state from '../../../state/state';

const dialog = Dialog.getInstance();
//const lstorage = new LStorage();

export class ProfileForm extends BaseComponent {
  private isSubmitted: boolean;
  private inputEmail: InputWithNotice;
  private inputPassOld: InputWithNotice;
  private inputPassNew: InputWithNotice;
  private inputFirstName: InputWithNotice;
  private inputLastName: InputWithNotice;
  private inputDateOfBirth: InputWithNotice;
  private addressForm: AddressForm;
  private btnEditProfile: Button;
  private btnCancelProfile: Button;
  private btnSaveProfile: Button;
  private btnEditPass: Button;
  private btnEditAddress: Button;
  private showPassword: BaseComponent;
  private label: BaseComponent;
  private btnsContainerSaveEdit: BaseComponent;
  private btnsContainerOpenEdit: BaseComponent;
  private addressContainer: BaseComponent;
  private overlay: BaseComponent;
  private modalEditPass: BaseComponent;
  private btnsPassContainer: BaseComponent;
  private btnCancelPass: BaseComponent;
  private btnSavePass: BaseComponent;
  private msg: BaseComponent;

  constructor(props: PageProfilePropsType) {
    super({ tagName: 'form', classNames: 'profile-form-container', ...props });
    this.isSubmitted = false;
    //this.getElement().addEventListener('submit', (e) => this.handleSubmit(e));
    console.log(state.customer, state.access_token.access_token);
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

    //succes
    this.msg = new BaseComponent({
      tagName: 'div',
      classNames: ['msg-modal'],
      textContent: 'Succes',
      parentNode: this.element,
    });

    //overlay
    this.overlay = new BaseComponent({
      tagName: 'div',
      classNames: ['overlay'],
      parentNode: this.element,
    });

    // password
    this.modalEditPass = new BaseComponent({
      tagName: 'div',
      classNames: ['modal-pass'],
      parentNode: this.element,
    });

    this.label = new BaseComponent({
      tagName: 'h3',
      textContent: 'Edit Password',
      classNames: 'modal-pass__title',
      parentNode: this.modalEditPass.getElement(),
    });

    this.label = new BaseComponent({
      tagName: 'label',
      textContent: 'Old password:',
      classNames: 'pofile-label',
      parentNode: this.modalEditPass.getElement(),
    });
    this.inputPassOld = new InputWithNotice({
      attribute: { name: 'name', value: 'password' },
      classNames: ['profile-password__input', 'edit-mode'],
      parentNode: this.modalEditPass.getElement(),
    });
    this.inputPassOld.notice.setClassName('profile-notice_password');
    this.inputPassOld.setAttribute({ name: 'placeholder', value: 'password' });
    this.inputPassOld.setAttribute({ name: 'autocomplete', value: 'off' });
    this.inputPassOld.setAttribute({ name: 'type', value: 'password' });
    this.inputPassOld.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.showPassword = new Input({
      attribute: { name: 'type', value: 'checkbox' },
    });
    this.showPassword.setAttribute({ name: 'hidden', value: '' });
    const labelCheckboxOld = new BaseComponent({ tagName: 'label', classNames: 'password-checkbox__label' });
    labelCheckboxOld.insertChild(this.showPassword);
    const passwordContainerOld = new BaseComponent({
      tagName: 'div',
      classNames: 'password__container',
      parentNode: this.modalEditPass.getElement(),
    });
    passwordContainerOld.insertChildren([this.inputPassOld, labelCheckboxOld]);
    labelCheckboxOld.getElement().addEventListener('change', () => this.handleCheckboxOld());

    this.label = new BaseComponent({
      tagName: 'label',
      textContent: 'New password:',
      classNames: 'pofile-label',
      parentNode: this.modalEditPass.getElement(),
    });

    this.inputPassNew = new InputWithNotice({
      attribute: { name: 'name', value: 'password' },
      classNames: ['profile-password__input', 'edit-mode'],
      parentNode: this.modalEditPass.getElement(),
    });
    this.inputPassNew.notice.setClassName('profile-notice_password');
    this.inputPassNew.setAttribute({ name: 'placeholder', value: 'password' });
    this.inputPassNew.setAttribute({ name: 'autocomplete', value: 'off' });
    this.inputPassNew.setAttribute({ name: 'type', value: 'password' });
    this.inputPassNew.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.showPassword = new Input({
      attribute: { name: 'type', value: 'checkbox' },
    });
    this.showPassword.setAttribute({ name: 'hidden', value: '' });
    const labelCheckboxNew = new BaseComponent({ tagName: 'label', classNames: 'password-checkbox__label' });
    labelCheckboxNew.insertChild(this.showPassword);
    const passwordContainerNew = new BaseComponent({
      tagName: 'div',
      classNames: 'password__container',
      parentNode: this.modalEditPass.getElement(),
    });
    passwordContainerNew.insertChildren([this.inputPassNew, labelCheckboxNew]);
    labelCheckboxNew.getElement().addEventListener('change', () => this.handleCheckboxNew());

    this.btnsPassContainer = new BaseComponent({
      tagName: 'div',
      classNames: ['profile-btns-container'],
      parentNode: this.modalEditPass.getElement(),
    });

    //cancel edit profile btn
    this.btnCancelPass = new Button({
      textContent: 'Cancel',
      classNames: 'profile__btn',
      parentNode: this.btnsPassContainer.getElement(),
    });

    //save edit profile btn
    this.btnSavePass = new Button({
      textContent: 'Save',
      classNames: 'profile__btn',
      parentNode: this.btnsPassContainer.getElement(),
    });

    // address
    this.addressContainer = new BaseComponent({
      tagName: 'h3',
      classNames: ['profile-header'],
      textContent: 'Your addresses',
      parentNode: this.element,
    });

    this.addressContainer = new BaseComponent({
      tagName: 'div',
      classNames: ['addresses-container'],
      parentNode: this.element,
    });

    this.btnSavePass.getElement().addEventListener('click', (event) => {
      event.preventDefault();
      this.overlay.getElement().classList.remove('overlay_show');
      this.modalEditPass.getElement().classList.remove('modal-pass_show');
    });

    this.btnCancelPass.getElement().addEventListener('click', (event) => {
      event.preventDefault();
      this.overlay.getElement().classList.remove('overlay_show');
      this.modalEditPass.getElement().classList.remove('modal-pass_show');
    });

    this.addressForm = new AddressForm({ parentNode: this.element });
    this.addressForm.inputStreetShipping.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputStreetBilling.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputCityShipping.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputCityBilling.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputPostalCodeShipping.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputPostalCodeBilling.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputCountryShipping.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputCountryBilling.getElement().addEventListener('keyup', () => this.handleChangeInput());

    this.btnsContainerOpenEdit = new BaseComponent({
      tagName: 'div',
      classNames: ['profile-btns-container'],
      parentNode: this.element,
    });

    //edit profile btn
    this.btnEditProfile = new Button({
      textContent: 'Edit profile',
      classNames: 'profile__btn',
      parentNode: this.btnsContainerOpenEdit.getElement(),
    });

    //edit pass btn
    this.btnEditPass = new Button({
      textContent: 'Edit password',
      classNames: 'profile__btn',
      parentNode: this.btnsContainerOpenEdit.getElement(),
    });

    //edit adresses btn
    this.btnEditAddress = new Button({
      textContent: 'Edit address',
      classNames: 'profile__btn',
      parentNode: this.btnsContainerOpenEdit.getElement(),
    });

    this.btnsContainerSaveEdit = new BaseComponent({
      tagName: 'div',
      classNames: ['profile-btns-container', 'unvisible'],
      parentNode: this.element,
    });

    //cancel edit profile btn
    this.btnCancelProfile = new Button({
      textContent: 'Cancel',
      classNames: 'profile__btn',
      parentNode: this.btnsContainerSaveEdit.getElement(),
    });

    //save edit profile btn
    this.btnSaveProfile = new Button({
      textContent: 'Save',
      classNames: 'profile__btn',
      parentNode: this.btnsContainerSaveEdit.getElement(),
    });

    this.btnEditProfile.getElement().addEventListener('click', (event) => {
      event.preventDefault();
      this.btnsContainerOpenEdit.getElement().classList.add('unvisible');
      this.btnsContainerSaveEdit.getElement().classList.remove('unvisible');
      this.openEditMode();
    });

    this.btnEditPass.getElement().addEventListener('click', (event) => {
      this.overlay.getElement().classList.add('overlay_show');
      this.modalEditPass.getElement().classList.add('modal-pass_show');
      event.preventDefault();
    });

    this.btnEditAddress.getElement().addEventListener('click', (event) => {
      event.preventDefault();
    });

    this.btnCancelProfile.getElement().addEventListener('click', (event) => {
      event.preventDefault();
      this.btnsContainerSaveEdit.getElement().classList.add('unvisible');
      this.btnsContainerOpenEdit.getElement().classList.remove('unvisible');
      this.deleteNoticeInfo();
      this.setUserDataFromState();
      this.closeEditMode();
    });

    this.btnSaveProfile.getElement().addEventListener('click', (event) => {
      event.preventDefault();
      if (this.validateEditProfile()) {
        this.btnsContainerSaveEdit.getElement().classList.add('unvisible');
        this.btnsContainerOpenEdit.getElement().classList.remove('unvisible');
        const newCustomerData = {
          version: Number(state.customer.version),
          actions: [
            {
              action: 'setFirstName',
              firstName: this.inputFirstName.value,
            },
            {
              action: 'setLastName',
              lastName: this.inputLastName.value,
            },
            {
              action: 'setDateOfBirth',
              dateOfBirth: this.inputDateOfBirth.value,
            },
            {
              action: 'changeEmail',
              email: this.inputEmail.value,
            },
          ],
        };
        updateCustomerApi(newCustomerData, state.access_token.access_token)
          .then((result) => {
            state.customer = result as Customer;
            this.msg.getElement().classList.add('modal-pass_show');
            setTimeout(() => {
              this.msg.getElement().classList.remove('modal-pass_show');
            }, 1990);
          })
          .catch((error) => {
            this.showErrorMessage(error);
          });
        this.closeEditMode();
      }
    });

    this.setUserDataFromState();
    this.closeEditMode();
    this.addAllAddress();
  }

  private deleteNoticeInfo() {
    const arrNotice = this.element.getElementsByClassName('notice');
    for (let i = arrNotice.length - 1; i >= 0; i -= 1) {
      arrNotice[i].remove();
    }
  }

  private addAllAddress(): void {
    const arrAddresses = state.customer.addresses;
    for (let i = 0; i < arrAddresses.length; i += 1) {
      const address = document.createElement('p');
      address.classList.add('addresses-container__address');
      address.innerHTML = `
        <span>${i + 1}.</span> Country: ${arrAddresses[i].country}, 
        City: ${arrAddresses[i].city}, Street: ${arrAddresses[i].streetName}, 
        Post code: ${arrAddresses[i].postalCode} 
        ${arrAddresses[i].id === state.customer.defaultBillingAddressId ? '<span> - Billing Address</span>' : ''}
        ${arrAddresses[i].id === state.customer.defaultShippingAddressId ? '<span> - Shipping Address</span>' : ''}
      `;
      this.addressContainer.getElement().append(address);
    }
    if (arrAddresses.length === 0) {
      const address = document.createElement('p');
      address.classList.add('addresses-container__address');
      address.textContent = 'No addresses';
      this.addressContainer.getElement().append(address);
    }
  }

  private closeEditMode(): void {
    this.inputEmail.getElement().classList.remove('edit-mode');
    //this.inputPass.getElement().classList.remove('edit-mode');
    this.inputFirstName.getElement().classList.remove('edit-mode');
    this.inputLastName.getElement().classList.remove('edit-mode');
    this.inputDateOfBirth.getElement().classList.remove('edit-mode');
  }

  private openEditMode(): void {
    this.inputEmail.getElement().classList.add('edit-mode');
    //this.inputPass.getElement().classList.add('edit-mode');
    this.inputFirstName.getElement().classList.add('edit-mode');
    this.inputLastName.getElement().classList.add('edit-mode');
    this.inputDateOfBirth.getElement().classList.add('edit-mode');
  }

  private setUserDataFromState(): void {
    this.inputEmail.getElement().value = state.customer.email || '';
    //this.inputPass.getElement().value = state.customer.password || '';
    this.inputFirstName.getElement().value = state.customer.firstName || '';
    this.inputLastName.getElement().value = state.customer.lastName || '';
    this.inputDateOfBirth.getElement().value = state.customer.dateOfBirth || '';
  }

  private handleCheckboxOld(): void {
    this.inputPassOld.type = this.inputPassOld.type === 'password' ? 'text' : 'password';
  }
  private handleCheckboxNew(): void {
    this.inputPassNew.type = this.inputPassNew.type === 'password' ? 'text' : 'password';
  }
  private handleChangeInput(): void {
    if (this.isSubmitted) this.validateEditProfile();
  }

  /*
  private createJSONfromForm(): Customer {
    const customerDraft: Customer = {
      firstName: this.inputFirstName.value,
      lastName: this.inputLastName.value,
      dateOfBirth: this.inputDateOfBirth.value,
      email: this.inputEmail.value,
      id: state.customer.id,
      createdAt: state.customer.createdAt,
      lastModifiedAt: state.customer.lastModifiedAt,
      isEmailVerified: false,
      password: state.customer.password,
      addresses: [...state.customer.addresses],
      version: state.customer.version,
      stores: [...state.customer.stores],
      authenticationMode: state.customer.authenticationMode,
    };
    return customerDraft;
  }

  private createJSONfromForm(): MyCustomerDraft {
    let customerDraft: MyCustomerDraft = {
      email: this.inputEmail.value,
      password: this.inputPassNew.value,
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

  private validateEditProfile(): boolean {
    if (this.addressForm.useAsBilling.getElement().checked) this.copyShippingToBilling();

    const isValidLogin = this.validateEmail(this.inputEmail.value);
    const isValidFirstName = this.validateNamesAndCity(this.inputFirstName.value);
    const isValidLastName = this.validateNamesAndCity(this.inputLastName.value);
    const isValidDateOfBirth = this.validateDateOfBirth(this.inputDateOfBirth.value);
    this.inputFirstName.showNotice(isValidFirstName.errors);
    this.inputLastName.showNotice(isValidLastName.errors);
    this.inputDateOfBirth.showNotice(isValidDateOfBirth.errors);
    this.inputEmail.showNotice(isValidLogin.errors);
    //const isValidPassword = this.validatePassword(this.inputPass.value);
    //const isValidCityShipping = this.validateNamesAndCity(this.addressForm.inputCityShipping.value);
    //const isValidCityBilling = this.validateNamesAndCity(this.addressForm.inputCityBilling.value);
    //const isValidStreetShipping = this.validateStreet(this.addressForm.inputStreetShipping.value);
    //const isValidStreetBilling = this.validateStreet(this.addressForm.inputStreetBilling.value);
    //const isValidPostalCodeShipping = this.validatePostalCode(this.addressForm.inputPostalCodeShipping.value);
    //const isValidPostalCodeBilling = this.validatePostalCode(this.addressForm.inputPostalCodeBilling.value);
    //const isValidCountryShipping = this.validateCountry(this.addressForm.inputCountryShipping.value);
    //const isValidCountryBilling = this.validateCountry(this.addressForm.inputCountryBilling.value);
    //this.inputPass.showNotice(isValidPassword.errors);
    //this.addressForm.inputCityShipping.showNotice(isValidCityShipping.errors);
    //this.addressForm.inputCityBilling.showNotice(isValidCityBilling.errors);
    //this.addressForm.inputStreetShipping.showNotice(isValidStreetShipping.errors);
    //this.addressForm.inputStreetBilling.showNotice(isValidStreetBilling.errors);
    //this.addressForm.inputPostalCodeShipping.showNotice(isValidPostalCodeShipping.errors);
    //this.addressForm.inputPostalCodeBilling.showNotice(isValidPostalCodeBilling.errors);
    //this.addressForm.inputCountryShipping.showNotice(isValidCountryShipping.errors);
    //this.addressForm.inputCountryBilling.showNotice(isValidCountryBilling.errors);

    return (
      isValidLogin.validate && isValidFirstName.validate && isValidLastName.validate && isValidDateOfBirth.validate
      //isValidPassword.validate &&
      //isValidCityBilling.validate &&
      //isValidCityShipping.validate &&
      //isValidCountryBilling.validate &&
      //isValidCountryShipping.validate &&
      //isValidPostalCodeBilling.validate &&
      //isValidPostalCodeShipping.validate &&
      //isValidStreetBilling.validate &&
      //isValidStreetShipping.validate
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
