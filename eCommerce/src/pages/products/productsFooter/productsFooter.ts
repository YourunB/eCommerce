import './productsFooter.sass';
import { Pagination } from '../pagination/pagination';
import { SelectLimit } from './selectLimit/selectLimit';
import { DispatchProducts } from '../../../modules/products/types';
import { BaseComponent } from '../../../components/baseComponent';

export class ProductsFooter extends BaseComponent {
  private pagination: Pagination;

  constructor(limits: string[], countPages: number, dispatch: DispatchProducts) {
    super({ tagName: 'footer', classNames: 'products-footer' });
    this.pagination = new Pagination(countPages, dispatch);
    this.insertChildren([new SelectLimit(limits, dispatch), this.pagination]);
  }

  set countPages(count: number) {
    this.pagination.countPages = count;
  }

  set currentPage(page: number) {
    this.pagination.currentPage = page;
  }

  set buttons(status: 'enabled' | 'disabled') {
    this.pagination.buttons = status;
  }
}
