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
import { LStorage } from '../../../modules/localStorage/localStorage';
import { updateCustomerApi, updatePasswordApi } from '../../../modules/api/auth';
import { InputWithNotice } from '../../../components/inputWithNotice/inputWithNotice';
import { PageProfilePropsType } from '../../../modules/profil/helpers/types';
import { isErrorResponse } from '../../../components/helpers/predicates'; // remove isAuthResponse, isCustomerSignInResult,
import state from '../../../state/state';
import { Login } from '../../../modules/login/login';
import '../../../assets/images/svg/add.svg';
import '../../../assets/images/svg/edit.svg';
import '../../../assets/images/svg/delete.svg';

const dialog = Dialog.getInstance();
const lstorage = new LStorage();

export class ProfileForm extends BaseComponent {
  private isSubmittedProfile: boolean;
  private isSubmittedPass: boolean;
  private isSubmittedAddress: boolean;
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
  private btnCloseModalAddress: Button;
  private btnSaveModalAddress: Button;
  private showPassword: BaseComponent;
  private label: BaseComponent;
  private btnsContainerSaveEdit: BaseComponent;
  private btnsContainerOpenEdit: BaseComponent;
  private adressesEditContainer: BaseComponent;
  private modalAddressForm: BaseComponent;
  private modalAddressFormBtnsContainer: BaseComponent;
  private adressesEditContainerTitle: BaseComponent;
  private adressesControlsContainer: BaseComponent;
  private btnCloseAddressesContainer: Button;
  private btnSaveAddressesContainer: Button;
  private adressesBtnsContainer: BaseComponent;
  private addressContainer: BaseComponent;
  private overlay: BaseComponent;
  private modalEditPass: BaseComponent;
  private btnsPassContainer: BaseComponent;
  private btnCancelPass: BaseComponent;
  private btnSavePass: BaseComponent;
  private msg: BaseComponent;

