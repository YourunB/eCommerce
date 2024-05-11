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

const main = document.createElement('main');
document.body.append(header, main);

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
    main.append(new Login().getPage());
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
    return;
  }
  if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/login') {
    router.route('/yourunb-JSFE2023Q4/ecommerce/login');
    return;
  }
  router.route('/yourunb-JSFE2023Q4/ecommerce/404');
};

logo.addEventListener('click', () => {
  router.route('/yourunb-JSFE2023Q4/ecommerce/');
});
btnLogIn.addEventListener('click', () => {
  router.route('/yourunb-JSFE2023Q4/ecommerce/login');
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
