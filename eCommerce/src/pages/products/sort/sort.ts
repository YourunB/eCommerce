import './sort.sass';
import { BaseComponent } from '../../../components/baseComponent';
import { ActionsMain, DispatchMain } from '../../../modules/products/types';

export type SortDirection = 'asc' | 'desc';
export type SortField = 'price' | 'name.en-GB' | 'createdAt';
export type SortOption = [string, SortField, SortDirection];

const options: SortOption[] = [
  ['price ↑', 'price', 'asc'],
  ['price ↓', 'price', 'desc'],
  ['name a-z', 'name.en-GB', 'asc'],
  ['name z-a', 'name.en-GB', 'desc'],
  ['created ↑', 'createdAt', 'asc'],
  ['created ↓', 'createdAt', 'desc'],
];

export class SectionSort extends BaseComponent {
  dispatch: DispatchMain;

  constructor(dispatch: DispatchMain) {
    super({ tagName: 'div', classNames: 'products__sort-container' });
    this.dispatch = dispatch;
    const label = new BaseComponent({ tagName: 'label', textContent: 'Sort by:', classNames: 'sort__label' });
    const select = new BaseComponent({ tagName: 'select', classNames: 'sort__select' });
    options.forEach(([text, field, direction]) => {
      const option = new BaseComponent<HTMLOptionElement>({
        tagName: 'option',
        textContent: text,
        classNames: 'sort_option',
      });
      option.setAttribute({ name: 'value', value: `${field}*${direction}` });
      select.insertChild(option);
    });

    select.getElement().addEventListener('change', (e) => this.handleChange(e));
    this.insertChildren([label, select]);
  }

  private handleChange(e: Event): void {
    const { target } = e;
    if (target instanceof HTMLSelectElement) {
      const [field, direction] = target.value.split('*');
      const action: ActionsMain = { type: 'change-sort', payload: { prop1: field, prop2: direction } };
      this.dispatch(action);
    }
  }

  set buttons(status: 'enabled' | 'disabled') {
    if (status === 'disabled') {
      this.setClassName('sort-container_disabled');
    } else {
      this.removeClassName('sort-container_disabled');
    }
  }
}
