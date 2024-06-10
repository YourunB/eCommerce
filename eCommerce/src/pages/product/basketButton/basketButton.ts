import { BaseComponent, BaseComponentProps } from '../../../components/baseComponent';
import './basketButton.sass';
import { LineItem } from '@commercetools/platform-sdk';
import { isCart } from '../../../components/helpers/predicates';
import { MyCart } from '../../../modules/cart/cart';

export class BasketButton extends BaseComponent {
  public addButton: BaseComponent;
  public addButtonIcon: BaseComponent;
  public removeButton: BaseComponent;
  public cart: MyCart;
  public id: string;
  public productInCart: LineItem | undefined;

  constructor(props: BaseComponentProps) {
    super({ classNames: 'basket-button__container', ...props });
    this.addButton = new BaseComponent({
      tagName: 'button',
      textContent: 'Add to cart',
      classNames: 'add_button',
      parentNode: this.element,
    });
    this.addButtonIcon = new BaseComponent({
      tagName: 'div',
      classNames: 'add_button_icon',
      parentNode: this.addButton.getElement(),
    });
    this.removeButton = new BaseComponent({
      tagName: 'button',
      classNames: 'remove_button',
      parentNode: this.element,
    });

    this.id = window.location.hash.substring(1);
    this.cart = new MyCart();
    this.productInCart = this.cart.cart.lineItems?.find((item) => item.productId === this.id);

    this.checkButtonStatus();

    this.addButton.getElement().addEventListener('click', async () => {
      const resp = await this.cart.addLineItems([{ productId: this.id, quantity: 1 }]);
      if (isCart(resp)) {
        this.checkButtonStatus();
      }
    });

    this.removeButton.getElement().addEventListener('click', async () => {
      const resp = await this.cart.removeLineItems([{ productId: this.id, quantity: 1 }]);
      if (isCart(resp)) {
        this.checkButtonStatus();
      }
    });
  }

  checkButtonStatus = () => {
    this.productInCart = this.cart.cart.lineItems?.find((item) => item.productId === this.id);
    const isChecked = !!this.productInCart;
    if (isChecked) {
      this.addButton.setAttribute({ name: 'disabled', value: isChecked.toString() });
      this.removeButton.removeAttribute({ name: 'disabled' });
    } else {
      this.removeButton.setAttribute({ name: 'disabled', value: isChecked.toString() });
      this.addButton.removeAttribute({ name: 'disabled' });
    }
  };
}
