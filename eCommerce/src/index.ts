import './modules/routingScript';
import './index.sass';
import { router } from './modules/router';
import { mainPage } from './pages/mainPage';
import { notFoundPage } from './pages/notFoundPage';
import { Login } from './modules/login/login';
import { header, btnLogIn, logo } from './components/header/header';

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
logo.addEventListener('click', () => {
  router.route('/yourunb-JSFE2023Q4/ecommerce/');
});
