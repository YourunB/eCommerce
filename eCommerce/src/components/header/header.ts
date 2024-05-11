import './header.sass';
import '../../assets/images/svg/logo.svg';
import '../../assets/images/svg/basket.svg';

const header = document.createElement('header');
header.classList.add('header');

const logo = document.createElement('div');
logo.classList.add('logo-box');
logo.innerHTML = `
  <img src="logo.svg">
  <span>PLANTSTORE</span>
`;

const nav = document.createElement('nav');
nav.classList.add('navigation');

const menu = document.createElement('ul');
menu.classList.add('menu');
menu.innerHTML = `
  <li class="menu__item">Home</li>
  <li class="menu__item">Products</li>
  <li class="menu__item">About</li>
`;

const basket = document.createElement('img');
basket.src = 'basket.svg';

nav.append(menu, basket);
header.append(logo, nav);

export { header, nav, menu, basket };
