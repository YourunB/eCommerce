import { PageProducts } from '../../pages/products/pageProducts';
import { mapProduct } from '../../components/helpers/mapProduct';
import { mapCategory } from '../../components/helpers/mapCategory';
import { queryCategories, queryProducts, url } from '../api/products';
import { filterCategory } from '../../components/helpers/filterCategory';
import { ActionsMain, FilterRules, MappedCategories, MappedProducts } from './types';
import { isMappedCategories, isMappedProducts, isProductProjection } from '../../components/helpers/predicates';
import { CategoryPagedQueryResponse, PagedQueryResponse } from '@commercetools/platform-sdk';

export class Products {
  private filter: Map<FilterRules, string> = new Map(); // Map of functions (filters) to construct filter query
  private prop1 = '';
  private prop2 = '';
  private page: PageProducts;
  private categoriesList: MappedCategories[] | Error;

  constructor() {
    this.categoriesList = new Error();
    this.page = new PageProducts(this.dispatch);
  }

  public getPage() {
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
        this.procesProducts();
        break;
      case 'click-product':
        alert(`redirect to product id: ${this.prop1}`);
        break;
    }
  };

  private procesProducts(): void {
    this.getProducts().then((products) => {
      if (isMappedProducts(products)) this.page.renderProducts(products);
      // TODO else показать заглушку "нет карточек"
    });
  }

  private removeAllCategoryFilters(): void {
    this.filter.delete(filterCategory);
  }

  public async getProducts() {
    // this.addFilter(filterLimit, '40');
    // this.addFilter(filterCategory, 'b9f4ad80-1058-4e22-9eba-015883bc58bf');
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
