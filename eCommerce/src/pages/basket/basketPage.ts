import './basketPage.sass';
import { BaseComponent } from '../../components/baseComponent';
import { Button } from '../../components/basebutton/baseButton';
import { deleteCartApi } from '../../modules/api/cart';
import { MyCart } from '../../modules/cart/cart';
import { router } from '../../modules/router';
import { BasketItem } from './basketItem/basketItem';
import { BasketTotals } from './basketTotals/basketTotals';
import '../../assets/images/svg/delete.svg';

const myCart = new MyCart();

export class PageBasket extends BaseComponent {
  public basketHeader: BaseComponent;
  public basketMain: BaseComponent;
  public totalPrice: BaseComponent;
  public msgEmptyCart: BaseComponent;
  public msgEmptyCartText: BaseComponent;
  public btnClearBasket: Button;
  public btnOpenCatalog: Button;
  public btnClearBasketNo: Button;
  public btnClearBasketYes: Button;
  public cartId: string;
  public basketItems: BaseComponent;
  public clearConfirmOverlay: BaseComponent;
  public clearConfirmForm: BaseComponent;
  public clearConfirmFormTitle: BaseComponent;
  public basketTotals: BasketTotals;

  constructor() {
    super({ tagName: 'div', classNames: 'basket-page' });
    this.cartId = '';
    this.basketHeader = new BaseComponent({
      tagName: 'div',
      classNames: 'basket-header',
      textContent: 'BASKET',
      parentNode: this.element,
    });

    this.basketMain = new BaseComponent({
      tagName: 'div',
      classNames: 'basket-main',
      parentNode: this.element,
    });

    this.basketItems = new BaseComponent({ tagName: 'div', classNames: 'basket-items' });
    this.basketTotals = new BasketTotals({ tagName: 'div' });

    this.basketMain.insertChildren([this.basketItems, this.basketTotals]); // <-- insert a coupon section here

    this.msgEmptyCart = new BaseComponent({
      tagName: 'div',
      classNames: ['msg-empty', 'msg-empty_hide'],
      parentNode: this.element,
    });

    this.msgEmptyCartText = new BaseComponent({
      tagName: 'h3',
      classNames: 'msg-empty__text',
      textContent: 'Empty cart',
      parentNode: this.msgEmptyCart.getElement(),
    });

    this.btnOpenCatalog = new Button({
      textContent: 'Open catalog',
      classNames: 'msg-empty__btn',
      parentNode: this.msgEmptyCart.getElement(),
    });

    this.btnOpenCatalog.getElement().addEventListener('click', () => {
      router.route('/yourunb-JSFE2023Q4/ecommerce/products');
    });

    this.clearConfirmOverlay = new BaseComponent({
      tagName: 'div',
      classNames: 'confirm-overlay',
      parentNode: this.element,
    });

    this.clearConfirmForm = new BaseComponent({
      tagName: 'div',
      classNames: 'confirm-modal',
      parentNode: this.clearConfirmOverlay.getElement(),
    });

    this.clearConfirmFormTitle = new BaseComponent({
      tagName: 'h3',
      classNames: 'confirm-modal__title',
      textContent: 'Clear basket?',
      parentNode: this.clearConfirmForm.getElement(),
    });

    this.btnClearBasketNo = new Button({
      textContent: 'Cancel',
      parentNode: this.clearConfirmForm.getElement(),
    });

    this.btnClearBasketYes = new Button({
      textContent: 'Clear',
      classNames: 'basket-page__btn-clear',
      parentNode: this.clearConfirmForm.getElement(),
    });

    this.btnClearBasket = new Button({
      classNames: 'basket-page__btn-clear',
      parentNode: this.basketHeader.getElement(),
    });

    this.btnClearBasket.getElement().innerHTML = `
      <img src="delete.svg">
      Clear basket
    `;

    this.totalPrice = new BaseComponent({
      tagName: 'p',
      textContent: 'Total price: 0 €',
      classNames: 'basket-price',
      parentNode: this.basketTotals.getElement(),
    });

    this.btnClearBasketNo.getElement().addEventListener('click', () => {
      this.clearConfirmOverlay.getElement().classList.remove('confirm-overlay_show');
    });

    this.btnClearBasketYes.getElement().addEventListener('click', () => {
      this.clearConfirmOverlay.getElement().classList.remove('confirm-overlay_show');
      this.clearCart();
    });

    this.btnClearBasket.getElement().addEventListener('click', () => {
      this.clearConfirmOverlay.getElement().classList.add('confirm-overlay_show');
    });

    this.createProductsItems();
  }

  public createProductsItems() {
    myCart.deleteSubscribe(this.update);
    const items = myCart.cart?.lineItems.map((product) => new BasketItem(product));
    this.basketItems.insertChildren(items);
    myCart.subscribe(this.update);

    this.totalPrice.setTextContent(`Total price: ${this.getTotalPrice()} €`);
    this.basketTotals.promoDiscount.setTextContent(`Coupon discount: ${this.getDiscountOnTotalPrice()} €`);
    this.basketTotals.subTotal.setTextContent(`Subtotal: ${this.getSubTotalPrice()} €`);
    this.checkEmptyCart();
  }

  public update = (): void => {
    this.totalPrice.setTextContent(`Total price: ${this.getTotalPrice()} €`);
    this.basketTotals.promoDiscount.setTextContent(`Coupon discount: ${this.getDiscountOnTotalPrice()} €`);
    this.basketTotals.subTotal.setTextContent(`Subtotal: ${this.getSubTotalPrice()} €`);
    this.checkEmptyCart();
  };

  private getTotalPrice(): string {
    return myCart.cart?.totalPrice?.centAmount ? (myCart.cart.totalPrice.centAmount / 100).toFixed(2) : '0';
  }

  private getDiscountOnTotalPrice(): string {
    let totalDiscount = 0;
    myCart.cart.lineItems.forEach((item) =>
      item.discountedPricePerQuantity.forEach((discount) =>
        discount.discountedPrice.includedDiscounts.forEach(
          (includedDiscount) => (totalDiscount += includedDiscount.discountedAmount.centAmount * item.quantity)
        )
      )
    );
    return (totalDiscount / 100).toFixed(2);
  }

  private getSubTotalPrice(): string {
    const subTotalPrice = Number(this.getTotalPrice()) + Number(this.getDiscountOnTotalPrice());
    return subTotalPrice.toFixed(2).toString();
  }

  public checkEmptyCart() {
    if (myCart.cart.lineItems.length === 0) {
      this.msgEmptyCart.getElement().classList.remove('msg-empty_hide');
      this.basketTotals.getElement().classList.add('invisible');
      this.btnClearBasket.getElement().classList.add('unvisible');
    } else {
      this.msgEmptyCart.getElement().classList.add('msg-empty_hide');
      this.basketTotals.getElement().classList.remove('invisible');
      this.btnClearBasket.getElement().classList.remove('unvisible');
    }
  }

  public clearProductsItems(itemClass: string) {
    const arrItems = document.getElementsByClassName(itemClass) as HTMLCollectionOf<HTMLElement>;
    for (let i = arrItems.length - 1; i >= 0; i -= 1) {
      arrItems[i].remove();
    }
  }

  public clearCart() {
    deleteCartApi(myCart.cart.id, myCart.cart.version)
      .then(() => myCart.create())
      .then(() => this.updateCart());
  }

  public updateCart() {
    this.clearProductsItems('basket-item');
    this.createProductsItems();
  }
}
