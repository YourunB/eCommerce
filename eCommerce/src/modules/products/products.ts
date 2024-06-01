import state from '../../state/state';
import { waitToken } from '../../components/helpers/waitToken';
import { PageProducts } from '../../pages/products/pageProducts';
import { mapProduct } from '../../components/helpers/mapProduct';
import { Dialog } from '../../components/modalDialog/modalDialog';
import { filterSort } from '../../components/helpers/filterSort';
import { mapCategory } from '../../components/helpers/mapCategory';
import { filterLimit } from '../../components/helpers/filterLimit';
import { filterOffset } from '../../components/helpers/filterOffset';
import { filterSearch } from '../../components/helpers/filterSearch';
import { queryCategories, queryProducts, url } from '../api/products';
import { filterCategory } from '../../components/helpers/filterCategory';
import { SortDirection, SortField } from '../../pages/products/sort/sort';
import { filterСentAmount } from '../../components/helpers/filterСentAmount';
import { ActionsProducts, FilterRules, MappedCategories, MappedProducts } from './types';
import { CategoryPagedQueryResponse, PagedQueryResponse } from '@commercetools/platform-sdk';
import { isMappedCategories, isMappedProducts, isProductProjection } from '../../components/helpers/predicates';

const START_PAGE = 1;
const DEFAULT_LIMIT = '10';
const DEFAULT_SORT_FIELD: SortField = 'price';
const DEFAULT_SORT_DIRECTION: SortDirection = 'asc';

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
  private currentSort: [SortField, SortDirection];
  private dialog: Dialog;

  constructor() {
    this._currentOffset = '0';
    this._currentPage = START_PAGE;
    this.currentSort = [DEFAULT_SORT_FIELD, DEFAULT_SORT_DIRECTION];
    this.currentLimit = state.limits[0] || DEFAULT_LIMIT;
    this.categoriesList = new Error();
    this.dialog = Dialog.getInstance();
    this.page = new PageProducts(state.limits, this._currentPage, this.dispatch);
    this.addFilter(filterLimit, this.currentLimit);
    this.addFilter(filterOffset, this.currentOffset);
    this.addFilter(filterSort, `${this.currentSort[0]} ${this.currentSort[1]}`);
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
    this.page.resetProducts();
    this.getCategories()
      .then((categories) => {
        if (isMappedCategories(categories)) {
          this.categoriesList = categories;
          this.removeAllCategoryFilters();

          const { search } = window.location;
          const idCategoryRoute = search.replace('?', '').replace(encodeURI(state.rootCategory), '');
          if (idCategoryRoute) {
            this.handleCategoryRoutes(idCategoryRoute, this.categoriesList);
          } else {
            this.currentCategory = state.rootCategory;
          }
          this.page.setCategoryActive(this.currentCategory || state.rootCategory);
          this.page.renderFilters({ categories });
          this.procesProducts();
        }
      })
      .catch((error) => this.handleError(`${error}`));

    return this.page.getElement();
  }

  private handleCategoryRoutes(idCategory: string, categoriesList: MappedCategories[]): void {
    this.currentCategory = idCategory;
    const [category] = categoriesList.filter((category) => category.id === idCategory);
    const nameCategory = category?.name === state.rootCategory || !category ? state.rootCategory : category?.name;
    document.title = nameCategory;
    this.addFilter(filterCategory, this.currentCategory);
  }

  private handleError(error: string): void {
    this.page.showDialog(error);
  }

  public dispatch = (action: ActionsProducts) => {
    const { type } = action;
    this.prop1 = action.payload.prop1;
    this.prop2 = action.payload.prop2;

    switch (type) {
      case 'change-category':
        this.changeCategory(this.prop1, this.prop2);
        break;
      case 'click-product':
        window.location.hash = this.prop1;
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
      case 'change-sort':
        this.addFilter(filterSort, `${this.prop1} ${this.prop2}`);
        this.procesProducts(true);
        break;
      case 'search':
        this.currentPage = 1;
        this.addFilter(filterSearch, `${this.prop1}`);
        this.procesProducts(true);
        break;
    }
  };

  private changeCategory(id: string, name: string): void {
    window.history.pushState({}, '', `${window.location.pathname}?${id}`);
    this.currentPage = 1;
    this.currentCategory = id;
    document.title = name;
    this.removeAllCategoryFilters();
    if (this.currentCategory && this.currentCategory !== state.rootCategory) {
      this.addFilter(filterCategory, this.currentCategory);
    }
    this.procesProducts(true);
  }

  private procesProducts(fadeout = false): void {
    this.page.buttons = 'disabled';
    this.getProducts()
      .then((products) => {
        if (isMappedProducts(products)) {
          this.page.setSearchDataList(products.map((product) => product.name));
          this.page.renderProducts(products, fadeout);
        } else {
          this.dialog.show('There are no products available at the selected conditions', 'warning');
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
    await waitToken(10, 100);
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
    await waitToken(10, 100);
    const categories = await queryCategories();
    return categories instanceof Error ? categories : this.mapCategories(categories);
  }

  private mapProducts(products: PagedQueryResponse): MappedProducts[] | undefined {
    return products.results?.filter(isProductProjection).map(mapProduct);
  }

  private mapCategories(categories: CategoryPagedQueryResponse): MappedCategories[] {
    const flatCategories = categories.results.map(mapCategory);
    const splittedCategories = this.splitSubCategory(flatCategories);
    return splittedCategories;
  }

  private splitSubCategory(categories: MappedCategories[]) {
    const mainCategories = categories.filter((category) => !category.parent);
    const subCategories = categories.filter((category) => category.parent);

    subCategories.forEach((category) => {
      const [mainCategory] = mainCategories.filter((c) => `${c.id}` === `${category.parent?.id}`);
      mainCategory.subcategory.push(category);
    });
    return mainCategories;
  }
}
