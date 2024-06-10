import './basketPage.sass';
import { BaseComponent } from '../../components/baseComponent';
import { Button } from '../../components/basebutton/baseButton';

export class PageBasket extends BaseComponent {
  public basketHeader: BaseComponent;
  public basketMain: BaseComponent;
  public basketFooter: BaseComponent;
  public btnPagination: Button;
  public btnClearBasket: Button;

  constructor() {
    super({ tagName: 'div', classNames: 'basket-page' });
    this.basketHeader = new BaseComponent({
      tagName: 'div',
      classNames: 'basket-header',
      parentNode: this.element,
    });

    this.basketMain = new BaseComponent({
      tagName: 'div',
      classNames: 'basket-main',
      parentNode: this.element,
    });

    this.basketFooter = new BaseComponent({
      tagName: 'div',
      classNames: 'basket-footer',
      parentNode: this.element,
    });

    this.btnClearBasket = new Button({
      textContent: 'Clear basket',
      classNames: 'basket-page__btn',
      parentNode: this.basketHeader.getElement(),
    });

    this.btnPagination = new Button({
      textContent: '1',
      classNames: 'basket-page__btn',
      parentNode: this.basketFooter.getElement(),
    });
  }
}
