// import './modules/routingScript';
import './index.sass';
// import { router } from './modules/router';
// import { mainPage } from './pages/mainPage';
// import { notFoundPage } from './pages/notFoundPage';
// import { Login } from './modules/login/login';

// const header = document.createElement('header');
// const main = document.createElement('main');
// const footer = document.createElement('footer');
// document.body.append(header, main, footer);

// router.addRoute({
//   path: '/yourunb-JSFE2023Q4/ecommerce/',
//   handler: () => {
//     main.innerHTML = '';
//     main.append(mainPage);
//   },
// });

// router.addRoute({
//   path: '/yourunb-JSFE2023Q4/ecommerce/login',
//   handler: () => {
//     main.innerHTML = '';
//     main.append(new Login().getPage());
//   },
// });

// router.addRoute({
//   path: '/yourunb-JSFE2023Q4/ecommerce/404',
//   handler: () => {
//     main.innerHTML = '';
//     main.append(notFoundPage);
//   },
// });

// window.onload = () => {
//   if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/') {
//     router.route('/yourunb-JSFE2023Q4/ecommerce/');
//     return;
//   }
//   if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/login') {
//     router.route('/yourunb-JSFE2023Q4/ecommerce/login');
//     return;
//   }
//   router.route('/yourunb-JSFE2023Q4/ecommerce/404');
// };
import { PageRegistration } from './pages/registration/pageRegistration';

const container = document.querySelector('body');
if (container) {
  const pageRegistration = new PageRegistration({ parentNode: container });
  pageRegistration.render(container);
}
