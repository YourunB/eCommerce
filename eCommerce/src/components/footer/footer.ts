import './footer.sass';
import '../../assets/images/svg/logo-rs.svg';

const footer = document.createElement('footer');
footer.classList.add('footer');

footer.innerHTML = `
  <span>2024</span>
  <a class="footer__link" target="_blank" rel="noopener" href="https://rs.school/">&copy; RS School <img class="school-logo" src="logo-rs.svg" alt="Logo"></a>
`;

export { footer };
