import { Categories } from './categories/categories';
import { BaseComponent } from '../../../components/baseComponent';
import { DispatchMain, MappedCategories } from '../../../modules/products/types';

export type PropsFilters = {
  categories: MappedCategories[];
};

export class SectionFilters extends BaseComponent {
  categories: Categories;
  constructor(dispatch: DispatchMain) {
    super({ tagName: 'section', classNames: 'products__filters' });
    this.categories = new Categories(dispatch);
    this.insertChildren([this.categories]);
    return this;
  }

  public renderFilters(props: PropsFilters): void {
    this.categories.renderCategories(props.categories);
  }
}
