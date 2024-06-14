import state from '../../../../state/state';
import { LineItem } from '@commercetools/platform-sdk';
import { BaseComponent } from '../../../../components/baseComponent';

export class ContainerImgNamePrice extends BaseComponent {
  private price: BaseComponent;
  private priceDiscounted: BaseComponent;

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

    const { price, discountedPrice } = this.getItemPrice(item);
    this.price = new BaseComponent({
      tagName: 'span',
      textContent: price,
      classNames: 'product-price__span',
    });
    if (discountedPrice) this.price.setClassName('product-price__discounted');

    this.priceDiscounted = new BaseComponent({
      tagName: 'span',
      textContent: discountedPrice,
      classNames: ['product-price__span'],
    });

    const priceContainer = new BaseComponent({ tagName: 'div', classNames: 'product__price-container' });
    priceContainer.insertChildren([this.priceDiscounted, this.price]);

    this.insertChildren([productImg, productName, priceContainer]);
  }

  private getItemPrice(item: LineItem) {
    const isCouponApplied = item.totalPrice.centAmount / item.quantity !== item.price.value.centAmount;
    const textDiscountedPrice =
      item.price.discounted || isCouponApplied
        ? `€${(item.totalPrice.centAmount / item.quantity / 100).toFixed(2)}`
        : '';
    const textPrice = `€${(item.price.value.centAmount / 100).toFixed(2)}`;
    return { price: textPrice, discountedPrice: textDiscountedPrice };
  }

  public update = (item: LineItem): void => {
    const { price, discountedPrice } = this.getItemPrice(item);
    this.price.setTextContent(price);
    this.priceDiscounted.setTextContent(discountedPrice);
    if (discountedPrice) {
      this.price.setClassName('product-price__discounted');
    } else {
      this.price.removeClassName('product-price__discounted');
    }
  };
}
