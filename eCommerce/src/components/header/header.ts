import './header.sass';
import '../../assets/images/svg/logo.svg';

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

header.append(logo, menu);

export { header, menu };
