import './productsFooter.sass';
import { SelectLimit } from './selectLimit/selectLimit';
import { DispatchMain } from '../../../modules/products/types';
import { BaseComponent } from '../../../components/baseComponent';

export class ProductsFooter extends BaseComponent {
  constructor(limits: string[], dispatch: DispatchMain) {
    super({ tagName: 'footer', classNames: 'products-footer' });
    this.insertChild(new SelectLimit(limits, dispatch));
  }
}
