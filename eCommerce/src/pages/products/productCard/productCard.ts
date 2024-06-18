import './productCard.sass';
import { WidgetCart } from './widgetCart';
import { BaseComponent } from '../../../components/baseComponent';
import { Button } from '../../../components/basebutton/baseButton';
import { isLineItem } from '../../../components/helpers/predicates';
import { ProductsState } from '../../../modules/products/productsState';
import { DispatchProducts, MappedProducts } from '../../../modules/products/types';

const productsState = new ProductsState();

export class ProductCard extends BaseComponent {
  private dispatch: DispatchProducts;
  private product: MappedProducts;
  private plusButton!: Button;
  private widget!: WidgetCart;

  constructor(product: MappedProducts, dispatch: DispatchProducts) {
    super({
      tagName: 'a',
      classNames: 'product-card',
      attribute: { name: 'href', value: product.url },
    });

    this.dispatch = dispatch;
    this.product = product;

    const imgConteiner = new BaseComponent({ tagName: 'div', classNames: 'product-card__img' });
    const img = new BaseComponent({
      tagName: 'img',
      attribute: { name: 'src', value: product.photo },
      classNames: 'product-card__img',
    });
    imgConteiner.insertChildren([img, this.productWidget(product)]);
    if (product.discount) this.setAttribute({ name: 'discount', value: `${product.discount.percent}% OFF` });

    const content = new BaseComponent({ tagName: 'div', classNames: 'product-card__content' });
    const productName = new BaseComponent({
      tagName: 'p',
      classNames: 'product-card__name',
      textContent: `${product.name || ''}`,
    });

    content.insertChildren([productName, this.productDescription(product), this.productPrice(product)]);
    this.insertChildren([imgConteiner, content]);

    const action = { type: 'click-product', payload: { prop1: product.id, prop2: '' } } as const;
    this.element.addEventListener('click', (e: Event) => {
      e.preventDefault();
      dispatch(action);
    });
  }

  private productWidget(product: MappedProducts): BaseComponent {
    const cartLine = productsState.get(this.product.id);
    const quantity = isLineItem(cartLine) ? cartLine.quantity : 0;
    this.widget = new WidgetCart(quantity, product.id, this.dispatch);
    return this.widget;
  }

  public update(): void {
    const cartLine = productsState.get(this.product.id);
    if (cartLine) this.widget.update(cartLine);
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

  private productDescription(product: MappedProducts): BaseComponent {
    const container = new BaseComponent({ tagName: 'div', classNames: 'product-card__description-container' });
    const content = new BaseComponent({
      tagName: 'p',
      textContent: product.description,
      classNames: 'product-card__description-content',
    });
    container.insertChild(content);
    return container;
  }
}
