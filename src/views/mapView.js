import { drawQhawaxMap, mapCenter } from '../lib/mapAssets.js';

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
    const navMenu = document.getElementById('spinNav');
    const mobMenu = document.getElementById('spinMobile');
    navMenu.classList.add('spinQaira');
    mobMenu.classList.add('spinQairaMobile');

    const logoutNavMenu = document.querySelector('#logout-nav-menu');
    const dashboardNavMenu = document.querySelector('#dashboard-nav-menu');
    // const logoutMobileMenu = document.querySelector('#logout-mobile-menu');
    // const dashboardMobileMenu = document.querySelector('#dashboard-mobile-menu');

    const logoutBtn = document.createElement('a');
    const dashboardBtn = document.createElement('a');

    logoutBtn.innerText = 'Salir';
    logoutNavMenu.appendChild(logoutBtn);

    dashboardBtn.innerText = 'Dashboard';
    dashboardNavMenu.appendChild(dashboardBtn);


    logoutBtn.addEventListener('click', () => {
      sessionStorage.clear();
      logoutNavMenu.removeChild(logoutBtn);
      window.location.hash = ``;
    })

    dashboardBtn.addEventListener('click', () => {
      window.location.hash = "#/dashboard";
    })

    mapElem.innerHTML = viewMap;  

    const modalsGraph= mapElem.querySelectorAll('.modal');
    M.Modal.init(modalsGraph);

    const modalClose = mapElem.querySelector('#close');
    modalClose.href=window.location.hash;

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

          window.addEventListener('hashchange', () => {
            sessionStorage.clear();
            logoutNavMenu.removeChild(logoutBtn);
            dashboardBtn.removeChild(dashboardBtn);
          });
   return mapElem;
}

export { viewQairaMap };