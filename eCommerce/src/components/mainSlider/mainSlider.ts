import '../../assets/images/flowers1.jpg';
import '../../assets/images/flowers2.jpg';
import '../../assets/images/flowers3.jpg';
import '../../assets/images/flowers4.jpg';
import './mainSlider.sass';

const mainSlider = document.createElement('div');
mainSlider.innerHTML = `
  <div class="main-slider">
    <div class="main-slider__wrapper">
      <img class="main-slider__slide" src="flowers1.jpg" alt="Flowers">
      <img class="main-slider__slide" src="flowers2.jpg" alt="Flowers">
      <img class="main-slider__slide" src="flowers3.jpg" alt="Flowers">
      <img class="main-slider__slide" src="flowers4.jpg" alt="Flowers">
    </div>
  </div>
`;

export { mainSlider };
