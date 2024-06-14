import './header.sass';
import '../../assets/images/svg/logo.svg';
import '../../assets/images/svg/basket.svg';
import '../../assets/images/svg/user.svg';
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
  <li class="menu__item" title="Open main page">Home</li>
  <li class="menu__item" title="Open products page">Products</li>
  <li class="menu__item" title="Open about us page">About</li>
`;

const navBtnsBox = document.createElement('div');
navBtnsBox.classList.add('navigation__btns');

const btnBasket = document.createElement('img');
btnBasket.src = 'basket.svg';
btnBasket.classList.add('basket');

const btnProfile = document.createElement('img');
btnProfile.src = 'user.svg';
btnProfile.classList.add('profile');

const btnLogIn = new Button({ textContent: 'LogIn', classNames: ['login__btn-submit', 'header__btn'] }).getElement();
const btnLogOut = new Button({
  textContent: 'LogOut',
  classNames: ['login__btn-submit', 'header__btn', 'header__btn_hide'],
}).getElement();
const btnReg = new Button({
  textContent: 'Registration',
  classNames: ['login__btn-submit', 'header__btn'],
}).getElement();

const btnMenu = document.createElement('button');
btnMenu.classList.add('btn-menu');

btnMenu.addEventListener('click', () => {
  nav.classList.toggle('navigation_show');
  checkBtnMenuCondition();
});

function checkBtnMenuCondition() {
  if (btnMenu.classList.value === 'btn-menu btn-menu_cliked') {
    btnMenu.classList.remove('btn-menu_cliked');
  } else btnMenu.classList.add('btn-menu_cliked');
}

navBtnsBox.append(btnBasket, btnProfile, btnLogIn, btnLogOut, btnReg, btnMenu);
nav.append(menu);
header.append(logo, nav, navBtnsBox);

export { header, nav, menu, navBtnsBox, btnBasket, btnProfile, btnLogIn, btnLogOut, btnReg, logo, btnMenu };
