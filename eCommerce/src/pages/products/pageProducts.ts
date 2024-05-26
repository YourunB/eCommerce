import './pageProducts.sass';
import { ProductCard } from './productCard/productCard';
import { BaseComponent } from '../../components/baseComponent';
import { PropsFilters, SectionFilters } from './filter/filter';
import { ProductsFooter } from './productsFooter/productsFooter';
import { DispatchMain, MappedProducts } from '../../modules/products/types';

const TRANSITION_DURATION = 1000;

export class PageProducts extends BaseComponent {
  private dispatch: DispatchMain;
  private footer: ProductsFooter;
  private sectionProducts: BaseComponent;
  private sectionFilters: SectionFilters;

  constructor(limits: string[], countPages: number, dispatch: DispatchMain) {
    super({ tagName: 'article', classNames: 'page-products-container' });
    this.dispatch = dispatch;
    const sectionHero = new BaseComponent({ tagName: 'section', classNames: 'products__hero', textContent: 'hero' });
    this.sectionProducts = new BaseComponent({ tagName: 'section', classNames: 'products__container' });
    this.sectionFilters = new SectionFilters(dispatch);
    this.footer = new ProductsFooter(limits, countPages, dispatch);

    this.insertChildren([sectionHero, this.sectionFilters, this.sectionProducts, this.footer]);
  }

  set countPages(count: number) {
    this.footer.countPages = count;
  }

  set currentPage(page: number) {
    this.footer.currentPage = page;
  }

  set buttons(status: 'enabled' | 'disabled') {
    this.footer.buttons = status;
  }

  public resetProducts(): void {
    this.sectionProducts.getElement().innerHTML = '';
  }
  // TODO pagination
  public renderProducts(products: MappedProducts[], fadeout: boolean) {
    if (fadeout) this.sectionProducts.setClassName('fadeout');
    setTimeout(() => {
      this.sectionProducts.getElement().innerHTML = '';
      const cards = products.reduce<ProductCard[]>(
        (container, product) => [...container, new ProductCard(product, this.dispatch)],
        []
      );
      this.sectionProducts.insertChildren([...cards]);
      this.sectionProducts.removeClassName('fadeout');
    }, TRANSITION_DURATION);
  }

  public renderFilters(props: PropsFilters): void {
    this.sectionFilters.renderFilters({ categories: props.categories });
  }
}
