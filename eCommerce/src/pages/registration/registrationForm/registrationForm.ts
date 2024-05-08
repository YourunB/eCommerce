import { BaseComponent } from '../../../components/baseComponent';
import { PageRegistrationPropsType } from '../../../modules/registration/helpers/types';
import { InputWithNotice } from '../../login/inputWithNotice/inputWithNotice';

import './registrationForm.sass';

export class RegistrationForm extends BaseComponent {
  public inputEmail: InputWithNotice;
  public inputPass: InputWithNotice;
  public inputFirstName: InputWithNotice;
  public inputLastName: InputWithNotice;
  public inputDateOfBirth: InputWithNotice;
  public addressForm: BaseComponent;
  public inputStreet: InputWithNotice;
  public inputCity: InputWithNotice;
  public inputPostalCode: InputWithNotice;
  public inputCountry: InputWithNotice;
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
    this.inputDateOfBirth.setAttribute({ name: 'type', value: 'date' });

    this.addressForm = new BaseComponent({ tagName: 'form', classNames: 'address-form', parentNode: this.element });
    this.inputStreet = new InputWithNotice({
      attribute: { name: 'name', value: 'street' },
      classNames: 'registration-street__input',
      parentNode: this.addressForm.getElement(),
    });
    this.inputStreet.setAttribute({ name: 'placeholder', value: 'street' });

    this.inputCity = new InputWithNotice({
      attribute: { name: 'name', value: 'city' },
      classNames: 'registration-city__input',
      parentNode: this.addressForm.getElement(),
    });
    this.inputCity.setAttribute({ name: 'placeholder', value: 'city' });

    this.inputPostalCode = new InputWithNotice({
      attribute: { name: 'name', value: 'postal code' },
      classNames: 'registration-postalCode__input',
      parentNode: this.addressForm.getElement(),
    });
    this.inputPostalCode.setAttribute({ name: 'placeholder', value: 'postal code' });

    this.inputCountry = new InputWithNotice({
      attribute: { name: 'name', value: 'country' },
      classNames: 'registration-country__input',
      parentNode: this.addressForm.getElement(),
    });
    this.inputCountry.setAttribute({ name: 'placeholder', value: 'country' });
  }
}
