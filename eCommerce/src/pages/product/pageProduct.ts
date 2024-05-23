import { ErrorResponse, Product } from '@commercetools/platform-sdk';
import { BaseComponent, BaseComponentProps } from '../../components/baseComponent';
import { getProduct } from '../../modules/api/productItem';
import './pageProduct.sass';

export class PageProduct extends BaseComponent {
  private productImageContainer: BaseComponent;
  private productTextContainer: BaseComponent;
  private productPrice: BaseComponent;
  private productName: BaseComponent;
  private productDescription: BaseComponent;
  private productImg: BaseComponent;
  constructor(props: BaseComponentProps) {
    super({ classNames: 'page-product-container', ...props });
    this.productImageContainer = new BaseComponent({
      tagName: 'div',
      classNames: 'product-image_container',
      parentNode: this.element,
    });
    this.productImg = new BaseComponent({
      tagName: 'img',
      classNames: 'product-img',
      parentNode: this.productImageContainer.getElement(),
    });
    this.productTextContainer = new BaseComponent({
      tagName: 'div',
      classNames: 'product-text_container',
      parentNode: this.element,
    });
    this.productName = new BaseComponent({
      tagName: 'div',
      classNames: 'product-name',
      parentNode: this.productTextContainer.getElement(),
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
    getProduct().then((data: Product | ErrorResponse) => {
      if ('statusCode' in data) return;
      this.productName.setTextContent(data.masterData.current.name['en-GB']);
      this.productPrice.setTextContent(
        data.masterData.current.masterVariant.prices
          ? data.masterData.current.masterVariant.prices[0].value.centAmount.toString()
          : ''
      );
      this.productDescription.setTextContent(
        data.masterData.current.description ? data.masterData.current.description['en-GB'] : ''
      );
      this.productImg.setAttribute({
        name: 'src',
        value: data.masterData.current.masterVariant.images ? data.masterData.current.masterVariant.images[0].url : '',
      });
      return data;
    });
  }
}
