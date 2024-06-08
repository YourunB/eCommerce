import { LineItem } from '@commercetools/platform-sdk';
import { Callback, Subscribers } from '../../state/types';

export class ProductsState {
  private static instance: unknown;
  private subscribers: Subscribers = {};
  private _props: {
    [index: string]: LineItem;
  } = {};

  constructor() {
    if (!ProductsState.instance) {
      ProductsState.instance = this;
    }
    return ProductsState.instance as ProductsState;
  }

  public reset(): void {
    this._props = {};
    this.subscribers = {};
  }

  public getState() {
    return this._props;
  }

  public get(key: string): LineItem | undefined {
    return this._props[key];
  }

  public set(key: string, value: LineItem) {
    this._props[key] = value;
    this.subscribers[key]?.forEach((callback) => callback());
  }

  public subscribe(event: string, calback: Callback) {
    if (!(event in this.subscribers)) this.subscribers[event] = [];
    this.subscribers[event].push(calback);
  }
}
