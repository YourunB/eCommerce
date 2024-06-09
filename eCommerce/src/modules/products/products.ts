import state from '../../state/state';
import { MyCart } from '../cart/cart';
import { ProductsState } from './productsState';
import { waitToken } from '../../components/helpers/waitToken';
import { PageProducts } from '../../pages/products/pageProducts';
import { mapProduct } from '../../components/helpers/mapProduct';
import { Dialog } from '../../components/modalDialog/modalDialog';
import { filterSort } from '../../components/helpers/filterSort';
import { mapCategory } from '../../components/helpers/mapCategory';
import { filterLimit } from '../../components/helpers/filterLimit';
import { filterOffset } from '../../components/helpers/filterOffset';
import { filterSearch } from '../../components/helpers/filterSearch';
import { filterAnnual } from '../../components/helpers/filterAnnual';
import { queryCategories, queryProducts, url } from '../api/products';
import { filterCategory } from '../../components/helpers/filterCategory';
import { ResetButton } from '../../pages/products/resetButton/resetButton';
import { filterPerennial } from '../../components/helpers/filterPerennial';
import { filterСentAmount } from '../../components/helpers/filterСentAmount';
import { SortDirection, SortField } from '../../pages/products/control/control';
import { CategoryPagedQueryResponse, PagedQueryResponse } from '@commercetools/platform-sdk';
import { ActionsProducts, FilterRules, MappedCategories, MappedProducts, ResetButtonNames } from './types';
import { isMappedCategories, isMappedProducts, isProductProjection } from '../../components/helpers/predicates';

const START_PAGE = 1;
const DEFAULT_LIMIT = '10';
const DEFAULT_SORT_FIELD: SortField = 'price';
const DEFAULT_SORT_DIRECTION: SortDirection = 'asc';
const productsState = new ProductsState();
const cart = new MyCart();

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
      case 'cart-addLine':
        cart.addLineItems([{ productId: this.prop1, quantity: 1 }]).then((cart) => {
          if (!cart) return;
          const [lineCart] = cart.lineItems.filter((item) => item.productId === this.prop1);
          productsState.set(lineCart.productId, lineCart);
        });
        break;
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
        this.addFilter(filterСentAmount, `${+this.prop1 * 100}-${+this.prop2 * 100}`, 'price');
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
        this.addFilter(filterSearch, `${this.prop1}`, 'search');
        this.procesProducts(true);
        break;
      case 'reset-btn':
        this.currentPage = 1;
        this.removeFilter(this.prop1 as ResetButtonNames);
        this.procesProducts(true);
        break;
      case 'change-annual':
        if (this.prop1 === 'true') {
          this.addFilter(filterAnnual, `${this.prop1}`, 'annual');
          this.removeFilter('perennial');
        } else {
          this.removeFilter('annual');
        }
        this.currentPage = 1;
        this.procesProducts(true);
        break;
      case 'change-perennial':
        if (this.prop1 === 'true') {
          this.addFilter(filterPerennial, `${this.prop1}`, 'perennial');
          this.removeFilter('annual');
        } else {
          this.removeFilter('perennial');
        }
        this.currentPage = 1;
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
    productsState.reset();
    this.getProducts()
      .then((products) => {
        if (isMappedProducts(products)) {
          this.page.setSearchDataList(products.map((product) => product.name));
          this.page.renderProducts(products, cart.cart, fadeout);
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

  // add filter rule
  private addFilter(filter: FilterRules, value: string, name?: ResetButtonNames): void {
    if (name) this.page.addResetButton(name, new ResetButton(name, this.dispatch));
    this.filter.set(filter, value);
  }

  // remove filter rule
  private removeFilter(filterName: ResetButtonNames): void {
    this.page.removeResetButton(filterName);
    switch (filterName) {
      case 'price':
        this.page.resetPriceInputs();
        this.filter.delete(filterСentAmount);
        break;
      case 'search':
        this.page.resetSearchInput();
        this.filter.delete(filterSearch);
        break;
      case 'annual':
        this.page.resetAnnualInput();
        this.filter.delete(filterAnnual);
        break;
      case 'perennial':
        this.page.resetPerennialInput();
        this.filter.delete(filterPerennial);
        break;
      default:
        break;
    }
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
