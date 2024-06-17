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
  private btnDeleteItem: Button;
  private btnMinusItem: Button;
  private btnPlusItem: Button;
  private containerImgNamePrice: ContainerImgNamePrice;

  constructor(item: LineItem) {
    super({ tagName: 'section', classNames: 'basket-item' });
    this._item = item;

    this.containerImgNamePrice = new ContainerImgNamePrice(item);

    const quantityContainer = new BaseComponent({ tagName: 'div', classNames: 'basket-item__quantity-container' });
    const { quantity } = item;
    this.quantityText = new BaseComponent({ tagName: 'span', textContent: `${quantity}` });
    this.btnMinusItem = new Button({ textContent: '-', classNames: 'basket-item__btn-quantity' });
    this.btnPlusItem = new Button({ textContent: '+', classNames: 'basket-item__btn-quantity' });
    this.btnMinusItem.setOnclick(() => this.handleDecrement());
    this.btnPlusItem.setOnclick(() => this.handleIncrement());
    quantityContainer.insertChildren([this.btnMinusItem, this.quantityText, this.btnPlusItem]);

    const textTotal = (item.totalPrice.centAmount / 100).toFixed(2);
    this.total = new BaseComponent({
      tagName: 'span',
      textContent: `€${textTotal}`,
      classNames: 'product-price__span',
    });

    this.btnDeleteItem = new Button({ classNames: 'basket-item__dtn-delete' });
    this.btnDeleteItem.setOnclick(() => this.handleDelete());

    const quantityAndTotal = new BaseComponent({ tagName: 'div', classNames: 'basket__quantity-total-container' });
    quantityAndTotal.insertChildren([quantityContainer, this.total, this.btnDeleteItem]);
    this.insertChildren([this.containerImgNamePrice, quantityAndTotal]);
    mycart.subscribe(this.update);
  }

  private blockControls(block: boolean): void {
    if (block) {
      this.btnDeleteItem.off();
      this.btnMinusItem.off();
      this.btnPlusItem.off();
    } else {
      this.btnDeleteItem.on();
      this.btnMinusItem.on();
      this.btnPlusItem.on();
    }
  }

  private handleIncrement(): void {
    this.blockControls(true);
    mycart.addLineItems([{ productId: this._item.productId, quantity: 1 }]).finally(() => this.blockControls(false));
  }

  private handleDecrement(): void {
    if (this._item.quantity < 2) return;
    this.blockControls(true);
    mycart.removeLineItems([{ lineItemId: this._item.id, quantity: 1 }]).finally(() => this.blockControls(false));
  }

  private handleDelete(): void {
    this.blockControls(true);
    const { id } = this._item;
    mycart
      .removeLineItems([{ lineItemId: id }])
      .then((result) => {
        if (!result) return;
        mycart.deleteSubscribe(this.update);
        this.destroy();
      })
      .finally(() => this.blockControls(false));
  }

  private update = (): void => {
    const { lineItems } = mycart.cart;
    if (!this._item || lineItems.length === 0) return;

    const [lineItem] = lineItems.filter((product) => product.productId === this._item.productId);
    if (!isLineItem(lineItem)) return;

    this._item = lineItem;
    this.quantityText.setTextContent(`${lineItem.quantity}`);
    const textTotal = (lineItem?.totalPrice.centAmount / 100).toFixed(2);
    this.total.setTextContent(`€${textTotal}`);
    this.containerImgNamePrice.update(this._item);
  };
}
