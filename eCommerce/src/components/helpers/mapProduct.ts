import { MappedProducts } from '../../modules/products/types';
import { ProductProjection } from '@commercetools/platform-sdk';

export function mapProduct(product: ProductProjection): MappedProducts {
  const { prices } = product.masterVariant;
  const centAmount = prices ? prices[0].value.centAmount / 100 : 0;
  const currencyCode = prices ? prices[0].value.currencyCode : '';
  const photo = product.masterVariant.images ? product.masterVariant.images[0].url : '';

  return {
    name: product.name['en-GB'],
    id: product.id,
    centAmount: centAmount.toFixed(2),
    currencyCode,
    photo,
  };
}
