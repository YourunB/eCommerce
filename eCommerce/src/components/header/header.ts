import './header.sass';
import '../../assets/images/svg/logo.svg';

const header = document.createElement('header');
header.classList.add('header');

const logo = document.createElement('div');
logo.classList.add('logo-box');
logo.innerHTML = `
  <img src="logo.svg">
  <span>PLANTSTORE</span>
`;

header.append(logo);

export { header };
