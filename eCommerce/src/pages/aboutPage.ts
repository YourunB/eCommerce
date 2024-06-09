import './aboutPage.sass';

const aboutPage = document.createElement('div');
aboutPage.classList.add('about-page');
aboutPage.innerHTML = `
  <h2 class="about-page__title">About Us</h2>
  <p>Created by: <a href="https://github.com/yourunb" target="_blank">Yury Butskevich</a>, <a href="https://github.com/timoshenkovanadya" target="_blank">Nadzeya Tsimashenkava</a>, <a href="https://github.com/k98940" target="_blank">Konstantin Shumkin</a>.<p/>
  <p>This project is the final project of Stage 2 students at <a href="https://rs.school/" target="_blank">RS School</a> in front-end development. The total duration of continuous training took 9 months. A total of 5,886 students took part in the course. At the time of this project's creation, 524 students had reached the final project.</p>
  <div class="developers">
    <h3 class="developers__title">Developers</h3>
  </div>
`;

export { aboutPage };
