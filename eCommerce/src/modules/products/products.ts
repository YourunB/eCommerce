import state from '../../state/state';
import { PageProducts } from '../../pages/products/pageProducts';
import { mapProduct } from '../../components/helpers/mapProduct';
import { mapCategory } from '../../components/helpers/mapCategory';
import { filterLimit } from '../../components/helpers/filterLimit';
import { filterOffset } from '../../components/helpers/filterOffset';
import { queryCategories, queryProducts, url } from '../api/products';
import { filterCategory } from '../../components/helpers/filterCategory';
import { filterСentAmount } from '../../components/helpers/filterСentAmount';
import { ActionsMain, FilterRules, MappedCategories, MappedProducts } from './types';
import { CategoryPagedQueryResponse, PagedQueryResponse } from '@commercetools/platform-sdk';
import { isMappedCategories, isMappedProducts, isProductProjection } from '../../components/helpers/predicates';

const START_PAGE = 1;
const DEFAULT_LIMIT = '10';

export class Products {
  private filter: Map<FilterRules, string> = new Map(); // Map of functions (filters) to construct filter query
  private prop1 = '';
  private prop2 = '';
  private page: PageProducts;
  private categoriesList: MappedCategories[] | Error;
  private currentCategory: string | undefined;
  private _currentOffset: string;
  private _currentPage: number;
  private currentLimit: string;

  constructor() {
    this._currentOffset = '0';
    this._currentPage = START_PAGE;
    this.currentLimit = state.limits[0] || DEFAULT_LIMIT;
    this.categoriesList = new Error();
    this.page = new PageProducts(state.limits, this._currentPage, this.dispatch);
    this.addFilter(filterLimit, this.currentLimit);
    this.addFilter(filterOffset, this.currentOffset);
  }

  get currentOffset(): string {
    return `${(this._currentPage - 1) * +this.currentLimit}`;
  }

  set currentPage(page: number) {
    this._currentPage = page;
    this.page.currentPage = page;
    this.addFilter(filterOffset, this.currentOffset);
  }

  public getPage() {
    this.currentPage = 1;
    this.page.resetProducts();
    this.procesProducts();
    this.getCategories()
      .then((categories) => {
        if (isMappedCategories(categories)) {
          this.categoriesList = categories;
          this.page.renderFilters({ categories });
        }
      })
      .catch((error) => this.handleError(`${error}`));

    return this.page.getElement();
  }

  private handleError(error: string): void {
    this.page.showDialog(error);
  }

  public dispatch = (action: ActionsMain) => {
    const { type } = action;
    this.prop1 = action.payload.prop1;
    this.prop2 = action.payload.prop2;

    switch (type) {
      case 'change-category':
        this.currentPage = 1;
        this.currentCategory = this.prop1;
        this.removeAllCategoryFilters();
        if (this.currentCategory) this.addFilter(filterCategory, this.currentCategory);
        this.procesProducts(true);
        break;
      case 'click-product':
        window.location.hash = this.prop1; // <- product.id (for example: #9b34a224-cbc0-4687-8996-da5f958d2bbd)
        break;
      case 'change-limit':
        this.currentPage = 1;
        this.currentLimit = this.prop1;
        this.addFilter(filterLimit, this.currentLimit);
        this.procesProducts(true);
        break;
      case 'change-price-filter':
        this.currentPage = 1;
        this.addFilter(filterСentAmount, `${+this.prop1 * 100}-${+this.prop2 * 100}`);
        this.procesProducts(true);
        break;
      case 'change-offset':
        this.currentPage = +this.prop1;
        this.procesProducts(true);
        break;
    }
  };

  private procesProducts(fadeout = false): void {
    this.page.buttons = 'disabled';
    this.getProducts()
      .then((products) => {
        if (isMappedProducts(products)) {
          this.page.renderProducts(products, fadeout);
        } else {
          this.page.renderEmptyCard();
        }
      })
      .catch((error) => this.handleError(`${error}`))
      .finally(() => {
        this.page.buttons = 'enabled';
      });
  }

  private removeAllCategoryFilters(): void {
    this.filter.delete(filterCategory);
  }

  public async getProducts(): Promise<Error | MappedProducts[] | undefined> {
    url.pruducts.search = '';
    const query = this.applyFilters(url.pruducts);
    const products = await queryProducts(query);

    if (products instanceof Error) {
      return products;
    } else {
      this.page.countPages = Math.ceil((products.total || 0) / +this.currentLimit);
      return this.mapProducts(products);
    }
  }

  // Apply all filters and construct url query
  private applyFilters(url: URL): URL {
    this.filter.forEach((value, filter) => filter(url, value));
    return url;
  }

  // add any filter rule
  private addFilter(filter: FilterRules, value: string): void {
    this.filter.set(filter, value);
  }

  // remove any filter rule
  private removeFilter(filter: FilterRules): void {
    this.filter.delete(filter);
  }

  public async getCategories(): Promise<MappedCategories[] | Error> {
    const categories = await queryCategories();
    return categories instanceof Error ? categories : this.mapCategories(categories);
  }

  private mapProducts(products: PagedQueryResponse): MappedProducts[] | undefined {
    return products.results?.filter(isProductProjection).map(mapProduct);
  }

  private mapCategories(categories: CategoryPagedQueryResponse): MappedCategories[] {
    return categories.results.map(mapCategory);
  }
}
