import './basketItem.sass';
import { MyCart } from '../../../modules/cart/cart';
import { LineItem } from '@commercetools/platform-sdk';
import { ContainerImgNamePrice } from './container/imgNamePrice';
import { BaseComponent } from '../../../components/baseComponent';
import { Button } from '../../../components/basebutton/baseButton';
import { isLineItem } from '../../../components/helpers/predicates';

const mycart = new MyCart();

export class BasketItem extends BaseComponent {
  private _item: LineItem;
  private quantityText: BaseComponent;
  private total: BaseComponent;

  constructor(item: LineItem) {
    super({ tagName: 'section', classNames: 'basket-item' });
    this._item = item;

    const containerImgNamePrice = new ContainerImgNamePrice(item);

    const quantityContainer = new BaseComponent({ tagName: 'div', classNames: 'basket-item__quantity-container' });
    const { quantity } = item;
    this.quantityText = new BaseComponent({ tagName: 'span', textContent: `${quantity}` });
    const btnMinusItem = new Button({ textContent: '-', classNames: 'basket-item__btn-quantity' });
    const btnPlusItem = new Button({ textContent: '+', classNames: 'basket-item__btn-quantity' });
    btnMinusItem.setOnclick(() => this.handleDecrement());
    btnPlusItem.setOnclick(() => this.handleIncrement());
    quantityContainer.insertChildren([btnMinusItem, this.quantityText, btnPlusItem]);

    const textTotal = (item.totalPrice.centAmount / 100).toFixed(2);
    this.total = new BaseComponent({
      tagName: 'span',
      textContent: `€${textTotal}`,
      classNames: 'product-price__span',
    });

    const btnDeleteItem = new Button({ classNames: 'basket-item__dtn-delete' });
    btnDeleteItem.setOnclick(() => this.handleDelete());

    const quantityAndTotal = new BaseComponent({ tagName: 'div', classNames: 'basket__quantity-total-container' });
    quantityAndTotal.insertChildren([quantityContainer, this.total, btnDeleteItem]);
    this.insertChildren([containerImgNamePrice, quantityAndTotal]);
    mycart.subscribe(this.update);
  }

  private handleIncrement(): void {
    mycart.addLineItems([{ productId: this._item.productId, quantity: 1 }]);
  }

  private handleDecrement(): void {
    if (this._item.quantity < 2) return;
    mycart.removeLineItems([{ lineItemId: this._item.id, quantity: 1 }]);
  }

  private handleDelete(): void {
    const { id } = this._item;
    mycart.removeLineItems([{ lineItemId: id }]).then(() => mycart.deleteSubscribe(this.update));
    this.destroy();
  }

  private update = (): void => {
    const { lineItems } = mycart.cart;
    if (!this._item || lineItems.length === 0) return;

    const [lineItem] = lineItems.filter((product) => product.productId === this._item.productId);
    if (!isLineItem(lineItem)) return;

    this._item = lineItem;
    this.quantityText.setTextContent(`${lineItem.quantity}`);
    const textTotal = (lineItem?.totalPrice.centAmount / 100).toFixed(2);
    this.total.setTextContent(`${textTotal}`);
  };
}
