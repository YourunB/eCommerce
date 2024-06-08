import { BaseComponent } from '../../../components/baseComponent';
import { Button } from '../../../components/basebutton/baseButton';
import { DispatchProducts } from '../../../modules/products/types';

export class WidgetCart extends BaseComponent {
  private dispatch: DispatchProducts;
  private quantity: number;
  private cartButton: Button;
  private cartText: BaseComponent;

  constructor(quantity: number, productId: string, dispatch: DispatchProducts) {
    super({ tagName: 'section', classNames: 'widget-cart__container' });
    this.quantity = quantity;
    this.dispatch = dispatch;
    this.setAttributeIsInCart(quantity);

    this.cartText = new BaseComponent({
      tagName: 'span',
      textContent: `${this.quantity}`,
      classNames: 'widget-cart__text',
    });

    this.cartButton = new Button({ classNames: 'widget-cart__button' });
    this.cartButton.getElement().addEventListener('click', (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      this.dispatch({ type: 'cart-addLine', payload: { prop1: productId, prop2: '' } });
    });
    this.insertChildren([this.cartButton]);
    if (this.quantity) this.insertChildren([this.cartText]);
  }

  public update(quantity: number): void {
    if (quantity === 1) this.insertChildren([this.cartText]);
    this.setAttributeIsInCart(quantity);
    this.cartText.setTextContent(`${quantity}`);
  }

  private setAttributeIsInCart(quantity: number): void {
    if (quantity > 0) {
      this.setAttribute({ name: 'data-set-is-in-cart', value: '' });
    } else this.removeAttribute({ name: 'data-set-is-in-cart' });
  }
}
