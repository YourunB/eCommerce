import { BaseComponent } from '../../../components/baseComponent';
import { Button } from '../../../components/basebutton/baseButton';
import { DispatchProducts } from '../../../modules/products/types';
import { ProductsStateLine } from '../../../modules/products/productsState';
import { isLineItem } from '../../../components/helpers/predicates';

export class WidgetCart extends BaseComponent {
  private dispatch: DispatchProducts;
  private quantity: number;
  private cartButton: Button;
  private cartText: BaseComponent;
  private localState: ProductsStateLine;
  private spinner: BaseComponent | undefined;

  constructor(quantity: number, productId: string, dispatch: DispatchProducts) {
    super({ tagName: 'section', classNames: 'widget-cart__container' });
    this.quantity = quantity;
    this.dispatch = dispatch;
    this.setAttributeIsInCart(this.quantity);
    this.localState = 'idle';

    this.cartText = new BaseComponent({
      tagName: 'span',
      textContent: `${this.quantity}`,
      classNames: 'widget-cart__text',
    });

    this.cartButton = new Button({ classNames: 'widget-cart__button' });
    this.cartButton.getElement().addEventListener('click', (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.localState === 'isFetching') return;
      this.localState = 'isFetching';
      if (this.quantity > 0) {
        this.localState = 'idle';
        return;
      }
      this.cartButton.setClassName('widget-cart__button_is-fetching');
      this.spinner = this.setSpinner(this);
      this.dispatch({ type: 'cart-addLine', payload: { prop1: productId, prop2: '' } });
    });
    this.insertChildren([this.cartButton]);
    if (this.quantity) this.insertChildren([this.cartText]);
  }

  public update(stateLine: ProductsStateLine): void {
    this.cartButton.removeClassName('widget-cart__button_is-fetching');
    this.localState = 'idle';
    if (this.spinner) this.deleteSpinner(this.spinner);

    if (isLineItem(stateLine)) {
      const { quantity } = stateLine;
      if (quantity === 1) this.insertChildren([this.cartText]);
      this.setAttributeIsInCart(quantity);
      this.cartText.setTextContent(`${quantity}`);
      this.quantity = quantity;
    }
  }

  private setAttributeIsInCart(quantity: number): void {
    if (quantity > 0) {
      /* If a product is added to the cart, it will have the attribute 'data-set-is-in-cart' and change its style*/
      this.setAttribute({ name: 'data-set-is-in-cart', value: '' });
    } else this.removeAttribute({ name: 'data-set-is-in-cart' });
  }

  private setSpinner(container: BaseComponent): BaseComponent {
    const spinnerContainer = new BaseComponent({ tagName: 'div', classNames: 'spinner__container' });

    container.insertChild(spinnerContainer);
    return spinnerContainer;
  }

  private deleteSpinner(spinner: BaseComponent): void {
    setTimeout(() => {
      if (this.spinner) spinner.destroy();
      this.spinner = undefined;
    }, 1800);
  }
}
