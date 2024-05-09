import { BaseComponent } from '../../../../components/baseComponent';
import { Input } from '../../../../components/baseInput/baseInput';
import { PageRegistrationPropsType } from '../../../../modules/registration/helpers/types';
import { InputWithNotice } from '../../../login/inputWithNotice/inputWithNotice';
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
  public useAsDefault: Input;
  public useAsDefaultLabel: BaseComponent;
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

    this.inputCityShipping = new InputWithNotice({
      attribute: { name: 'name', value: 'city' },
      classNames: 'registration-city__input',
      parentNode: this.addressFormShipping.getElement(),
    });
    this.inputCityShipping.setAttribute({ name: 'placeholder', value: 'city' });

    this.inputPostalCodeShipping = new InputWithNotice({
      attribute: { name: 'name', value: 'postal code' },
      classNames: 'registration-postalCode__input',
      parentNode: this.addressFormShipping.getElement(),
    });
    this.inputPostalCodeShipping.setAttribute({ name: 'placeholder', value: 'postal code' });

    this.inputCountryShipping = new InputWithNotice({
      attribute: { name: 'name', value: 'country' },
      classNames: 'registration-country__input',
      parentNode: this.addressFormShipping.getElement(),
    });
    this.inputCountryShipping.setAttribute({ name: 'placeholder', value: 'country' });
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
    this.inputStreetBilling.setAttribute({ name: 'placeholder', value: 'street' });

    this.inputCityBilling = new InputWithNotice({
      attribute: { name: 'name', value: 'city' },
      classNames: 'registration-city__input',
      parentNode: this.addressFormBilling.getElement(),
    });
    this.inputCityBilling.setAttribute({ name: 'placeholder', value: 'city' });

    this.inputPostalCodeBilling = new InputWithNotice({
      attribute: { name: 'name', value: 'postal code' },
      classNames: 'registration-postalCode__input',
      parentNode: this.addressFormBilling.getElement(),
    });
    this.inputPostalCodeBilling.setAttribute({ name: 'placeholder', value: 'postal code' });

    this.inputCountryBilling = new InputWithNotice({
      attribute: { name: 'name', value: 'country' },
      classNames: 'registration-country__input',
      parentNode: this.addressFormBilling.getElement(),
    });
    this.inputCountryBilling.setAttribute({ name: 'placeholder', value: 'country' });
    this.inputCountryBilling.insertChild(countryList);
    this.inputCountryBilling.getElement().setAttribute('list', 'countries');

    this.useAsDefaultLabel = new BaseComponent({
      tagName: 'label',
      textContent: 'Use as default address',
      classNames: 'UseAsDefault__label',
      parentNode: this.addressFormShipping.getElement(),
    });
    this.useAsDefault = new Input({
      attribute: { name: 'type', value: 'checkbox' },
      parentNode: this.useAsDefaultLabel.getElement(),
    });
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
  }
}
