import { DiscountCodeReference } from '@commercetools/platform-sdk';
import { BaseComponent, BaseComponentProps } from '../../../components/baseComponent';
import { MyCart } from '../../../modules/cart/cart';

export class DiscountCode extends BaseComponent {
  public removePromoButton: BaseComponent;
  public cart: MyCart;
  constructor(props: BaseComponentProps) {
    super({ classNames: 'discount-code', ...props });

    this.cart = new MyCart();

    this.removePromoButton = new BaseComponent({
      tagName: 'div',
      classNames: 'remove-promo_button',
      parentNode: this.element,
    });
    this.removePromoButton.getElement().addEventListener('click', this.removePromoCode);
  }

  async removePromoCode() {
    const promocodeId = this.cart.cart.discountCodes[0].discountCode.id.toString();
    const discountCodeRef: DiscountCodeReference = {
      typeId: 'discount-code',
      id: promocodeId,
    };
    const resp = await this.cart.removeDiscountCode(discountCodeRef);
    if (resp) {
      this.cart.recalculate();
      console.log(this.cart.cart);
      this.element.remove();
    }
  }
}
