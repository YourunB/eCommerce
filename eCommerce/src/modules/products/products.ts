import state from '../../state/state';
import { PageProducts } from '../../pages/products/pageProducts';
import { mapProduct } from '../../components/helpers/mapProduct';
import { mapCategory } from '../../components/helpers/mapCategory';
import { filterLimit } from '../../components/helpers/filterLimit';
import { queryCategories, queryProducts, url } from '../api/products';
import { filterCategory } from '../../components/helpers/filterCategory';
import { ActionsMain, FilterRules, MappedCategories, MappedProducts } from './types';
import { CategoryPagedQueryResponse, PagedQueryResponse } from '@commercetools/platform-sdk';
import { isMappedCategories, isMappedProducts, isProductProjection } from '../../components/helpers/predicates';

export class Products {
  private filter: Map<FilterRules, string> = new Map(); // Map of functions (filters) to construct filter query
  private prop1 = '';
  private prop2 = '';
  private page: PageProducts;
  private categoriesList: MappedCategories[] | Error;

  constructor() {
    this.categoriesList = new Error();
    this.page = new PageProducts(state.limits, this.dispatch);
    this.addFilter(filterLimit, state.limits[0]);
  }

  public getPage() {
    this.page.resetProducts();
    this.procesProducts();
    this.getCategories().then((categories) => {
      if (isMappedCategories(categories)) {
        this.categoriesList = categories;
        this.page.renderFilters({ categories });
      } // TODO else показать заглушку "нет карточек"
    });

    return this.page.getElement();
  }

  public dispatch = (action: ActionsMain) => {
    const { type } = action;
    this.prop1 = action.payload.prop1;
    this.prop2 = action.payload.prop2;

    switch (type) {
      case 'change-category':
        this.removeAllCategoryFilters();
        if (this.prop1) this.addFilter(filterCategory, this.prop1);
        this.procesProducts(true);
        break;
      case 'click-product':
        window.location.hash = this.prop1; // <- product.id (for example: #9b34a224-cbc0-4687-8996-da5f958d2bbd)
        break;
      case 'change-limit':
        this.addFilter(filterLimit, this.prop1);
        this.procesProducts(true);
        break;
    }
  };

  private procesProducts(fadeout = false): void {
    this.getProducts().then((products) => {
      if (isMappedProducts(products)) this.page.renderProducts(products, fadeout);
      // TODO else показать заглушку "нет карточек"
    });
  }

  private removeAllCategoryFilters(): void {
    this.filter.delete(filterCategory);
  }

  public async getProducts() {
    // this.addFilter(filterСentAmountMax, '5000');
    //TODO добавить фильтр минимальной цены
    url.pruducts.search = '';
    const query = this.applyFilters(url.pruducts);
    const products = await queryProducts(query);
    return products instanceof Error ? products : this.mapProducts(products);
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
