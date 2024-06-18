import './selectLimit.sass';
import { BaseComponent } from '../../../../components/baseComponent';
import { DispatchProducts } from '../../../../modules/products/types';

export class SelectLimit extends BaseComponent {
  dispatch: DispatchProducts;

  constructor(limits: string[], dispatch: DispatchProducts) {
    super({ tagName: 'div', classNames: 'limits-container' });
    this.dispatch = dispatch;
    const select = new BaseComponent({ tagName: 'select', classNames: 'limits__select' });
    limits.forEach((limit) => {
      const option = new BaseComponent<HTMLOptionElement>({ tagName: 'option', textContent: limit });
      option.getElement().value = limit;
      select.insertChild(option);
    });

    select.getElement().addEventListener('change', (e) => this.handleChangeSelect(e));
    this.insertChild(select);
  }

  private handleChangeSelect(e: Event): void {
    const target = e.currentTarget;
    if (target instanceof HTMLSelectElement) {
      const limit = target.value;
      this.dispatch({ type: 'change-limit', payload: { prop1: limit, prop2: '' } });
    }
  }
}
