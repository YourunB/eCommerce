import './notFoundPage.sass';
import '../assets/images/svg/earth.svg';
import { Button } from '../components/basebutton/baseButton';

const btnBackHome = new Button({ textContent: 'LogIn', classNames: 'login__btn-submit' }).getElement();
btnBackHome.textContent = 'Home';

const notFoundPage = document.createElement('div');
notFoundPage.classList.add('page-404');

const boxNotFoundPage = document.createElement('div');
boxNotFoundPage.innerHTML = `
  <h2 class="page-404__title">404</h2>
  <img class="page-404__image" src="earth.svg"> 
  <p class="page-404__description">This Page Not Found</p>
`;
boxNotFoundPage.append(btnBackHome);

notFoundPage.append(boxNotFoundPage);

export { notFoundPage, btnBackHome };
