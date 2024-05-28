import './productCard.sass';
import { BaseComponent } from '../../../components/baseComponent';
import { DispatchMain, MappedProducts } from '../../../modules/products/types';

export class ProductCard extends BaseComponent {
  constructor(product: MappedProducts, dispatch: DispatchMain) {
    super({ tagName: 'div', classNames: 'product-card' });
    const imgConteiner = new BaseComponent({ tagName: 'div', classNames: 'product-card__img' });
    const img = new BaseComponent({
      tagName: 'img',
      attribute: { name: 'src', value: product.photo },
      classNames: 'product-card__img',
    });
    imgConteiner.insertChild(img);
    if (product.discount) this.setAttribute({ name: 'discount', value: `${product.discount.percent}% OFF` });

    const content = new BaseComponent({ tagName: 'div', classNames: 'product-card__content' });
    const productName = new BaseComponent({
      tagName: 'p',
      classNames: 'product-card__name',
      textContent: `${product.name || ''}`,
    });

    content.insertChildren([productName, this.productPrice(product)]);
    this.insertChildren([imgConteiner, content]);

    const action = { type: 'click-product', payload: { prop1: product.id, prop2: '' } } as const;
    this.setOnclick(() => dispatch(action));
  }

  private productPrice(product: MappedProducts): BaseComponent {
    const container = new BaseComponent({ tagName: 'div', classNames: 'product-card__price-container' });
    const actualPrice = product.discount?.centAmount || product.centAmount;
    const actualPriceHTML = new BaseComponent({
      tagName: 'span',
      textContent: `€${actualPrice}`,
      classNames: 'price-container__actual-price',
    });
    container.insertChild(actualPriceHTML);

    if (product.discount) {
      const oldPriceHTML = new BaseComponent({
        tagName: 'span',
        textContent: `€${product.centAmount}`,
        classNames: 'price-container__old-price',
      });
      container.insertChild(oldPriceHTML);
    }

    return container;
  }
}
