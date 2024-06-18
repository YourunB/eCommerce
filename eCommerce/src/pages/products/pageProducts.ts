import './pageProducts.sass';
import { Cart } from '@commercetools/platform-sdk';
import { SectionControl } from './control/control';
import { EmptyCard } from './productCard/emptyCard';
import { ProductCard } from './productCard/productCard';
import { BaseComponent } from '../../components/baseComponent';
import { PropsFilters, SectionFilters } from './filter/filter';
import { ProductsFooter } from './productsFooter/productsFooter';
import { ProductsState } from '../../modules/products/productsState';
import { Dialog, TypeMessage } from '../../components/modalDialog/modalDialog';
import { DispatchProducts, MappedProducts, ResetButtonNames } from '../../modules/products/types';

const TRANSITION_DURATION = 1000;
const productsState = new ProductsState();

export class PageProducts extends BaseComponent {
  private dispatch: DispatchProducts;
  private footer: ProductsFooter;
  private sectionControl: SectionControl;
  private sectionProducts: BaseComponent;
  private sectionFilters: SectionFilters;
  private dialog: Dialog;

  constructor(limits: string[], countPages: number, dispatch: DispatchProducts) {
    super({ tagName: 'article', classNames: 'page-products-container' });
    this.dispatch = dispatch;
    this.dialog = Dialog.getInstance();
    this.sectionProducts = new BaseComponent({ tagName: 'section', classNames: 'products__container' });
    this.sectionFilters = new SectionFilters(dispatch);
    this.sectionControl = new SectionControl(dispatch);
    this.footer = new ProductsFooter(limits, countPages, dispatch);

    this.insertChildren([this.sectionFilters, this.sectionControl, this.sectionProducts, this.footer]);
  }

  public resetAnnualInput(): void {
    this.sectionFilters.resetAnnualInput();
  }

  public resetPerennialInput(): void {
    this.sectionFilters.resetPerennialInput();
  }

  public resetPriceInputs(): void {
    this.sectionFilters.resetPriceInputs();
  }

  public resetSearchInput(): void {
    this.sectionControl.resetSearchInput();
  }

  public addResetButton(name: ResetButtonNames, btn: BaseComponent): void {
    this.sectionControl.addResetButton(name, btn);
  }

  public removeResetButton(name: ResetButtonNames): void {
    this.sectionControl.removeResetButton(name);
  }

  public setCategoryActive(name: string): void {
    this.sectionFilters.setCategoryActive(name);
  }

  public setSearchDataList(values: string[]): void {
    this.sectionControl.setSearchDataList(values);
  }

  public showDialog(text: string, type: TypeMessage = 'info'): void {
    this.dialog.show(text, type);
  }

  set countPages(count: number) {
    this.footer.countPages = count;
  }

  set currentPage(page: number) {
    this.footer.currentPage = page;
  }

  set buttons(status: 'enabled' | 'disabled') {
    this.footer.buttons = status;
    this.sectionControl.buttons = status;
  }

  public resetProducts(): void {
    this.sectionProducts.getElement().innerHTML = '';
  }

  public renderProducts(products: MappedProducts[], cart: Cart, fadeout: boolean) {
    if (fadeout) this.sectionProducts.setClassName('fadeout');
    setTimeout(() => {
      this.sectionProducts.getElement().innerHTML = '';
      const cards = products.reduce<ProductCard[]>((container, product) => {
        const { lineItems } = cart;
        const [lineItem] = lineItems.filter((item) => item.productId === product.id);
        if (lineItem) productsState.set(lineItem.productId, lineItem);

        const card = new ProductCard(product, this.dispatch);
        productsState.subscribe(product.id, () => card.update());
        return [...container, card];
      }, []);
      this.sectionProducts.insertChildren([...cards]);
      this.sectionProducts.removeClassName('fadeout');
    }, TRANSITION_DURATION);
  }

  public renderEmptyCard() {
    this.sectionProducts.setClassName('fadeout');
    setTimeout(() => {
      this.sectionProducts.getElement().innerHTML = '';
      const card = new EmptyCard();
      this.sectionProducts.insertChild(card);
      this.sectionProducts.removeClassName('fadeout');
    }, TRANSITION_DURATION);
  }

  public renderFilters(props: PropsFilters): void {
    this.sectionFilters.renderFilters({ categories: props.categories });
  }
}
