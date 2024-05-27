import { MappedProducts } from '../../modules/products/types';
import { ProductProjection } from '@commercetools/platform-sdk';

export function mapProduct(product: ProductProjection): MappedProducts {
  const {
    id,
    masterVariant: { prices, images },
  } = product;
  let code: string;
  let cent: number;
  let discount: number;

  const name = product.name['en-GB'];
  if (!prices) {
    console.warn(`missing prices for the product ${name}`);
    code = '';
    cent = 0;
    discount = 0;
  } else {
    code = prices[0].value.currencyCode;
    cent = prices[0].value.centAmount;
    discount = prices[0].discounted ? +prices[0].discounted?.value.centAmount : 0;
  }
  const centAmount = cent ? (cent / 100).toFixed(2) : '';
  const photo = images ? images[0].url : '';
  const discountCentAmount = discount ? (discount / 100).toFixed(2) : '';
  const percentDiscount = discount ? Math.round(100 - (discount / cent) * 100).toFixed(0) : '';

  const mappedProduct: MappedProducts = {
    id,
    name,
    photo,
    centAmount,
    currencyCode: code,
  };
  if (discount) mappedProduct.discount = { centAmount: discountCentAmount, percent: percentDiscount };

  return mappedProduct;
}
