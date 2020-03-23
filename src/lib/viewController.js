import { viewTheLogin } from '../views/loginView.js';
import { viewQairaMap } from '../views/mapView.js';
import { viewFreeMap } from '../views/freeMapView.js';
import { downloadView } from '../views/downloadView.js';
import { viewDashboard } from '../views/dashboardView.js'

const container = document.getElementById('content-page');
const company_id = Number(sessionStorage.getItem('companyID'));
const user_name = sessionStorage.getItem('companyName');


// const userID = (callback)=>{ 
//     if (company_id) {
//         callback(company_id);
//       }     
// }
export const changeView = (router) => {

    container.innerHTML='';  
    switch (router) {
      case '': return container.appendChild(viewFreeMap(1));

      case '#/': return container.appendChild(viewFreeMap(1));

      case '#/login': return container.appendChild(viewTheLogin());

      case '#/msb': return container.appendChild(viewFreeMap(4));

      case '#/mmi': return container.appendChild(viewFreeMap(8));

      case '#/mml': return container.appendChild(viewFreeMap(3));

      case '#/qairamap': return company_id===1?container.appendChild(viewQairaMap(company_id)):container.appendChild(viewTheLogin());

      case '#/download': return container.appendChild(downloadView(company_id));

      case '#/dashboard': return company_id===1?container.appendChild(viewDashboard(company_id)):container.appendChild(viewTheLogin());

      // case '#/dashboard':
      // {
      //   return userID(company_id => container.appendChild(viewDashboard(Number(company_id))));
      // }
      default: return container.appendChild(viewTheLogin());

    }
}