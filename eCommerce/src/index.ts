import './modules/routingScript';
import './index.sass';
import { router } from './modules/router';
import { mainPage } from './pages/mainPage';
import { notFoundPage } from './pages/notFoundPage';
import { aboutPage } from './pages/aboutPage';
import { productsPage } from './pages/productstPage';
import { basketPage } from './pages/basketPage';
import { Login } from './modules/login/login';
import { header, btnLogIn, logo, menu, basket } from './components/header/header';
import { footer } from './components/footer/footer';

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

router.addRoute({
  path: '/yourunb-JSFE2023Q4/ecommerce/',
  handler: () => {
    main.innerHTML = '';
    main.append(mainPage);
  },
});
router.addRoute({
  path: '/yourunb-JSFE2023Q4/ecommerce/products',
  handler: () => {
    main.innerHTML = '';
    main.append(productsPage);
  },
});
router.addRoute({
  path: '/yourunb-JSFE2023Q4/ecommerce/about',
  handler: () => {
    main.innerHTML = '';
    main.append(aboutPage);
  },
});
router.addRoute({
  path: '/yourunb-JSFE2023Q4/ecommerce/basket',
  handler: () => {
    main.innerHTML = '';
    main.append(basketPage);
  },
});
router.addRoute({
  path: '/yourunb-JSFE2023Q4/ecommerce/login',
  handler: () => {
    main.innerHTML = '';
    login.isLogined().then(
      () => main.append(mainPage),
      () => main.append(login.getPage())
    );
  },
});
router.addRoute({
  path: '/yourunb-JSFE2023Q4/ecommerce/404',
  handler: () => {
    main.innerHTML = '';
    main.append(notFoundPage);
  },
});

window.onload = () => {
  if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/') {
    router.route('/yourunb-JSFE2023Q4/ecommerce/');
    setActivePage();
    return;
  }
  if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/products') {
    router.route('/yourunb-JSFE2023Q4/ecommerce/products');
    setActivePage();
    return;
  }
  if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/about') {
    router.route('/yourunb-JSFE2023Q4/ecommerce/about');
    setActivePage();
    return;
  }
  if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/basket') {
    router.route('/yourunb-JSFE2023Q4/ecommerce/basket');
    setActivePage();
    return;
  }
  if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/login') {
    router.route('/yourunb-JSFE2023Q4/ecommerce/login');
    setActivePage();
    return;
  }
  router.route('/yourunb-JSFE2023Q4/ecommerce/404');
  setActivePage();
};

logo.addEventListener('click', () => {
  router.route('/yourunb-JSFE2023Q4/ecommerce/');
  setActivePage();
});
btnLogIn.addEventListener('click', () => {
  router.route('/yourunb-JSFE2023Q4/ecommerce/login');
  setActivePage();
});
basket.addEventListener('click', () => {
  router.route('/yourunb-JSFE2023Q4/ecommerce/basket');
  setActivePage();
});
menu.addEventListener('click', (event) => {
  const currentTarget = event.target as HTMLElement;
  if (currentTarget.textContent === 'Home') {
    router.route('/yourunb-JSFE2023Q4/ecommerce/');
    setActivePage();
    return;
  }
  if (currentTarget.textContent === 'Products') {
    router.route('/yourunb-JSFE2023Q4/ecommerce/products');
    setActivePage();
    return;
  }
  if (currentTarget.textContent === 'About') {
    router.route('/yourunb-JSFE2023Q4/ecommerce/about');
    setActivePage();
    return;
  }
});
