import '../../assets/images/flowers1.jpg';
import '../../assets/images/flowers2.jpg';
import '../../assets/images/flowers3.jpg';
import '../../assets/images/flowers4.jpg';
import './mainSlider.sass';
import { router } from '../../modules/router';

const mainSlider = document.createElement('div');
mainSlider.innerHTML = `
  <div class="main-slider">
    <h3 class="main-slider__title">Show Plants</h3>
    <div class="main-slider__wrapper">
      <img class="main-slider__slide" src="flowers1.jpg" alt="Flowers">
      <img class="main-slider__slide" src="flowers2.jpg" alt="Flowers">
      <img class="main-slider__slide" src="flowers3.jpg" alt="Flowers">
      <img class="main-slider__slide" src="flowers4.jpg" alt="Flowers">
    </div>
  </div>
`;

mainSlider.addEventListener('click', (event) => {
  const currentTarget = event.target as HTMLElement;
  if (currentTarget.classList.contains('main-slider__title')) {
    router.route('/yourunb-JSFE2023Q4/ecommerce/products');
  }
});

export { mainSlider };
