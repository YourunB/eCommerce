import './modules/routingScript';
import './index.sass';
import { router } from './modules/router';
import { mainPage } from './pages/mainPage';
import { notFoundPage, btnBackHome } from './pages/notFoundPage';
import { aboutPage } from './pages/aboutPage';
import { productsPage } from './pages/productstPage';
import { basketPage } from './pages/basketPage';
import { Login } from './modules/login/login';
import { header, btnLogIn, btnLogOut, btnReg, logo, menu, basket } from './components/header/header';
import { footer } from './components/footer/footer';
import { PageRegistration } from './pages/registration/pageRegistration';

const main = document.createElement('main');
main.classList.add('main');
const login = new Login();

document.body.append(header, main, footer);

function setActivePage() {
  const menuItems = menu.getElementsByClassName('menu__item') as HTMLCollectionOf<HTMLElement>;
  for (let i = 0; i < menuItems.length; i += 1) {
    menuItems[i].classList.remove('menu__item_active');
  }
  if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/') menuItems[0].classList.add('menu__item_active');
  if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/products') menuItems[1].classList.add('menu__item_active');
  if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/about') menuItems[2].classList.add('menu__item_active');
}

function checkAuthorization() {
  if (localStorage.length > 0) {
    btnLogOut.classList.remove('header__btn_hide');
    btnLogIn.classList.add('header__btn_hide');
    btnReg.classList.add('header__btn_hide');
  } else {
    btnLogOut.classList.add('header__btn_hide');
    btnLogIn.classList.remove('header__btn_hide');
    btnReg.classList.remove('header__btn_hide');
  }
}

checkAuthorization();

router.addRoute({
  path: '/yourunb-JSFE2023Q4/ecommerce/',
  handler: () => {
    main.innerHTML = '';
    main.append(mainPage);
    setActivePage();
    checkAuthorization();
  },
});
router.addRoute({
  path: '/yourunb-JSFE2023Q4/ecommerce/products',
  handler: () => {
    main.innerHTML = '';
    main.append(productsPage);
    setActivePage();
    checkAuthorization();
  },
});
router.addRoute({
  path: '/yourunb-JSFE2023Q4/ecommerce/about',
  handler: () => {
    main.innerHTML = '';
    main.append(aboutPage);
    setActivePage();
    checkAuthorization();
  },
});
router.addRoute({
  path: '/yourunb-JSFE2023Q4/ecommerce/basket',
  handler: () => {
    main.innerHTML = '';
    main.append(basketPage);
    setActivePage();
    checkAuthorization();
  },
});
router.addRoute({
  path: '/yourunb-JSFE2023Q4/ecommerce/login',
  handler: () => {
    main.innerHTML = '';
    main.append(login.getPage());
    setActivePage();
    checkAuthorization();
  },
});
router.addRoute({
  path: '/yourunb-JSFE2023Q4/ecommerce/registration',
  handler: () => {
    main.innerHTML = '';
    main.append(new PageRegistration({}).getElement());
    setActivePage();
    checkAuthorization();
  },
});
router.addRoute({
  path: '/yourunb-JSFE2023Q4/ecommerce/404',
  handler: () => {
    main.innerHTML = '';
    main.append(notFoundPage);
    setActivePage();
    checkAuthorization();
  },
});

window.onload = () => {
  if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/') {
    router.route('/yourunb-JSFE2023Q4/ecommerce/');
    return;
  }
  if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/products') {
    router.route('/yourunb-JSFE2023Q4/ecommerce/products');
    return;
  }
  if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/about') {
    router.route('/yourunb-JSFE2023Q4/ecommerce/about');
    return;
  }
  if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/basket') {
    router.route('/yourunb-JSFE2023Q4/ecommerce/basket');
    return;
  }
  if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/login') {
    if (localStorage.length === 0) router.route('/yourunb-JSFE2023Q4/ecommerce/login');
    else router.route('/yourunb-JSFE2023Q4/ecommerce/');
    return;
  }
  if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/registration') {
    if (localStorage.length === 0) router.route('/yourunb-JSFE2023Q4/ecommerce/registration');
    else router.route('/yourunb-JSFE2023Q4/ecommerce/');
    return;
  }
  router.route('/yourunb-JSFE2023Q4/ecommerce/404');
};

logo.addEventListener('click', () => {
  router.route('/yourunb-JSFE2023Q4/ecommerce/');
});
btnBackHome.addEventListener('click', () => {
  router.route('/yourunb-JSFE2023Q4/ecommerce/');
});
btnLogIn.addEventListener('click', () => {
  router.route('/yourunb-JSFE2023Q4/ecommerce/login');
});
btnReg.addEventListener('click', () => {
  router.route('/yourunb-JSFE2023Q4/ecommerce/registration');
});
basket.addEventListener('click', () => {
  router.route('/yourunb-JSFE2023Q4/ecommerce/basket');
});
menu.addEventListener('click', (event) => {
  const currentTarget = event.target as HTMLElement;
  if (currentTarget.textContent === 'Home') {
    router.route('/yourunb-JSFE2023Q4/ecommerce/');
    return;
  }
  if (currentTarget.textContent === 'Products') {
    router.route('/yourunb-JSFE2023Q4/ecommerce/products');
    return;
  }
  if (currentTarget.textContent === 'About') {
    router.route('/yourunb-JSFE2023Q4/ecommerce/about');
    return;
  }
});
