import { Categories } from './categories/categories';
import { FilterPrice } from './filterPrice/filterPrice';
import { FilterAnnuals } from './attributes/annual/annual';
import { BaseComponent } from '../../../components/baseComponent';
import { Button } from '../../../components/basebutton/baseButton';
import { DispatchProducts, MappedCategories } from '../../../modules/products/types';

export type PropsFilters = {
  categories: MappedCategories[];
};

export class SectionFilters extends BaseComponent {
  private categories: Categories;
  private filterPrice: FilterPrice;
  private filterAnnual: FilterAnnuals;

  constructor(dispatch: DispatchProducts) {
    super({ tagName: 'section', classNames: 'products__filters' });
    this.categories = new Categories(dispatch);
    this.filterPrice = new FilterPrice(dispatch);
    this.filterAnnual = new FilterAnnuals(dispatch);
    const asideButton = this.createAsideButton();
    this.insertChildren([this.categories, this.filterPrice, this.filterAnnual, asideButton]);
    return this;
  }

  public resetAnnualInput(): void {
    this.filterAnnual.resetAnnualInput();
  }

  public resetPerennialInput(): void {
    this.filterAnnual.resetPerennialInput();
  }

  public resetPriceInputs(): void {
    this.filterPrice.resetPriceInputs();
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
