import './resetButton.sass';
import { Button } from '../../../components/basebutton/baseButton';
import { DispatchProducts, ResetButtonNames } from '../../../modules/products/types';

export class ResetButton extends Button {
  private _name: string;
  dispatch: DispatchProducts;

  constructor(name: ResetButtonNames, dispatch: DispatchProducts) {
    super({ textContent: name, classNames: 'button_reset' });
    this._name = name;
    this.dispatch = dispatch;
    const action = { type: 'reset-btn', payload: { prop1: this._name, prop2: '' } } as const;
    this.setOnclick(() => this.dispatch(action));
  }
}
