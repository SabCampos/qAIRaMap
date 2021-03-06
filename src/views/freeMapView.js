import { drawQhawaxMap, mapCenter} from '../lib/mapAssets.js';
import { chooseSpinnerMenu, createLogin, createLoginMobile, login,
  removeLogin, removeLoginMobile } from '../lib/buttons.js';

const viewMap = `   <div class="wrapper_map" id="wrapper_map">
<div class="animated fadeInDown" id="map"></div>
</div>

<!-- Modal Graphics -->
<div id="modalGraphic" class="modal">
  <a id="close" class="modal-close right responsive-img modal-images-close">X</a>
  <div class="modal-content center" id="graphicValues">
    <h6 id="chart-title"></h6>
    <svg id="line-chart"></svg>
  </div>
</div>
`;



const  viewFreeMap = (company) => {
  

  const mapElem = document.createElement('div');

  chooseSpinnerMenu (company = company === 0 ? 1: company);
    
  const loginBtn = createLogin();
  const loginMobBtn = createLoginMobile(); 
  

    loginBtn.addEventListener('click', () => {
      login()
      removeLogin()
    });
    
    loginMobBtn.addEventListener('click', () => {
      login ()
      removeLoginMobile()
    })

    mapElem.innerHTML = viewMap;

    const modalsGraph= mapElem.querySelectorAll('.modal');
    M.Modal.init(modalsGraph);
    

    const map = new google.maps.Map(mapElem.querySelector('#map'), {
            center: mapCenter(company),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });
    map.markers = [];      
          fetch(`https://qairamapnapi.qairadrones.com/api/AllQhawaxByCompany/?company_id=${company}`)
          .then(res =>res.json())
          .then(qhawax_list => {
           qhawax_list.forEach(qhawax => {
            
               drawQhawaxMap(map,qhawax,company);
           });
            
          })
    
   return mapElem;
}

export { viewFreeMap };