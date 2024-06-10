import './basketButton.sass';
import { BaseComponent, BaseComponentProps } from '../../../components/baseComponent';

export class BasketButton extends BaseComponent {
  public addButton: BaseComponent;
  public addButtonIcon: BaseComponent;
  public removeButton: BaseComponent;
  constructor(props: BaseComponentProps) {
    super({ classNames: 'basket-button__container', ...props });
    this.addButton = new BaseComponent({
      tagName: 'div',
      textContent: 'Add to cart',
      classNames: 'add_button',
      parentNode: this.element,
    });
    this.addButtonIcon = new BaseComponent({
      tagName: 'div',
      classNames: 'add_button_icon',
      parentNode: this.addButton.getElement(),
    });
    this.removeButton = new BaseComponent({
      tagName: 'div',
      classNames: 'remove_button',
      parentNode: this.element,
    });
  }
}