  constructor(props: PageProfilePropsType) {
    const login = new Login();
    super({ tagName: 'form', classNames: 'profile-form-container', ...props });
    this.isSubmittedPass = false;
    this.isSubmittedProfile = false;
    this.isSubmittedAddress = false;
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
      classNames: 'profile-password__container',
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
      classNames: 'profile-password__container',
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

    this.btnSavePass.getElement().addEventListener('click', async (event) => {
      event.preventDefault();
      this.isSubmittedPass = true;
      try {
        const result = await lstorage.getCredentials();
        const currentPass = typeof result !== 'string' ? result.password : '';
        const currentEmail = typeof result !== 'string' ? result.email : '';
        if (this.validateEditPass()) {
          if (!currentPass || currentPass !== this.inputPassOld.getElement().value) {
            this.showMsg('Old password is not correct!', false);
            return;
          }
          const newCustomerData = {
            version: Number(state.customer.version),
            currentPassword: currentPass,
            newPassword: this.inputPassNew.getElement().value,
          };
          updatePasswordApi(newCustomerData, state.access_token.access_token)
            .then((result) => {
              state.customer = result as Customer;
              console.log(currentEmail, this.inputPassNew.getElement().value);
              lstorage.saveCredentials({ email: currentEmail, password: this.inputPassNew.getElement().value });
              this.showMsg('Succes', true);
              this.inputPassOld.getElement().value = '';
              this.inputPassNew.getElement().value = '';
            })
            .then(() => login.isLogined())
            .catch((error) => {
              this.showErrorMessage(error);
            });
          this.overlay.getElement().classList.remove('overlay_show');
          this.modalEditPass.getElement().classList.remove('modal-pass_show');
          this.isSubmittedPass = false;
        }
      } catch (error) {
        this.showErrorMessage(error);
      }
    });

    this.btnCancelPass.getElement().addEventListener('click', (event) => {
      event.preventDefault();
      this.isSubmittedPass = false;
      this.deleteNoticeInfo();
      this.overlay.getElement().classList.remove('overlay_show');
      this.modalEditPass.getElement().classList.remove('modal-pass_show');
      this.inputPassOld.getElement().value = '';
      this.inputPassNew.getElement().value = '';
    });

    //adress control panel
    this.adressesEditContainer = new BaseComponent({
      tagName: 'div',
      classNames: ['edit-adresses-container', 'unvisible'],
      parentNode: this.element,
    });

    this.adressesEditContainerTitle = new BaseComponent({
      tagName: 'h3',
      parentNode: this.adressesEditContainer.getElement(),
      textContent: 'Address Control Panel',
    });

    this.adressesControlsContainer = new BaseComponent({
      tagName: 'div',
      classNames: ['controls-adresses-container'],
      parentNode: this.adressesEditContainer.getElement(),
    });

    this.adressesBtnsContainer = new BaseComponent({
      tagName: 'div',
      classNames: ['profile-btns-container'],
      parentNode: this.adressesEditContainer.getElement(),
    });
    //btn close addresses container
    this.btnCloseAddressesContainer = new Button({
      textContent: 'Cancel',
      classNames: 'profile__btn',
      parentNode: this.adressesBtnsContainer.getElement(),
    });

    this.btnSaveAddressesContainer = new Button({
      textContent: 'Save',
      classNames: 'profile__btn',
      parentNode: this.adressesBtnsContainer.getElement(),
    });
    this.btnCloseAddressesContainer.getElement().addEventListener('click', (event) => {
      event.preventDefault();
      this.adressesEditContainer.getElement().classList.add('unvisible');
    });

    this.modalAddressForm = new BaseComponent({
      tagName: 'div',
      classNames: ['modal-address', 'unvisible'],
      parentNode: this.element,
    });

    this.addressForm = new AddressForm({ parentNode: this.modalAddressForm.getElement() });
    this.addressForm.inputStreetShipping.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputCityShipping.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputPostalCodeShipping.getElement().addEventListener('keyup', () => this.handleChangeInput());
    this.addressForm.inputCountryShipping.getElement().addEventListener('keyup', () => this.handleChangeInput());

    this.adressesControlsContainer.getElement().addEventListener('click', (event) => {
      const currentTarget = event.target as HTMLElement;
      if (currentTarget.classList.contains('btn-svg-add')) {
        this.overlay.getElement().classList.add('overlay_show');
        this.modalAddressForm.getElement().classList.remove('unvisible');
      }
      if (currentTarget.classList.contains('btn-svg-edit')) {
        this.isSubmittedAddress = true;
        this.addressForm.inputStreetShipping.getElement().value =
          state.customer.addresses[Number(currentTarget.dataset.index)].streetName || '';
        this.addressForm.inputCityShipping.getElement().value =
          state.customer.addresses[Number(currentTarget.dataset.index)].city || '';
        this.addressForm.inputPostalCodeShipping.getElement().value =
          state.customer.addresses[Number(currentTarget.dataset.index)].postalCode || '';
        this.addressForm.inputCountryShipping.getElement().value =
          state.customer.addresses[Number(currentTarget.dataset.index)].country || '';
        this.overlay.getElement().classList.add('overlay_show');
        this.modalAddressForm.getElement().classList.remove('unvisible');
      }
      if (currentTarget.classList.contains('btn-svg-delete')) {
        const newCustomerData = {
          version: Number(state.customer.version),
          actions: [
            {
              action: 'removeAddress',
              addressId: currentTarget.dataset.id,
            },
          ],
        };
        updateCustomerApi(newCustomerData, state.access_token.access_token)
          .then((result) => {
            state.customer = result as Customer;
            this.showMsg('Succes', true);
            this.overlay.getElement().classList.add('overlay_show');
            setTimeout(() => {
              this.overlay.getElement().classList.remove('overlay_show');
              this.createAddressesOnControlPanel();
              this.addAllAddress();
            }, 2000);
          })
          .catch((error) => {
            this.showErrorMessage(error);
          });
      }
    });

    this.modalAddressFormBtnsContainer = new BaseComponent({
      tagName: 'div',
      classNames: ['profile-btns-container'],
      parentNode: this.modalAddressForm.getElement(),
    });

    this.btnCloseModalAddress = new Button({
      textContent: 'Cancel',
      classNames: 'profile__btn',
      parentNode: this.modalAddressFormBtnsContainer.getElement(),
    });

    this.btnSaveModalAddress = new Button({
      textContent: 'Save',
      classNames: 'profile__btn',
      parentNode: this.modalAddressFormBtnsContainer.getElement(),
    });

    this.btnCloseModalAddress.getElement().addEventListener('click', (event) => {
      event.preventDefault();
      this.overlay.getElement().classList.remove('overlay_show');
      this.modalAddressForm.getElement().classList.add('unvisible');
      this.isSubmittedAddress = false;
      this.deleteNoticeInfo();
      this.clearAddressInputs();
    });

    this.btnSaveModalAddress.getElement().addEventListener('click', (event) => {
      event.preventDefault();
      this.isSubmittedAddress = true;
      if (this.validateEditAddress()) {
        const newCustomerData = {
          version: Number(state.customer.version),
          actions: [
            {
              action: 'addAddress',
              address: {
                country: this.addressForm.inputCountryShipping.getElement().value,
                city: this.addressForm.inputCityShipping.getElement().value,
                streetName: this.addressForm.inputStreetShipping.getElement().value,
                postalCode: this.addressForm.inputPostalCodeShipping.getElement().value,
              },
            },
          ],
        };
        updateCustomerApi(newCustomerData, state.access_token.access_token)
          .then((result) => {
            state.customer = result as Customer;
            this.showMsg('Succes', true);
            this.overlay.getElement().classList.add('overlay_show');
            setTimeout(() => {
              this.overlay.getElement().classList.remove('overlay_show');
              this.modalAddressForm.getElement().classList.add('unvisible');
              this.createAddressesOnControlPanel();
              this.addAllAddress();
            }, 2000);
          })
          .catch((error) => {
            this.showErrorMessage(error);
          });
        this.clearAddressInputs();
        this.isSubmittedAddress = false;
      }
    });

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
      this.createAddressesOnControlPanel();
      this.adressesEditContainer.getElement().classList.remove('unvisible');
    });

    this.btnCancelProfile.getElement().addEventListener('click', (event) => {
      event.preventDefault();
      this.isSubmittedProfile = false;
      this.btnsContainerSaveEdit.getElement().classList.add('unvisible');
      this.btnsContainerOpenEdit.getElement().classList.remove('unvisible');
      this.deleteNoticeInfo();
      this.setUserDataFromState();
      this.closeEditMode();
    });

    this.btnSaveProfile.getElement().addEventListener('click', (event) => {
      event.preventDefault();
      this.isSubmittedProfile = true;
      if (this.validateEditProfile()) {
        this.btnsContainerSaveEdit.getElement().classList.add('unvisible');
        this.btnsContainerOpenEdit.getElement().classList.remove('unvisible');
        this.overlay.getElement().classList.add('overlay_show');
        setTimeout(() => this.overlay.getElement().classList.remove('overlay_show'), 2000);
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
            this.showMsg('Succes', true);
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

  private createAddressesOnControlPanel() {
    const container = this.adressesControlsContainer.getElement();
    container.innerHTML = '';
    const arrAddresses = state.customer.addresses;
    for (let i = 0; i < arrAddresses.length; i += 1) {
      const address = document.createElement('div');
      address.classList.add('controls-adresses-container__address-box');
      address.innerHTML = `
        <img class="btn-svg btn-svg-edit" src="/edit.svg" alt="Edit" title="Edit" data-index=${i} data-id=${arrAddresses[i].id}>
        <img class="btn-svg btn-svg-delete" src="/delete.svg" alt="Delete" title="Delete" data-index=${i} data-id=${arrAddresses[i].id}>
        <label>Shipping<input type="checkbox"></label>
        <label>Billing<input type="checkbox"></label>
        Country: ${arrAddresses[i].country}, 
        City: ${arrAddresses[i].city}, 
        Street: ${arrAddresses[i].streetName}, 
        Post code: ${arrAddresses[i].postalCode}
      `;
      container.append(address);
    }
    const btnAdd = document.createElement('img');
    btnAdd.className = 'btn-svg btn-svg-add';
    btnAdd.src = '/add.svg';
    btnAdd.alt = 'Add address';
    btnAdd.title = 'Add';
    container.append(btnAdd);
  }

  private addAllAddress(): void {
    this.addressContainer.getElement().innerHTML = '';
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
    if (this.isSubmittedProfile) this.validateEditProfile();
    if (this.isSubmittedPass) this.validateEditPass();
    if (this.isSubmittedAddress) this.validateEditAddress();
  }

  private showErrorMessage(error: unknown): void {
    if (isErrorResponse(error)) {
      const detailedErrorMessage = error.errors ? error.errors[0].detailedErrorMessage : '';
      if (detailedErrorMessage) {
        dialog.show(`${error.message} ${detailedErrorMessage}`, 'warning');
      }
      dialog.show(`${error.message}`, 'warning');
    }
  }

  private validateEditProfile(): boolean {
    //if (this.addressForm.useAsBilling.getElement().checked) this.copyShippingToBilling();

    const isValidLogin = this.validateEmail(this.inputEmail.value);
    const isValidFirstName = this.validateNamesAndCity(this.inputFirstName.value);
    const isValidLastName = this.validateNamesAndCity(this.inputLastName.value);
    const isValidDateOfBirth = this.validateDateOfBirth(this.inputDateOfBirth.value);
    this.inputFirstName.showNotice(isValidFirstName.errors);
    this.inputLastName.showNotice(isValidLastName.errors);
    this.inputDateOfBirth.showNotice(isValidDateOfBirth.errors);
    this.inputEmail.showNotice(isValidLogin.errors);

    return (
      isValidLogin.validate && isValidFirstName.validate && isValidLastName.validate && isValidDateOfBirth.validate
    );
  }

  private validateEditAddress() {
    const isValidCountryShipping = this.validateCountry(this.addressForm.inputCountryShipping.value);
    const isValidCityShipping = this.validateNamesAndCity(this.addressForm.inputCityShipping.value);
    const isValidStreetShipping = this.validateStreet(this.addressForm.inputStreetShipping.value);
    const isValidPostalCodeShipping = this.validatePostalCode(this.addressForm.inputPostalCodeShipping.value);

    this.addressForm.inputCityShipping.showNotice(isValidCityShipping.errors);
    this.addressForm.inputStreetShipping.showNotice(isValidStreetShipping.errors);
    this.addressForm.inputPostalCodeShipping.showNotice(isValidPostalCodeShipping.errors);
    this.addressForm.inputCountryShipping.showNotice(isValidCountryShipping.errors);

    return (
      isValidCityShipping.validate &&
      isValidCountryShipping.validate &&
      isValidPostalCodeShipping.validate &&
      isValidStreetShipping.validate
    );
  }

  public showMsg(text: string, succes: boolean): void {
    this.msg.getElement().textContent = text;
    if (succes) this.msg.getElement().classList.remove('msg-modal__error');
    else this.msg.getElement().classList.add('msg-modal__error');
    this.msg.getElement().classList.add('msg-modal_show');
    setTimeout(() => {
      this.msg.getElement().classList.remove('msg-modal_show');
    }, 1990);
  }

  private clearAddressInputs() {
    this.addressForm.inputCountryShipping.getElement().value = '';
    this.addressForm.inputCityShipping.getElement().value = '';
    this.addressForm.inputStreetShipping.getElement().value = '';
    this.addressForm.inputPostalCodeShipping.getElement().value = '';
  }

  private validateEditPass(): boolean {
    const isValidPasswordOld = this.validatePassword(this.inputPassOld.value);
    const isValidPasswordNew = this.validatePassword(this.inputPassNew.value);
    this.inputPassOld.showNotice(isValidPasswordOld.errors);
    this.inputPassNew.showNotice(isValidPasswordNew.errors);
    return isValidPasswordOld.validate && isValidPasswordNew.validate;
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
