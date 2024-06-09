import './aboutPage.sass';

const aboutPage = document.createElement('div');
aboutPage.classList.add('about-page');
aboutPage.innerHTML = `
  <h2 class="about-page__title">About Us</h2>
  <p>Created by: <a href="https://github.com/yourunb" target="_blank">Yury Butskevich</a>, <a href="https://github.com/timoshenkovanadya" target="_blank">Nadzeya Tsimashenkava</a>, <a href="https://github.com/k98940" target="_blank">Konstantin Shumkin</a>.<p/>
  <p>This project is the final project of Stage 2 students at <a href="https://rs.school/" target="_blank">RS School</a> in front-end development. The total duration of continuous training took 9 months. A total of 5,886 students took part in the course. At the time of this project's creation, 524 students had reached the final project.</p>
  <h3 class="developers__title">Developers</h3>
  <div class="developers">
    <div class="developer">
      <img src="https://avatars.githubusercontent.com/u/124175026?v=4" class="developer__image" alt="Developer">
      <p class="developer__name">Yury Butskevich<p>
      <p class="developer__description"><span>Front-end Developer (Team Lead)</span> - process management, work planning, team building, quality control, project assembly, architecture design, routing on github, project design, work with API, development, user API data management.</p>
    </div>
    <div class="developer">
      <img src="https://avatars.githubusercontent.com/u/119855793?v=4" class="developer__image" alt="Developer">
      <p class="developer__name">Nadzeya Tsimashenkava<p>
      <p class="developer__description"><span>Front-end developer</span> - search and evaluation of solutions, layout, adaptation for different devices, work with API, development, testing, create slider with swiper, maintaining API a product description.</p>
    </div>
    <div class="developer">
      <img src="https://avatars.githubusercontent.com/u/88248839?v=4" class="developer__image" alt="Developer">
      <p class="developer__name">Konstantin Shumkin<p>
      <p class="developer__description"><span>Front-end developer</span> - initial eCommerce API setup, layout, component logic, adaptation for different devices, development, refactoring and optimization, testing, maintaining API a product catalog.</p>
    </div>
  </div>
`;

export { aboutPage };
