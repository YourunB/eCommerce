import { BaseComponent, BaseComponentProps } from '../../../components/baseComponent';
import './basketTotals.sass';
import { MyCart } from '../../../modules/cart/cart';
import { Dialog } from '../../../components/modalDialog/modalDialog';
import { DiscountCode, DiscountCodeInfo, DiscountCodeReference, LocalizedString } from '@commercetools/platform-sdk';
import { getDiscountCodeById } from '../../../modules/api/cart';

const dialog = Dialog.getInstance();
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
  public discounted: DiscountCodeInfo | undefined;

  constructor(props: BaseComponentProps) {
    super({ classNames: ['basket-totals__container', 'invisible'], ...props });
    this.cart = new MyCart();

    this.promocodeId = '';
    this.checkIsDiscounted();

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
    this.promoInput.getElement().addEventListener('keydown', this.keyEnterHandler);
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
    });
    this.promoDiscount = new BaseComponent({
      tagName: 'div',
      classNames: 'promo-discount',
    });

    this.insertChildren([this.totalsTitle, this.promoContainer, this.subTotal, this.promoDiscount]);

    this.addPromoButton.getElement().addEventListener('click', this.addDiscount);
    this.removePromoButton.getElement().addEventListener('click', this.removeDiscount());
    this.cart.subscribe(this.resetPromos);
  }
  checkIsDiscounted = () => {
    const allDiscounts = this.cart.cart.discountCodes;
    this.discounted = allDiscounts?.find((item) => item.state === 'MatchesCart');
    if (this.discounted) {
      this.promocodeId = this.discounted.discountCode.id;
      getDiscountCodeById(this.promocodeId).then((data: Error | DiscountCode) => {
        const discountChipText = (data.name as LocalizedString)['en-GB'];
        this.showDiscounterChip(discountChipText);
      });
    }
  };
  showDiscounterChip = (content: string) => {
    this.promo.removeClassName('invisible');
    this.promo.setTextContent(content);
    this.promo.insertChild(this.removePromoButton);
  };
  addDiscount = async () => {
    if (this.cart.cart.discountCodes?.find((item) => item.state === 'MatchesCart')) {
      dialog.show('you may apply only one discount code');
      return;
    }
    const promocode = (this.promoInput.getElement() as HTMLInputElement).value;
    const resp = await this.cart.addDiscountCode(promocode);
    console.log(this.cart.cart);

    if (resp) {
      (this.promoInput.getElement() as HTMLInputElement).value = '';
      const promoResp = this.cart.cart.discountCodes.at(-1);
      if (promoResp?.state === 'DoesNotMatchCart') {
        dialog.show('This discount code doesn`t apply to your product categories');
        this.removeDiscount(promoResp.discountCode.id)();
        return;
      }

      this.checkIsDiscounted();
    }
  };
  removeDiscount = (id?: string) => async () => {
    const discountCodeRef: DiscountCodeReference = {
      typeId: 'discount-code',
      id: id || this.promocodeId,
    };
    const resp = await this.cart.removeDiscountCode(discountCodeRef);
    if (resp) {
      this.promo.setClassName('invisible');
    }
  };

  resetPromos = () => {
    this.promo.setClassName('invisible');
    this.checkIsDiscounted();
  };

  keyEnterHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.addDiscount();
    }
  };
}
