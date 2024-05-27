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
  constructor(props: BaseComponentProps) {
    super({ classNames: 'page-product-container', ...props });
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
    getProduct().then((data: Product | ErrorResponse) => {
      if ('statusCode' in data) return;
      this.productName.setTextContent(data.masterData.current.name['en-GB']);
      this.productPrice.setTextContent(
        data.masterData.current.masterVariant.prices
          ? `€ ${(data.masterData.current.masterVariant.prices[0].value.centAmount / 100).toLocaleString('ru-RU')}.00`
          : ''
      );
      this.productDescription.setTextContent(
        data.masterData.current.description ? data.masterData.current.description['en-GB'] : ''
      );
      if (data.masterData.staged.masterVariant.images) {
        data.masterData.staged.masterVariant.images.forEach((image, index) => {
          const productSwiperSlide = new BaseComponent({
            tagName: 'div',
            classNames: 'swiper-slide',
            textContent: index.toString(),
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
        this.renderSwiper();
      }

      return data;
    });
  }
  renderSwiper() {
    console.log(JSON.stringify(document.querySelector('.swiper')));
    const swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      centeredSlides: true,
      loop: true,
      modules: [Navigation],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    console.log(swiper);
  }
}
