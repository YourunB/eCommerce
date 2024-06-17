import './control.sass';
import { SectionSearch } from '../search/search';
import { BaseComponent } from '../../../components/baseComponent';
import { ActionsProducts, DispatchProducts, ResetButtonNames } from '../../../modules/products/types';

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

type ResetButton = {
  [index in ResetButtonNames]?: BaseComponent;
};

export class SectionControl extends BaseComponent {
  dispatch: DispatchProducts;
  sectionSearch: SectionSearch;
  resetContainer: BaseComponent;
  resetButtons: ResetButton;

  constructor(dispatch: DispatchProducts) {
    super({ tagName: 'div', classNames: 'products__control-container' });
    this.resetButtons = {};
    this.dispatch = dispatch;
    const sortContainer = new BaseComponent({ tagName: 'div', classNames: 'sort-container' });
    this.resetContainer = new BaseComponent({ tagName: 'div', classNames: 'reset-container' });
    const label = new BaseComponent({ tagName: 'label', textContent: 'Sort by:', classNames: 'sort__label' });
    const select = new BaseComponent({ tagName: 'select', classNames: 'sort__select' });
    sortContainer.insertChildren([label, select]);
    options.forEach(([text, field, direction]) => {
      const option = new BaseComponent<HTMLOptionElement>({
        tagName: 'option',
        textContent: text,
        classNames: 'sort_option',
      });
      option.setAttribute({ name: 'value', value: `${field}*${direction}` });
      select.insertChild(option);
    });
    this.sectionSearch = new SectionSearch(dispatch);

    select.getElement().addEventListener('change', (e) => this.handleChange(e));
    this.insertChildren([sortContainer, this.resetContainer, this.sectionSearch]);
  }

  public resetSearchInput(): void {
    this.sectionSearch.resetSearchInput();
  }

  public setSearchDataList(values: string[]): void {
    this.sectionSearch.setDataList(values);
  }

  private handleChange(e: Event): void {
    const { target } = e;
    if (target instanceof HTMLSelectElement) {
      const [field, direction] = target.value.split('*');
      const action: ActionsProducts = { type: 'change-sort', payload: { prop1: field, prop2: direction } };
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

  public addResetButton(name: ResetButtonNames, btn: BaseComponent): void {
    this.removeResetButton(name);
    this.resetButtons[name] = btn;
    this.resetContainer.insertChild(btn);
  }

  public removeResetButton(name: ResetButtonNames): void {
    try {
      this.resetButtons[name]?.destroy();
      delete this.resetButtons[name];
    } catch (error) {
      console.warn('Reset Button. ', error);
    }
  }
}
