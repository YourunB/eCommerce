import './notFoundPage.sass';
import '../assets/images/svg/earth.svg';

const notFoundPage = document.createElement('div');
notFoundPage.classList.add('page-404');
notFoundPage.innerHTML = `
  <div>
    <h2 class="page-404__title">404</h2>
    <img class="page-404__image" src="earth.svg"> 
    <p class="page-404__description">This Page Not Found</p>
  </div>
`;

export { notFoundPage };
