import './header.sass';
import '../../assets/images/svg/logo.svg';
import '../../assets/images/svg/basket.svg';
import { Button } from '../../components/basebutton/baseButton';

const header = document.createElement('header');
header.classList.add('header');

const nav = document.createElement('nav');
nav.classList.add('navigation');

const logo = document.createElement('div');
logo.classList.add('logo-box');
logo.innerHTML = `
  <img src="logo.svg">
  <span>PLANTSTORE</span>
`;

const menu = document.createElement('ul');
menu.classList.add('menu');
menu.innerHTML = `
  <li class="menu__item">Home</li>
  <li class="menu__item">Products</li>
  <li class="menu__item">About</li>
`;

const navBtnsBox = document.createElement('div');
navBtnsBox.classList.add('navigation__btns');

const basket = document.createElement('img');
basket.src = 'basket.svg';

const btnLogIn = new Button({ textContent: 'LogIn', classNames: ['login__btn-submit', 'header__btn'] }).getElement();
const btnLogOut = new Button({
  textContent: 'LogOut',
  classNames: ['login__btn-submit', 'header__btn', 'header__btn_hide'],
}).getElement();
const btnReg = new Button({
  textContent: 'Registaration',
  classNames: ['login__btn-submit', 'header__btn', 'header__btn_hide'],
}).getElement();

navBtnsBox.append(basket, btnLogIn, btnLogOut, btnReg);
nav.append(logo, menu, navBtnsBox);
header.append(nav);

export { header, nav, menu, basket };
