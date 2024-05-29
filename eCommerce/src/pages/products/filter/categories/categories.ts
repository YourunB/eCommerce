import './categories.sass';
import { BaseComponent } from '../../../../components/baseComponent';
import { DispatchProducts, MappedCategories } from '../../../../modules/products/types';

const CLASS_ACTIVE = 'categories_element__active';
const CLASS_LI = 'categories_element';

export class Categories extends BaseComponent {
  dispatch: DispatchProducts;
  activeCategoryId: string;

  constructor(dispatch: DispatchProducts) {
    super({ tagName: 'ul', classNames: 'filters_categories' });
    this.dispatch = dispatch;
    this.activeCategoryId = '';
  }

  public renderCategories(categories: MappedCategories[]): void {
    this.element.innerHTML = '';
    this.setTextContent('Categories');

    const elementAllCategories = this.createElementLi({ id: '', name: 'All' });
    const list = categories.reduce<BaseComponent[]>(
      (elements, category) => [...elements, this.createElementLi(category)],
      []
    );

    this.insertChildren([elementAllCategories, ...list]);
  }

  private createElementLi(category: MappedCategories): BaseComponent {
    const classActive = this.activeCategoryId === category.id ? ` ${CLASS_ACTIVE}` : '';
    const element = new BaseComponent({
      tagName: 'li',
      textContent: category.name,
    });
    element.getElement().className = CLASS_LI + classActive;
    element.getElement().addEventListener('click', () => {
      this.activeCategoryId = category.id;
      this.removeAllClassActive();
      this.setClassActive(element);
      this.dispatch({ type: 'change-category', payload: { prop1: category.id, prop2: '' } });
    });
    return element;
  }

  private removeAllClassActive(): void {
    this.getChildren().forEach((li) => li.classList.remove(CLASS_ACTIVE));
  }

  private setClassActive(li: BaseComponent): void {
    li.setClassName(CLASS_ACTIVE);
  }
}
