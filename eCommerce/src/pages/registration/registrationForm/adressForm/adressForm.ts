import { BaseComponent } from '../../../../components/baseComponent';
import { Input } from '../../../../components/baseInput/baseInput';
import { PageRegistrationPropsType } from '../../../../modules/registration/helpers/types';
import { InputWithNotice } from '../../../login/inputWithNotice/inputWithNotice';
import '../registrationForm.sass';

export class AddressForm extends BaseComponent {
  public addressFormShipping: BaseComponent;
  public addressFormBilling: BaseComponent;
  public inputStreet: InputWithNotice;
  public inputCity: InputWithNotice;
  public inputPostalCode: InputWithNotice;
  public inputCountry: InputWithNotice;
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

    this.inputStreet = new InputWithNotice({
      attribute: { name: 'name', value: 'street' },
      classNames: 'registration-street__input',
      parentNode: this.addressFormShipping.getElement(),
    });
    this.inputStreet.setAttribute({ name: 'placeholder', value: 'street' });

    this.inputCity = new InputWithNotice({
      attribute: { name: 'name', value: 'city' },
      classNames: 'registration-city__input',
      parentNode: this.addressFormShipping.getElement(),
    });
    this.inputCity.setAttribute({ name: 'placeholder', value: 'city' });

    this.inputPostalCode = new InputWithNotice({
      attribute: { name: 'name', value: 'postal code' },
      classNames: 'registration-postalCode__input',
      parentNode: this.addressFormShipping.getElement(),
    });
    this.inputPostalCode.setAttribute({ name: 'placeholder', value: 'postal code' });

    this.inputCountry = new InputWithNotice({
      attribute: { name: 'name', value: 'country' },
      classNames: 'registration-country__input',
      parentNode: this.addressFormShipping.getElement(),
    });
    this.inputCountry.setAttribute({ name: 'placeholder', value: 'country' });

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
    this.inputStreet = new InputWithNotice({
      attribute: { name: 'name', value: 'street' },
      classNames: 'registration-street__input',
      parentNode: this.addressFormBilling.getElement(),
    });
    this.inputStreet.setAttribute({ name: 'placeholder', value: 'street' });

    this.inputCity = new InputWithNotice({
      attribute: { name: 'name', value: 'city' },
      classNames: 'registration-city__input',
      parentNode: this.addressFormBilling.getElement(),
    });
    this.inputCity.setAttribute({ name: 'placeholder', value: 'city' });

    this.inputPostalCode = new InputWithNotice({
      attribute: { name: 'name', value: 'postal code' },
      classNames: 'registration-postalCode__input',
      parentNode: this.addressFormBilling.getElement(),
    });
    this.inputPostalCode.setAttribute({ name: 'placeholder', value: 'postal code' });

    this.inputCountry = new InputWithNotice({
      attribute: { name: 'name', value: 'country' },
      classNames: 'registration-country__input',
      parentNode: this.addressFormBilling.getElement(),
    });
    this.inputCountry.setAttribute({ name: 'placeholder', value: 'country' });

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
