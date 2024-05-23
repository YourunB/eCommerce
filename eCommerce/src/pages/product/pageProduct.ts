import { BaseComponent, BaseComponentProps } from '../../components/baseComponent';
import { getProduct } from '../../modules/api/productItem';
import state from '../../state/state';
import './pageProduct.sass';

export class PageProduct extends BaseComponent {
  private productImageContainer: BaseComponent;
  private productTextContainer: BaseComponent;
  private productPrice: BaseComponent;
  private productDescription: BaseComponent;
  constructor(props: BaseComponentProps) {
    super({ classNames: 'page-product-container', ...props });
    getProduct(state.access_token.access_token);
    this.productImageContainer = new BaseComponent({
      tagName: 'div',
      classNames: 'product-image_container',
      parentNode: this.element,
    });
    this.productTextContainer = new BaseComponent({
      tagName: 'div',
      classNames: 'product-text_container',
      parentNode: this.element,
    });
    this.productPrice = new BaseComponent({
      tagName: 'div',
      classNames: 'product-price',
      parentNode: this.productTextContainer.getElement(),
    });
    this.productDescription = new BaseComponent({
      tagName: 'div',
      classNames: 'product-description',
      parentNode: this.productTextContainer.getElement(),
    });
  }
}
