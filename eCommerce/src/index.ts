import './modules/routingScript';
import './index.sass';
import { router } from './modules/router';
import { mainPage } from './pages/mainPage';
import { notFoundPage, btnBackHome } from './pages/notFoundPage';
import { aboutPage } from './pages/aboutPage';
import { productsPage } from './pages/productstPage';
import { basketPage } from './pages/basketPage';
import { Login } from './modules/login/login';
import { header, btnLogIn, btnLogOut, btnReg, logo, menu, btnBasket, btnProfile } from './components/header/header';
import { footer } from './components/footer/footer';
import { PageRegistration } from './pages/registration/pageRegistration';
import { getUserData, PageProfile } from './pages/profile/pageProfile';

const main = document.createElement('main');
main.classList.add('main');
const login = new Login();

login.isLogined().then(
  () => localStorage.setItem('logged', 'true'),
  () => localStorage.removeItem('logged')
);

document.body.append(header, main, footer);

function setActivePage() {
  const menuItems = menu.getElementsByClassName('menu__item') as HTMLCollectionOf<HTMLElement>;
  for (let i = 0; i < menuItems.length; i += 1) menuItems[i].classList.remove('menu__item_active');
  if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/') menuItems[0].classList.add('menu__item_active');
  if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/products') menuItems[1].classList.add('menu__item_active');
  if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/about') menuItems[2].classList.add('menu__item_active');
}

function checkAuthorization() {
  if (localStorage.logged !== undefined) {
    btnLogOut.classList.remove('header__btn_hide');
    btnProfile.classList.remove('header__btn_hide');
    btnLogIn.classList.add('header__btn_hide');
    btnReg.classList.add('header__btn_hide');
  } else {
    btnLogOut.classList.add('header__btn_hide');
    btnProfile.classList.add('header__btn_hide');
    btnLogIn.classList.remove('header__btn_hide');
    btnReg.classList.remove('header__btn_hide');
  }
}

checkAuthorization();

router.addRoute({
  path: '/yourunb-JSFE2023Q4/ecommerce/',
  handler: () => {
    document.title = 'Plant Store';
    main.innerHTML = '';
    main.append(mainPage);
    setActivePage();
    checkAuthorization();
  },
});
router.addRoute({
  path: '/yourunb-JSFE2023Q4/ecommerce/products',
  handler: () => {
    document.title = 'Products';
    main.innerHTML = '';
    main.append(productsPage);
    setActivePage();
    checkAuthorization();
  },
});
router.addRoute({
  path: '/yourunb-JSFE2023Q4/ecommerce/about',
  handler: () => {
    document.title = 'About Us';
    main.innerHTML = '';
    main.append(aboutPage);
    setActivePage();
    checkAuthorization();
  },
});
router.addRoute({
  path: '/yourunb-JSFE2023Q4/ecommerce/basket',
  handler: () => {
    document.title = 'Basket';
    main.innerHTML = '';
    main.append(basketPage);
    setActivePage();
    checkAuthorization();
  },
});
router.addRoute({
  path: '/yourunb-JSFE2023Q4/ecommerce/profile',
  handler: () => {
    document.title = 'Profile';
    main.innerHTML = '';
    main.append(new PageProfile({}).getElement());
    setActivePage();
    checkAuthorization();
  },
});
router.addRoute({
  path: '/yourunb-JSFE2023Q4/ecommerce/login',
  handler: () => {
    document.title = 'Login';
    main.innerHTML = '';
    main.append(login.getPage());
    setActivePage();
    checkAuthorization();
  },
});
router.addRoute({
  path: '/yourunb-JSFE2023Q4/ecommerce/registration',
  handler: () => {
    document.title = 'Registration';
    main.innerHTML = '';
    main.append(new PageRegistration({}).getElement());
    setActivePage();
    checkAuthorization();
  },
});
router.addRoute({
  path: '/yourunb-JSFE2023Q4/ecommerce/404',
  handler: () => {
    document.title = '404';
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
  if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/profile') {
    if (localStorage.logged === undefined) router.route('/yourunb-JSFE2023Q4/ecommerce/profile');
    else router.route('/yourunb-JSFE2023Q4/ecommerce/');
    return;
  }
  if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/login') {
    if (localStorage.logged === undefined) router.route('/yourunb-JSFE2023Q4/ecommerce/login');
    else router.route('/yourunb-JSFE2023Q4/ecommerce/');
    return;
  }
  if (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/registration') {
    if (localStorage.logged === undefined) router.route('/yourunb-JSFE2023Q4/ecommerce/registration');
    else router.route('/yourunb-JSFE2023Q4/ecommerce/');
    return;
  }
  router.route('/yourunb-JSFE2023Q4/ecommerce/404');
};

window.onpopstate = () => {
  if (
    localStorage.logged !== undefined &&
    (location.pathname === '/yourunb-JSFE2023Q4/ecommerce/login' ||
      location.pathname === '/yourunb-JSFE2023Q4/ecommerce/registration')
  ) {
    router.route('/yourunb-JSFE2023Q4/ecommerce/', false);
    window.history.replaceState({}, '', '/yourunb-JSFE2023Q4/ecommerce/');
    setActivePage();
  }

  if (localStorage.logged === undefined && location.pathname === '/yourunb-JSFE2023Q4/ecommerce/profile') {
    router.route('/yourunb-JSFE2023Q4/ecommerce/', false);
    window.history.replaceState({}, '', '/yourunb-JSFE2023Q4/ecommerce/');
    setActivePage();
  }
};

logo.addEventListener('click', () => {
  router.route('/yourunb-JSFE2023Q4/ecommerce/');
});
btnBackHome.addEventListener('click', () => {
  router.route('/yourunb-JSFE2023Q4/ecommerce/');
});
btnBasket.addEventListener('click', () => {
  router.route('/yourunb-JSFE2023Q4/ecommerce/basket');
});
btnLogIn.addEventListener('click', () => {
  router.route('/yourunb-JSFE2023Q4/ecommerce/login');
});
btnProfile.addEventListener('click', () => {
  router.route('/yourunb-JSFE2023Q4/ecommerce/profile');
  getUserData();
});
btnReg.addEventListener('click', () => {
  router.route('/yourunb-JSFE2023Q4/ecommerce/registration');
});
btnLogOut.addEventListener('click', () => {
  localStorage.clear();
  router.route('/yourunb-JSFE2023Q4/ecommerce/');
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
