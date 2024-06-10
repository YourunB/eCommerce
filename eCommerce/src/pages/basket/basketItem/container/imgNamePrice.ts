import state from '../../../../state/state';
import { LineItem } from '@commercetools/platform-sdk';
import { BaseComponent } from '../../../../components/baseComponent';

export class ContainerImgNamePrice extends BaseComponent {
  constructor(item: LineItem) {
    super({ tagName: 'div', classNames: 'basket__product-price-container' });

    const imgUrl = item.variant.images ? item.variant.images[0].url : '';
    const productImg = new BaseComponent({
      tagName: 'img',
      classNames: 'basket-item__img',
      attribute: { name: 'src', value: imgUrl },
    });

    const productName = new BaseComponent({ tagName: 'div', classNames: 'basket-item__product-name' });
    const p = new BaseComponent({
      tagName: 'a',
      textContent: item.name['en-GB'],
      attribute: { name: 'href', value: `${state.routes.products}#${item.id}` },
      classNames: 'product-name__p',
    });
    productName.insertChild(p);

    const textDiscountedPrice = item.price.discounted
      ? `€${(item.price.discounted.value.centAmount / 100).toFixed(2)}`
      : '';
    const textPrice = (item.price.value.centAmount / 100).toFixed(2);
    const price = new BaseComponent({
      tagName: 'span',
      textContent: `€${textPrice}`,
      classNames: 'product-price__span',
    });
    if (textDiscountedPrice) price.setClassName('product-price__discounted');
    const priceDiscounted = new BaseComponent({
      tagName: 'span',
      textContent: textDiscountedPrice,
      classNames: ['product-price__span'],
    });
    const priceContainer = new BaseComponent({ tagName: 'div', classNames: 'product__price-container' });
    priceContainer.insertChildren([priceDiscounted, price]);

    this.insertChildren([productImg, productName, priceContainer]);
  }
}
