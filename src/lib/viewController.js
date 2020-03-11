import { viewTheLogin } from '../views/loginView.js';
import { viewQairaMap } from '../views/mapView.js';
import { viewFreeMap } from '../views/freeMapView.js';
import { viewDashboard } from '../views/dashboardView.js'

const container = document.getElementById('content-page');
const company_id = Number(sessionStorage.getItem('companyID'));
const user_name = sessionStorage.getItem('companyName');


const userID = (callback)=>{ 
    if (company_id) {
        callback(company_id);
      }
}

export const changeView = (router) => {
    container.innerHTML='';  
    console.log(company_id, typeof company_id);
    
    switch (router) {
      case '':
      {
        return container.appendChild(viewTheLogin());
      }
      case '#/':
      {
        return container.appendChild(viewTheLogin());
      }
      case '#/msb':
      {
        return container.appendChild(viewFreeMap(4));
      }
      case '#/mmi':
      {
        return container.appendChild(viewFreeMap(8));
      }
      case '#/mml':
      {
        return container.appendChild(viewFreeMap(3));
      }
      case '#/qairamap':
      {
        return userID(company_id => container.appendChild(viewQairaMap(company_id)));
      }
      // case '#/dashboard':
      // {
      //   return userID(company_id => container.appendChild(viewDashboard(Number(company_id))));
      // }
      default:
      {
        return container.appendChild(viewTheLogin());
      }
    }
}