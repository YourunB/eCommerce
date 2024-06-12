import { BaseComponent, BaseComponentProps } from '../../../components/baseComponent';
import './basketTotals.sass';

import { MyCart } from '../../../modules/cart/cart';

import { Dialog } from '../../../components/modalDialog/modalDialog';
import { DiscountCodeReference } from '@commercetools/platform-sdk';

export class BasketTotals extends BaseComponent {
  public totalsTitle: BaseComponent;
  public promoContainer: BaseComponent;
  public addPromoButton: BaseComponent;
  public promoInput: BaseComponent;
  public subTotal: BaseComponent;
  public promoDiscount: BaseComponent;
  public promo: BaseComponent;
  public removePromoButton: BaseComponent;
  public cart: MyCart;
  public promocodeId: string;

  constructor(props: BaseComponentProps) {
    super({ classNames: 'basket-totals__container', ...props });
    this.cart = new MyCart();
    console.log(this.cart.cart);
    this.promocodeId = '';

    const dialog = Dialog.getInstance();

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
      attribute: { name: 'type', value: 'button' },
      classNames: 'add-promo_button',
      textContent: 'Apply',
      parentNode: this.promoContainer.getElement(),
    });
    this.promo = new BaseComponent({
      tagName: 'div',
      classNames: ['discount-code', 'invisible'],
      parentNode: this.promoContainer.getElement(),
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

    this.insertChildren([this.totalsTitle, this.promoContainer, this.subTotal, this.promoDiscount]);

    this.addPromoButton.getElement().addEventListener('click', async () => {
      if (this.cart.cart.discountCodes.length > 0) {
        dialog.show('you may apply only one discount code');
        return;
      }
      const promocode = (this.promoInput.getElement() as HTMLInputElement).value;
      const resp = await this.cart.addDiscountCode(promocode);

      if (resp) {
        if (this.cart.cart.discountCodes[0].state === 'DoesNotMatchCart') {
          dialog.show('This discount code doesn`t apply to your product categories');
          return;
        }

        console.log(this.cart.cart);
        (this.promoInput.getElement() as HTMLInputElement).value === '';
        this.promo.removeClassName('invisible');
        this.promo.setTextContent(promocode);
        this.promo.insertChild(this.removePromoButton);
        this.promocodeId = this.cart.cart.discountCodes[0].discountCode.id.toString();
      }
    });
    this.removePromoButton.getElement().addEventListener('click', async () => {
      const discountCodeRef: DiscountCodeReference = {
        typeId: 'discount-code',
        id: this.promocodeId,
      };
      const resp = await this.cart.removeDiscountCode(discountCodeRef);
      if (resp) {
        this.promo.setClassName('invisible');

        console.log(this.cart.cart);
      }
    });
  }

  getDiscountOnTotalPrice(): string {
    return this.cart.cart?.discountOnTotalPrice
      ? (this.cart.cart.discountOnTotalPrice.discountedAmount.centAmount / 100).toFixed(2)
      : '0';
  }
  public updatePrices = (): void => {
    this.promoDiscount.setTextContent(`Coupon discount:  ${this.getDiscountOnTotalPrice()}`);
  };
}
