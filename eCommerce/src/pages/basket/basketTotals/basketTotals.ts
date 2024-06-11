import { BaseComponent, BaseComponentProps } from '../../../components/baseComponent';
import './basketTotals.sass';

import { MyCart } from '../../../modules/cart/cart';

export class BasketTotals extends BaseComponent {
  public totalsTitle: BaseComponent;
  public promoContainer: BaseComponent;
  public addPromoButton: BaseComponent;
  public promoInput: BaseComponent;
  public subTotal: BaseComponent;
  public promoDiscount: BaseComponent;
  public total: BaseComponent;
  public promo: BaseComponent;
  public removePromoButton: BaseComponent;
  public cart: MyCart;

  constructor(props: BaseComponentProps) {
    super({ classNames: 'basket-totals__container', ...props });

    this.cart = new MyCart();
    console.log(this.cart.cart);

    this.totalsTitle = new BaseComponent({
      tagName: 'div',
      textContent: 'Cart Totals',
      classNames: 'totals-title',
    });
    this.promoContainer = new BaseComponent({
      tagName: 'form',
      classNames: 'promo-container',
    });
    this.promoInput = new BaseComponent({
      tagName: 'input',
      classNames: 'promo-input',
      attribute: { name: 'placeholder', value: 'Enter coupon code here...' },
      parentNode: this.promoContainer.getElement(),
    });
    this.addPromoButton = new BaseComponent({
      tagName: 'button',
      classNames: 'add-promo_button',
      textContent: 'Apply',
      parentNode: this.promoContainer.getElement(),
    });
    this.promo = new BaseComponent({
      tagName: 'div',
      classNames: 'promo',
      textContent: 'promo',
    });
    this.removePromoButton = new BaseComponent({
      tagName: 'div',
      classNames: 'remove-promo_button',
      parentNode: this.promo.getElement(),
    });
    this.subTotal = new BaseComponent({
      tagName: 'div',
      classNames: 'subtotal',
      textContent: 'Subtotal',
    });
    this.promoDiscount = new BaseComponent({
      tagName: 'div',
      classNames: 'promo-discount',
      textContent: 'Coupon discount',
    });
    const totalPrice = this.cart.cart.totalPrice.centAmount
      ? (this.cart.cart.totalPrice.centAmount / 100).toFixed(2)
      : '';
    this.total = new BaseComponent({
      tagName: 'div',
      classNames: 'Total',
      textContent: `Total €${totalPrice}`,
    });

    this.insertChildren([this.totalsTitle, this.promoContainer, this.subTotal, this.promoDiscount, this.total]);

    this.addPromoButton.getElement().addEventListener('click', async () => {
      const promocode = (this.promoInput.getElement() as HTMLInputElement).value;
      const resp = await this.cart.addDiscountCode(promocode);
      if (resp) {
        this.cart.recalculate();
        console.log(this.cart.cart);
        this.promoContainer.insertChild(this.promo);
        (this.promoInput.getElement() as HTMLInputElement).value === '';
      }
    });
  }
}
