import './productCard.sass';
import { BaseComponent } from '../../../components/baseComponent';
import { DispatchMain, MappedProducts } from '../../../modules/products/types';

export class ProductCard extends BaseComponent {
  constructor(product: MappedProducts, dispatch: DispatchMain) {
    super({ tagName: 'div' });
    const productCard = new BaseComponent({ tagName: 'div', classNames: 'product-card' });
    const imgConteiner = new BaseComponent({ tagName: 'div', classNames: 'product-card__img' });
    const img = new BaseComponent({
      tagName: 'img',
      attribute: { name: 'src', value: product.photo },
      classNames: 'product-card__img',
    });
    imgConteiner.insertChild(img);
    const content = new BaseComponent({ tagName: 'div', classNames: 'product-card__content' });
    const productName = new BaseComponent({
      tagName: 'p',
      classNames: 'product-card__name',
      textContent: `${product.name || ''}`,
    });
    const productPrice = new BaseComponent({
      tagName: 'p',
      classNames: 'product-card__price',
      textContent: `€${product.centAmount}`,
    });

    content.insertChildren([productName, productPrice]);
    productCard.insertChildren([imgConteiner, content]);

    const action = { type: 'click-product', payload: { prop1: product.id, prop2: '' } } as const;
    productCard.setOnclick(() => dispatch(action));
    return productCard;
  }
}
