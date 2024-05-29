import './productCard.sass';
import { BaseComponent } from '../../../components/baseComponent';

export class EmptyCard extends BaseComponent {
  constructor() {
    super({ tagName: 'div', classNames: 'product-card' });
    const imgConteiner = new BaseComponent({ tagName: 'div', classNames: 'product-card__img' });
    imgConteiner.setClassName('product-card_empty');

    const content = new BaseComponent({ tagName: 'div', classNames: 'product-card__content' });
    this.insertChildren([imgConteiner, content]);
  }
}
