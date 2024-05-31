import { mainSlider } from '../components/mainSlider/mainSlider';
import './mainPage.sass';

const mainPage = document.createElement('div');
const info = document.createElement('div');
info.classList.add('main-info');
info.innerHTML = `
  <h2>FAVORITES PLANTS FOR YOUR HOME</h2>
  <p>Plants are the eukaryotes that form the kingdom Plantae; they are predominantly photosynthetic. This means that they obtain their energy from sunlight, using chloroplasts derived from endosymbiosis with cyanobacteria to produce sugars from carbon dioxide and water, using the green pigment chlorophyll. Exceptions are parasitic plants that have lost the genes for chlorophyll and photosynthesis, and obtain their energy from other plants or fungi.</p>  
`;

mainPage.append(mainSlider, info);

export { mainPage };
