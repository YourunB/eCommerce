import { DispatchMain, MappedCategories } from '../../../modules/products/types';
import { BaseComponent } from '../../../components/baseComponent';
import { Categories } from './categories/categories';

export type PropsFilters = {
  categories: MappedCategories[];
};

export class SectionFilters extends BaseComponent {
  categories: Categories;
  constructor(dispatch: DispatchMain) {
    super({ tagName: 'section', classNames: 'page-main-filters__container' });
    this.categories = new Categories(dispatch);
    this.insertChildren([this.categories]);
    return this;
  }

  public renderFilters(props: PropsFilters): void {
    this.categories.renderCategories(props.categories);
  }
}
