import { Callback } from '../../state/types';
import { isCart } from '../../components/helpers/predicates';
import { Dialog } from '../../components/modalDialog/modalDialog';
import { createAnonymousCart, createMyCart, UpdateMyCart } from '../api/cart';
import { BaseAddress, Cart, CartUpdateAction, DiscountCodeReference } from '@commercetools/platform-sdk';

const dialog = Dialog.getInstance();
const ERR_MSG_NO_CART_ID = 'cart.id is undefined';

export type UpdateProducts = {
  productId: string;
  quantity: number;
};

type RemoveLineItem = {
  lineItemId: string;
  quantity?: number;
};

export class MyCart {
  public static _cart: Cart;
  private static subscribers: Callback[];

  constructor() {
    MyCart.subscribers ??= [];
  }

  /**
   * A cart is created for the **anonymous** user.
   */
  public async createAnonymous() {
    try {
      const response = await createAnonymousCart();
      if (isCart(response)) {
        this.cart = response;
      } else throw new Error(response.message);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * A cart is created for an **authorized** user.
   */
  public async create() {
    try {
      const response = await createMyCart();
      if (isCart(response)) {
        this.cart = response;
      } else throw new Error(response.message);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Add or update `lineItems` in the current cart.
   * @example const cart = new MyCart();
   * cart.addLineItems([{ productId: "9e803804-9956-4d99-df0d12dd8372", quantity: 1 }]);
   */
  public async addLineItems(products: UpdateProducts[]) {
    const action = 'addLineItem';
    const actions: CartUpdateAction[] = products.map((product) => ({ ...product, action }));
    return this.updateCart(actions);
  }

  public async removeLineItems(products: RemoveLineItem[]) {
    const action = 'removeLineItem';
    const actions: CartUpdateAction[] = products.map((product) => ({ ...product, action }));
    return this.updateCart(actions);
  }

  public async addDiscountCode(code: string) {
    const action = 'addDiscountCode';
    const actions: CartUpdateAction = { action, code };
    return this.updateCart([actions]);
  }

  public async removeDiscountCode(code: DiscountCodeReference) {
    const action = 'removeDiscountCode';
    const actions: CartUpdateAction = { action, discountCode: code };
    return this.updateCart([actions]);
  }

  public async setBillingAddress(address: BaseAddress) {
    const action = 'setBillingAddress';
    const actions: CartUpdateAction = { action, address };
    return this.updateCart([actions]);
  }

  public async setShippingAddress(address: BaseAddress) {
    const action = 'setShippingAddress';
    const actions: CartUpdateAction = { action, address };
    return this.updateCart([actions]);
  }

  /**
   * Запускает обновление корзины, чтобы привести цены и скидки в актуальное состояние. Со временем они могут устареть, если в течение некоторого времени не производилось обновление корзины, а цены на товары за это время изменились.
   */
  public async recalculate() {
    const action = 'recalculate';
    const actions: CartUpdateAction = { action, updateProductData: false };
    this.updateCart([actions]);
  }

  private async updateCart(actions: CartUpdateAction[]) {
    try {
      if (!this.cart?.id) throw new Error(ERR_MSG_NO_CART_ID);
      const version = Number(this.cart.version);
      const response = await UpdateMyCart(this.cart.id, { version, actions });
      if (isCart(response)) {
        this.cart = response;
        return this.cart;
      } else throw new Error(response.message);
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown): void {
    if (typeof error === 'object' && error) {
      if ('message' in error) dialog.show(`${error.message}`, 'warning');
    } else {
      dialog.show(`${error}`, 'warning');
    }
  }

  /**
   * A **current** cart that you are working on.
   */
  get cart() {
    return MyCart._cart;
  }

  set cart(value: Cart) {
    MyCart._cart = value;
    MyCart.subscribers?.forEach((callback) => callback());
  }

  public subscribe(callback: Callback): void {
    MyCart.subscribers.push(callback);
  }

  public deleteSubscribe(callback: Callback): void {
    MyCart.subscribers = MyCart.subscribers.filter((subscriber) => subscriber !== callback);
  }
}
