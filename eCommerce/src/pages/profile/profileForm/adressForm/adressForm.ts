import { BaseComponent } from '../../../../components/baseComponent';
import { Input } from '../../../../components/baseInput/baseInput';
import { InputWithNotice } from '../../../../components/inputWithNotice/inputWithNotice';
import { PageRegistrationPropsType } from '../../../../modules/registration/helpers/types';
import '../profileForm.sass';

export class AddressForm extends BaseComponent {
  public addressFormShipping: BaseComponent;
  public addressFormBilling: BaseComponent;
  public inputStreetShipping: InputWithNotice;
  public inputCityShipping: InputWithNotice;
  public inputPostalCodeShipping: InputWithNotice;
  public inputCountryShipping: InputWithNotice;
  public inputStreetBilling: InputWithNotice;
  public inputCityBilling: InputWithNotice;
  public inputPostalCodeBilling: InputWithNotice;
  public inputCountryBilling: InputWithNotice;
  public addressLabel: BaseComponent;
  public useAsDefaultShipping: Input;
  public useAsDefaultShippingLabel: BaseComponent;
  public useAsDefaultBilling: Input;
  public useAsDefaultBillingLabel: BaseComponent;
  public useAsBilling: Input;
  public useAsBillingLabel: BaseComponent;

  constructor(props: Omit<PageRegistrationPropsType, 'dispatch'>) {
    super({ tagName: 'div', classNames: 'address-container', ...props });

    this.addressFormShipping = new BaseComponent({
      tagName: 'fieldset',
      classNames: 'address-form',
      parentNode: this.element,
    });

    this.addressLabel = new BaseComponent({
      tagName: 'label',
      textContent: 'Shipping address',
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

    this.addressFormBilling = new BaseComponent({
      tagName: 'fieldset',
      classNames: 'address-form',
      parentNode: this.element,
    });
    this.addressLabel = new BaseComponent({
      tagName: 'label',
      textContent: 'Billing address',
      classNames: 'address__profile-label',
      parentNode: this.addressFormBilling.getElement(),
    });
    this.addressLabel = new BaseComponent({
      tagName: 'label',
      textContent: 'Street:',
      classNames: 'profile-label',
      parentNode: this.addressFormBilling.getElement(),
    });
    this.inputStreetBilling = new InputWithNotice({
      attribute: { name: 'name', value: 'street' },
      classNames: 'profile-street__input',
      parentNode: this.addressFormBilling.getElement(),
    });
    this.inputStreetBilling.notice.setClassName('profile-notice_address');
    this.inputStreetBilling.setAttribute({ name: 'placeholder', value: 'street' });

    this.addressLabel = new BaseComponent({
      tagName: 'label',
      textContent: 'City:',
      classNames: 'profile-label',
      parentNode: this.addressFormBilling.getElement(),
    });
    this.inputCityBilling = new InputWithNotice({
      attribute: { name: 'name', value: 'city' },
      classNames: 'profile-city__input',
      parentNode: this.addressFormBilling.getElement(),
    });
    this.inputCityBilling.notice.setClassName('profile-notice_address');
    this.inputCityBilling.setAttribute({ name: 'placeholder', value: 'city' });

    this.addressLabel = new BaseComponent({
      tagName: 'label',
      textContent: 'Postal code:',
      classNames: 'profile-label',
      parentNode: this.addressFormBilling.getElement(),
    });
    this.inputPostalCodeBilling = new InputWithNotice({
      attribute: { name: 'name', value: 'postal code' },
      classNames: 'profile-postalCode__input',
      parentNode: this.addressFormBilling.getElement(),
    });
    this.inputPostalCodeBilling.notice.setClassName('profile-notice_address');
    this.inputPostalCodeBilling.setAttribute({ name: 'placeholder', value: 'postal code' });

    this.addressLabel = new BaseComponent({
      tagName: 'label',
      textContent: 'Contry:',
      classNames: 'profile-label',
      parentNode: this.addressFormBilling.getElement(),
    });
    this.inputCountryBilling = new InputWithNotice({
      attribute: { name: 'name', value: 'country' },
      classNames: 'profile-country__input',
      parentNode: this.addressFormBilling.getElement(),
    });
    this.inputCountryBilling.notice.setClassName('profile-notice_address');
    this.inputCountryBilling.setAttribute({ name: 'placeholder', value: 'country' });
    this.inputCountryBilling.insertChild(countryList);
    this.inputCountryBilling.getElement().setAttribute('list', 'countries');
    this.useAsBillingLabel = new BaseComponent({
      tagName: 'label',
      textContent: 'Use as billing address',
      classNames: 'UseAsDefault__label',
      parentNode: this.addressFormShipping.getElement(),
    });
    this.useAsBilling = new Input({
      attribute: { name: 'type', value: 'checkbox' },
      parentNode: this.useAsBillingLabel.getElement(),
    });
    this.useAsBilling.getElement().addEventListener('change', (event) => {
      const checkbox = event.target as HTMLInputElement;
      if (checkbox.checked) {
        this.addressFormBilling.setClassName('invisible');
        this.addressFormShipping.insertChild(this.useAsDefaultBillingLabel);
      }
      if (!checkbox.checked) {
        this.addressFormBilling.removeClassName('invisible');
        this.addressFormBilling.insertChild(this.useAsDefaultBillingLabel);
      }
    });
    this.useAsDefaultShippingLabel = new BaseComponent({
      tagName: 'label',
      textContent: 'Use as default shipping address',
      classNames: 'UseAsDefault__label',
      parentNode: this.addressFormShipping.getElement(),
    });
    this.useAsDefaultShipping = new Input({
      attribute: { name: 'type', value: 'checkbox' },
      parentNode: this.useAsDefaultShippingLabel.getElement(),
    });

    this.useAsDefaultBillingLabel = new BaseComponent({
      tagName: 'label',
      textContent: 'Use as default billing address',
      classNames: 'UseAsDefault__label',
      parentNode: this.addressFormBilling.getElement(),
    });
    this.useAsDefaultBilling = new Input({
      attribute: { name: 'type', value: 'checkbox' },
      parentNode: this.useAsDefaultBillingLabel.getElement(),
    });
  }
}
