import { BaseComponent } from '../../../../components/baseComponent';
import { InputWithNotice } from '../../../../components/inputWithNotice/inputWithNotice';
import { PageRegistrationPropsType } from '../../../../modules/registration/helpers/types';
import '../profileForm.sass';

export class AddressForm extends BaseComponent {
  public addressFormShipping: BaseComponent;
  public inputStreetShipping: InputWithNotice;
  public inputCityShipping: InputWithNotice;
  public inputPostalCodeShipping: InputWithNotice;
  public inputCountryShipping: InputWithNotice;
  public addressLabel: BaseComponent;

  constructor(props: Omit<PageRegistrationPropsType, 'dispatch'>) {
    super({ tagName: 'div', classNames: ['address-container'], ...props });

    this.addressFormShipping = new BaseComponent({
      tagName: 'fieldset',
      classNames: 'address-form',
      parentNode: this.element,
    });

    this.addressLabel = new BaseComponent({
      tagName: 'label',
      textContent: 'Address',
      classNames: 'address__profile-label',
      parentNode: this.addressFormShipping.getElement(),
    });

    this.addressLabel = new BaseComponent({
      tagName: 'label',
      textContent: 'Street:',
      classNames: 'profile-label',
      parentNode: this.addressFormShipping.getElement(),
    });
    this.inputStreetShipping = new InputWithNotice({
      attribute: { name: 'name', value: 'street' },
      classNames: 'profile-street__input',
      parentNode: this.addressFormShipping.getElement(),
    });
    this.inputStreetShipping.setAttribute({ name: 'placeholder', value: 'street' });
    this.inputStreetShipping.notice.setClassName('profile-notice_address');

    this.addressLabel = new BaseComponent({
      tagName: 'label',
      textContent: 'City:',
      classNames: 'profile-label',
      parentNode: this.addressFormShipping.getElement(),
    });
    this.inputCityShipping = new InputWithNotice({
      attribute: { name: 'name', value: 'city' },
      classNames: 'profile-city__input',
      parentNode: this.addressFormShipping.getElement(),
    });
    this.inputCityShipping.setAttribute({ name: 'placeholder', value: 'city' });
    this.inputCityShipping.notice.setClassName('profile-notice_address');

    this.addressLabel = new BaseComponent({
      tagName: 'label',
      textContent: 'Postal code:',
      classNames: 'profile-label',
      parentNode: this.addressFormShipping.getElement(),
    });
    this.inputPostalCodeShipping = new InputWithNotice({
      attribute: { name: 'name', value: 'postal code' },
      classNames: 'profile-postalCode__input',
      parentNode: this.addressFormShipping.getElement(),
    });
    this.inputPostalCodeShipping.setAttribute({ name: 'placeholder', value: 'postal code' });
    this.inputPostalCodeShipping.notice.setClassName('profile-notice_address');

    this.addressLabel = new BaseComponent({
      tagName: 'label',
      textContent: 'Country:',
      classNames: 'profile-label',
      parentNode: this.addressFormShipping.getElement(),
    });
    this.inputCountryShipping = new InputWithNotice({
      attribute: { name: 'name', value: 'country' },
      classNames: 'profile-country__input',
      parentNode: this.addressFormShipping.getElement(),
    });
    this.inputCountryShipping.setAttribute({ name: 'placeholder', value: 'country' });
    this.inputCountryShipping.notice.setClassName('profile-notice_address');
    const countryList = new BaseComponent({ tagName: 'datalist', classNames: 'countryList' });
    countryList.getElement().id = 'countries';

    [
      ['Italy', 'IT'],
      ['Germany', 'DE'],
      ['Spain', 'ES'],
      ['Finland', 'FI'],
      ['Estonia', 'EE'],
    ].forEach(([country, code]) => {
      const option = new BaseComponent<HTMLOptionElement>({ tagName: 'option', textContent: country });
      option.getElement().value = code;
      countryList.insertChild(option);
    });

    this.inputCountryShipping.insertChild(countryList);
    this.inputCountryShipping.getElement().setAttribute('list', 'countries');
  }
}
