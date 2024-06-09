import './aboutPage.sass';
import '../assets/images/svg/github.svg';
import '../assets/images/svg/logo-rs.svg';

const aboutPage = document.createElement('div');
aboutPage.classList.add('about-page');
aboutPage.innerHTML = `
  <h2 class="about-page__title">About Us</h2>
  <p class="about-page__text">Created by: <a href="https://github.com/yourunb" target="_blank">Yury Butskevich</a>, <a href="https://github.com/timoshenkovanadya" target="_blank">Nadzeya Tsimashenkava</a>, <a href="https://github.com/k98940" target="_blank">Konstantin Shumkin</a>.<p/>
  <p class="about-page__text">This project is the final project of Stage 2 students at <a href="https://rs.school/" target="_blank">RS School</a> in front-end development. The total duration of continuous training took 9 months. A total of 5,886 students took part in the course. At the time of this project's creation, 524 students had reached the final project.</p>
  <h3 class="developers__title">Developers</h3>
  <div class="developers">
    <a href="https://github.com/yourunb" target="_blank"class="developer">
      <img src="github.svg" class="developer__logo" alt="Github">
      <img src="https://avatars.githubusercontent.com/u/124175026?v=4" class="developer__image" alt="Developer">
      <p class="developer__name">Yury Butskevich<p>
      <p class="developer__description"><span>Front-end Developer (Team Lead)</span> - process management, work planning, team building, quality control, project assembly, architecture design, routing on github, project design, work with API, development, user API data management.</p>
    </a>
    <a href="https://github.com/timoshenkovanadya" target="_blank" class="developer">
      <img src="github.svg" class="developer__logo" alt="Github">
      <img src="https://avatars.githubusercontent.com/u/119855793?v=4" class="developer__image" alt="Developer">
      <p class="developer__name">Nadzeya Tsimashenkava<p>
      <p class="developer__description"><span>Front-end developer</span> - search and evaluation of solutions, layout, adaptation for different devices, work with API, development, testing, create slider with swiper, maintaining API a product description.</p>
    </a>
    <a href="https://github.com/k98940" target="_blank" class="developer">
      <img src="github.svg" class="developer__logo" alt="Github">
      <img src="https://avatars.githubusercontent.com/u/88248839?v=4" class="developer__image" alt="Developer">
      <p class="developer__name">Konstantin Shumkin<p>
      <p class="developer__description"><span>Front-end developer</span> - initial eCommerce API setup, layout, component logic, adaptation for different devices, development, refactoring and optimization, testing, maintaining API a product catalog.</p>
    </a>
  </div>
  <p class="about-page__text">Work on the project lasted 8 weeks. All work was divided into 4 sprints in accordance with the Scrum methodology. Thanks to the coordinated and responsible work of the team, the project was completed successfully.</p>
  <p class="about-page__text">All team members contributed equally to the development of the application. Konstantin did a great job with the initial API setup. Nadzeya has integrated an excellent slider into the application for displaying products. Yury organized the assembly, architecture and routing of the project.</p>
  <p class="about-page__text">Throughout the project, work was carried out on Github. Trello and built-in Github features such as Issues were used to track completed tasks. A discord server has been created for interaction and communication between the team. During the work, conferences of the entire team and testing of the application were constantly held.</p>
  
  <div class="rss-box">
    <a href="https://rs.school/" target="_blank"><img src="logo-rs.svg" alt="RS School" class="rss-box__logo"></a>
    <h3 class="rss-box__title">RS School is a free and community-based online education program conducted by The Rolling Scopes Community since 2013.</h3>
  </div>
`;

export { aboutPage };
