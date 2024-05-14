import './footer.sass';

const footer = document.createElement('footer');
footer.classList.add('footer');

footer.innerHTML = `
  <span>2024</span>
  <a class="developers__link" href="https://rs.school/">&copy; RS School</a>
`;

export { footer };
