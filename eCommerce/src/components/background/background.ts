import './background.sass';
import '../../assets/images/background/back-top.png';
import '../../assets/images/background/back-mid.png';
import '../../assets/images/background/back-bot.png';

const background = document.createElement('div');
background.className = 'back-wrapper wave-animation';
background.innerHTML = `
  <div class="back-wrapper__inner back-top">
    <div class="wave wave-top" style="background-image: url('back-top.png')"></div>
  </div>
  <div class="back-wrapper__inner back-middle">
    <div class="wave wave-middle" style="background-image: url('back-mid.png')"></div>
  </div>
  <div class="back-wrapper__inner back-bottom">
    <div class="wave wave-bottom" style="background-image: url('back-bot.png')"></div>
  </div>
`;

export { background };
