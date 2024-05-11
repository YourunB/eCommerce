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
  <li>Home</li>
  <li>Products</li>
  <li>About</li>
`;

header.append(logo);

export { header, menu };
