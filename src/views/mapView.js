import { drawQhawaxMap, mapCenter } from '../lib/mapAssets.js';
import { createLogout, removeLogout, createDashboard, chooseSpinnerMenu,
 logout, createDwnld, createDwnldMob } from '../lib/buttons.js';

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

const  viewQairaMap = (company) => { 

    const mapElem = document.createElement('div');

    chooseSpinnerMenu(company)

    const logoutBtn = createLogout();
    const dashboardBtn = createDashboard();

    const downloadBtn = createDwnld();
    const downLoadMobBtn = createDwnldMob();
    
    logoutBtn.addEventListener('click', () => {
      logout();
      removeLogout();
    })

    dashboardBtn.addEventListener('click', () => {
      window.location.replace('..#/dashboard');
      window.location.reload();
    })

    downloadBtn.addEventListener('click', () => {
      window.location.replace('..#/download');
      window.location.reload();
    })

    downLoadMobBtn.addEventListener('click', () => {
      window.location.replace('..#/download');
      window.location.reload();
    })

    mapElem.innerHTML = viewMap;  

      const map = new google.maps.Map(mapElem.querySelector('#map'), {
            center: mapCenter(company),
            zoom: 13,
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

export { viewQairaMap };