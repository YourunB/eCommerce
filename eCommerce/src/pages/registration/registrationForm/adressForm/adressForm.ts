import { BaseComponent } from '../../../../components/baseComponent';
import { Input } from '../../../../components/baseInput/baseInput';
import { InputWithNotice } from '../../../../components/inputWithNotice/inputWithNotice';
import { PageRegistrationPropsType } from '../../../../modules/registration/helpers/types';

import '../registrationForm.sass';

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
      tagName: 'form',
      classNames: 'address-form',
      parentNode: this.element,
    });

    this.addressLabel = new BaseComponent({
      tagName: 'label',
      textContent: 'Shipping address',
      classNames: 'address__label',
      parentNode: this.addressFormShipping.getElement(),
    });

    this.inputStreetShipping = new InputWithNotice({
      attribute: { name: 'name', value: 'street' },
      classNames: 'registration-street__input',
      parentNode: this.addressFormShipping.getElement(),
    });
    this.inputStreetShipping.setAttribute({ name: 'placeholder', value: 'street' });
    this.inputStreetShipping.notice.setClassName('registration-notice');

    this.inputCityShipping = new InputWithNotice({
      attribute: { name: 'name', value: 'city' },
      classNames: 'registration-city__input',
      parentNode: this.addressFormShipping.getElement(),
    });
    this.inputCityShipping.setAttribute({ name: 'placeholder', value: 'city' });
    this.inputCityShipping.notice.setClassName('registration-notice');

    this.inputPostalCodeShipping = new InputWithNotice({
      attribute: { name: 'name', value: 'postal code' },
      classNames: 'registration-postalCode__input',
      parentNode: this.addressFormShipping.getElement(),
    });
    this.inputPostalCodeShipping.setAttribute({ name: 'placeholder', value: 'postal code' });
    this.inputPostalCodeShipping.notice.setClassName('registration-notice');

    this.inputCountryShipping = new InputWithNotice({
      attribute: { name: 'name', value: 'country' },
      classNames: 'registration-country__input',
      parentNode: this.addressFormShipping.getElement(),
    });
    this.inputCountryShipping.setAttribute({ name: 'placeholder', value: 'country' });
    this.inputCountryShipping.notice.setClassName('registration-notice');
    const countryList = new BaseComponent({ tagName: 'datalist', classNames: 'countryList' });
    countryList.getElement().id = 'countries';

    ['Italy', 'Germany', 'Spain', 'Finland', 'United States'].forEach((country) => {
      const option = new BaseComponent({ tagName: 'option' });
      (option.getElement() as HTMLOptionElement).value = country;
      countryList.insertChild(option);
    });

    this.inputCountryShipping.insertChild(countryList);
    this.inputCountryShipping.getElement().setAttribute('list', 'countries');

    this.addressFormBilling = new BaseComponent({
      tagName: 'form',
      classNames: 'address-form',
      parentNode: this.element,
    });
    this.addressLabel = new BaseComponent({
      tagName: 'label',
      textContent: 'Billing address',
      classNames: 'address__label',
      parentNode: this.addressFormBilling.getElement(),
    });
    this.inputStreetBilling = new InputWithNotice({
      attribute: { name: 'name', value: 'street' },
      classNames: 'registration-street__input',
      parentNode: this.addressFormBilling.getElement(),
    });
    this.inputStreetBilling.notice.setClassName('registration-notice');
    this.inputStreetBilling.setAttribute({ name: 'placeholder', value: 'street' });

    this.inputCityBilling = new InputWithNotice({
      attribute: { name: 'name', value: 'city' },
      classNames: 'registration-city__input',
      parentNode: this.addressFormBilling.getElement(),
    });
    this.inputCityBilling.notice.setClassName('registration-notice');
    this.inputCityBilling.setAttribute({ name: 'placeholder', value: 'city' });

    this.inputPostalCodeBilling = new InputWithNotice({
      attribute: { name: 'name', value: 'postal code' },
      classNames: 'registration-postalCode__input',
      parentNode: this.addressFormBilling.getElement(),
    });
    this.inputPostalCodeBilling.notice.setClassName('registration-notice');
    this.inputPostalCodeBilling.setAttribute({ name: 'placeholder', value: 'postal code' });

    this.inputCountryBilling = new InputWithNotice({
      attribute: { name: 'name', value: 'country' },
      classNames: 'registration-country__input',
      parentNode: this.addressFormBilling.getElement(),
    });
    this.inputCountryBilling.notice.setClassName('registration-notice');
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
