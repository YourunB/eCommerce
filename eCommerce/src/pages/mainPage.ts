import { mainSlider } from '../components/mainSlider/mainSlider';
import './mainPage.sass';
import '../assets/images/sale.png';

const mainPage = document.createElement('div');
const info = document.createElement('div');
info.classList.add('main-info');
info.innerHTML = `
  <h2>FAVORITES PLANTS FOR YOUR HOME</h2>
  <p>Plants are the eukaryotes that form the kingdom Plantae; they are predominantly photosynthetic. This means that they obtain their energy from sunlight, using chloroplasts derived from endosymbiosis with cyanobacteria to produce sugars from carbon dioxide and water, using the green pigment chlorophyll. Exceptions are parasitic plants that have lost the genes for chlorophyll and photosynthesis, and obtain their energy from other plants or fungi.</p>  
  <h3 class="text-shine">SPECIAL PROMOTIONAL CODES FOR YOU</h3>
   <div class="promo-box">
    <img class="promo-box__image" src="sale.png" alt="Promo">
    <ul>
      <li><span class="text-shine">SUMMER2024</span> - 5% off for all your cart</li>
      <li><span class="text-shine">TREE</span> - 7% off for all trees</li>
      <li><span class="text-shine">FRUIT</span> - 10% off for all fruits</li>
         <ul>
      </div>
`;

mainPage.append(mainSlider, info);

export { mainPage };
