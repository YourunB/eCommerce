import { ErrorResponse, Product } from '@commercetools/platform-sdk';
import { BaseComponent, BaseComponentProps } from '../../components/baseComponent';
import { getProduct } from '../../modules/api/productItem';
import './pageProduct.sass';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

export class PageProduct extends BaseComponent {
  private productSwiper: BaseComponent;
  private productTextContainer: BaseComponent;
  private productPrice: BaseComponent;
  private productName: BaseComponent;
  private productDescription: BaseComponent;
  private productDescriptionName: BaseComponent;
  private productSwiperWrapper: BaseComponent;
  private productSwiperButtonPrev: BaseComponent;
  private productSwiperButtonNext: BaseComponent;
  private overlay: BaseComponent;
  private modalSwiper: BaseComponent;
  private closeModalButton: BaseComponent;
  constructor(props: BaseComponentProps) {
    super({ classNames: 'page-product-container', ...props });

    this.overlay = new BaseComponent({
      tagName: 'div',
      classNames: 'overlay',
      parentNode: this.element,
    });
    this.overlay.getElement().addEventListener('click', () => this.switchModal(false));

    this.modalSwiper = new BaseComponent({
      tagName: 'div',
      classNames: 'modal-swiper',
      parentNode: this.element,
    });
    this.closeModalButton = new BaseComponent({
      tagName: 'button',
      classNames: 'close-button',
      parentNode: this.modalSwiper.getElement(),
    });
    this.closeModalButton.getElement().addEventListener('click', () => this.switchModal(false));

    this.productSwiper = new BaseComponent({
      tagName: 'div',
      classNames: 'swiper',
      parentNode: this.element,
    });
    this.productSwiperWrapper = new BaseComponent({
      tagName: 'div',
      classNames: 'swiper-wrapper',
      parentNode: this.productSwiper.getElement(),
    });
    this.productSwiperButtonPrev = new BaseComponent({
      tagName: 'div',
      classNames: 'swiper-button-prev',
      parentNode: this.productSwiper.getElement(),
    });
    this.productSwiperButtonNext = new BaseComponent({
      tagName: 'div',
      classNames: 'swiper-button-next',
      parentNode: this.productSwiper.getElement(),
    });

    this.productTextContainer = new BaseComponent({
      tagName: 'div',
      classNames: 'product-text_container',
      parentNode: this.element,
    });
    this.productName = new BaseComponent({
      tagName: 'div',
      classNames: 'product-name',
      parentNode: this.productTextContainer.getElement(),
    });
    this.productPrice = new BaseComponent({
      tagName: 'div',
      classNames: 'product-price',
      parentNode: this.productTextContainer.getElement(),
    });
    this.productDescriptionName = new BaseComponent({
      tagName: 'div',
      classNames: 'product-description-name',
      textContent: 'Product description:',
      parentNode: this.productTextContainer.getElement(),
    });
    this.productDescription = new BaseComponent({
      tagName: 'div',
      classNames: 'product-description',
      parentNode: this.productTextContainer.getElement(),
    });

    const Id = window.location.hash.substring(1);

    getProduct(Id).then((data: Product | ErrorResponse) => {
      if ('statusCode' in data) return;
      const product = data.masterData;
      this.productName.setTextContent(product.current.name['en-GB']);
      this.productDescription.setTextContent(product.current.description ? product.current.description['en-GB'] : '');
      this.renderPrices(product);
      if (product.staged.masterVariant.images) {
        this.renderImages(product);
        this.renderSwiper();
      }

      return data;
    });
  }

  renderSwiper() {
    new Swiper('.swiper', {
      slidesPerView: 1,
      centeredSlides: true,
      modules: [Navigation],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    const slides = this.productSwiperWrapper.getChildren();
    slides.forEach((slide, index) => {
      const [image] = slide.children;
      image.addEventListener('click', () => {
        this.switchModal(true, index);
      });
    });
  }

  switchModal = (isOpen: boolean, index?: number) => {
    if (isOpen) {
      this.modalSwiper.setClassName('modal-swiper_active');
      this.overlay.setClassName('overlay_active');
      const modal = this.productSwiper.getElement().cloneNode(true);
      (modal as HTMLElement).classList.add('slider-enlarge');
      this.modalSwiper.getElement().appendChild(modal);
      new Swiper('.swiper', {
        slidesPerView: 1,
        initialSlide: index,
        centeredSlides: true,
        modules: [Navigation],
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
    if (!isOpen) {
      const modalChildren = this.modalSwiper.getElement().children;
      const [firstChild, secondChild] = modalChildren;
      if (secondChild && firstChild) {
        this.modalSwiper.getElement().removeChild(secondChild);
      }
      this.modalSwiper.removeClassName('modal-swiper_active');
      this.overlay.removeClassName('overlay_active');
    }
  };

  renderPrices = (product: Product['masterData']) => {
    if (product.staged.masterVariant.prices) {
      const currentPrice =
        product.staged.masterVariant.prices[0].discounted?.value.centAmount ||
        product.staged.masterVariant.prices[0].value.centAmount;
      const actualPrice = new BaseComponent({
        tagName: 'span',
        textContent: `€${(currentPrice / 100).toLocaleString('ru-RU', { minimumFractionDigits: 2 })}`,
        classNames: 'actual-price',
      });
      this.productPrice.insertChild(actualPrice);
      if (product.staged.masterVariant.prices[0].discounted) {
        const oldPrice = new BaseComponent({
          tagName: 'span',
          textContent: `€${(product.staged.masterVariant.prices[0].value.centAmount / 100).toLocaleString('ru-RU', { minimumFractionDigits: 2 })}`,
          classNames: 'old-price',
        });
        this.productPrice.insertChild(oldPrice);
      }
    }
  };

  renderImages = (product: Product['masterData']) => {
    product.staged.masterVariant.images?.forEach((image) => {
      const productSwiperSlide = new BaseComponent({
        tagName: 'div',
        classNames: 'swiper-slide',
        parentNode: this.productSwiperWrapper.getElement(),
      });

      const productImg = new BaseComponent({
        tagName: 'img',
        classNames: 'product-img',
        parentNode: productSwiperSlide.getElement(),
      });

      productImg.setAttribute({
        name: 'src',
        value: image.url,
      });
    });
  };
}
