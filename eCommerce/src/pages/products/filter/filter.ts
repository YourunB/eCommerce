import { Categories } from './categories/categories';
import { FilterPrice } from './filterPrice/filterPrice';
import { BaseComponent } from '../../../components/baseComponent';
import { Button } from '../../../components/basebutton/baseButton';
import { DispatchProducts, MappedCategories } from '../../../modules/products/types';

export type PropsFilters = {
  categories: MappedCategories[];
};

export class SectionFilters extends BaseComponent {
  categories: Categories;

  constructor(dispatch: DispatchProducts) {
    super({ tagName: 'section', classNames: 'products__filters' });
    this.categories = new Categories(dispatch);
    const asideButton = this.createAsideButton();
    this.insertChildren([this.categories, new FilterPrice(dispatch), asideButton]);
    return this;
  }

  public renderFilters(props: PropsFilters): void {
    this.categories.renderCategories(props.categories);
  }

  public setCategoryActive(name: string): void {
    this.categories.setClassActive(name);
  }

  private createAsideButton(): Button {
    const btn = new Button({ classNames: ['products__filters__aside-btn'] });
    btn.setOnclick(() => this.handleButton());
    return btn;
  }

  private handleButton(): void {
    if (this.getElement().classList.contains('open')) {
      this.removeClassName('open');
    } else {
      this.setClassName('open');
    }
  }
}
