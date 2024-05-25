import { ErrorResponse, Product } from '@commercetools/platform-sdk';
import { BaseComponent, BaseComponentProps } from '../../components/baseComponent';
import { getProduct } from '../../modules/api/productItem';
import './pageProduct.sass';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
// import Swiper from 'swiper';

export class PageProduct extends BaseComponent {
  private productSwiper: BaseComponent;
  private productTextContainer: BaseComponent;
  private productPrice: BaseComponent;
  private productName: BaseComponent;
  private productDescription: BaseComponent;
  private productDescriptionName: BaseComponent;
  private productSwiperPagination: BaseComponent;
  private productSwiperWrapper: BaseComponent;
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
    this.productSwiperPagination = new BaseComponent({
      tagName: 'div',
      classNames: 'swiper-pagination',
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
        // data.masterData.staged.masterVariant.images.forEach((image) => {
        //   const productSwiperSlide = new BaseComponent({
        //     tagName: 'div',
        //     classNames: 'product-swiper_slide',
        //     parentNode: this.productSwiperWrapper.getElement(),
        //   });

        //   const productImg = new BaseComponent({
        //     tagName: 'img',
        //     classNames: 'product-img',
        //     parentNode: productSwiperSlide.getElement(),
        //   });

        //   productImg.setAttribute({
        //     name: 'src',
        //     value: image.url,
        //   });
        // });
        this.renderSwiper();
        // window.addEventListener(
        //   'load',
        //   () => {
        //     console.log('FIRE');
        //   },
        //   { once: true }
        // );
        // this.productSwiperWrapper.getElement().onloadeddata = this.renderSwiper;
        // const imagePromises = data.masterData.staged.masterVariant.images.map(
        //   (image) =>
        //     new Promise((resolve) => {
        //       const productSwiperSlide = new BaseComponent({
        //         tagName: 'div',
        //         classNames: 'product-swiper_slide',
        //         parentNode: this.productSwiperWrapper.getElement(),
        //       });

        //       const productImg = new BaseComponent({
        //         tagName: 'img',
        //         classNames: 'product-img',
        //         parentNode: productSwiperSlide.getElement(),
        //       });

        //       productImg.setAttribute({
        //         name: 'src',
        //         value: image.url,
        //       });

        //       productImg.getElement().onload = resolve;
        //     })
        // );

        // Promise.all(imagePromises).then(() => {
        //   setTimeout(() => {
        //     new Swiper('.product-swiper', {
        //       loop: true,
        //       pagination: {
        //         el: '.swiper-pagination',
        //       },
        //     });
        //   }, 1000);
        // });
      }

      return data;
    });
  }
  renderSwiper() {
    // productImg.getElement().onload = () => {
    // setTimeout(() => {
    console.log(JSON.stringify(document.querySelector('.swiper')));
    const swiper = new Swiper('.swiper', {
      loop: true,
      modules: [Pagination],
      pagination: {
        el: '.swiper-pagination',
      },
    });

    console.log(swiper);
    // }, 3000);
    // };
  }
}
