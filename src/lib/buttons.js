const logoutNavMenu = document.querySelector('#log-menu');
const logoutBtn = document.createElement('a');

const logoutMobMenu = document.querySelector('#log-menu-mobile');
const logoutMobBtn = document.createElement('a');

const dashboardNavMenu = document.querySelector('#dashboard-nav-menu');
const dashboardBtn = document.createElement('a');

const loginNavMenu = document.querySelector('#log-menu');
const loginBtn = document.createElement('a');

const loginMobMenu = document.querySelector('#log-menu-mobile');
const loginMobBtn = document.createElement('a');

const legendMenu = document.getElementById('legend-menu');
const legendMobile = document.getElementById('legend-menu-mobile');

const DwnldMenu = document.getElementById('download-menu');
const dwnldBtn = document.createElement('a');

const DwnldMob = document.getElementById('download-mobile-menu');
const dwnldMobBtn = document.createElement('a');

const createLogout = () =>{
    logoutBtn.innerText = 'Salir';
    logoutNavMenu.appendChild(logoutBtn);
    return logoutBtn;
}

const createLogoutMobile = () =>{
    logoutMobBtn.innerText = 'Salir';
    logoutMobMenu.appendChild(logoutMobBtn);
    return logoutMobBtn;
}

const removeLogout = () => {
    logoutNavMenu.removeChild(logoutBtn);
}

const removeLogoutMobile = () =>{
    logoutMobMenu.removeChild(logoutMobBtn);
}

const createDashboard = () => {
    dashboardBtn.innerText = 'Dashboard';
    dashboardNavMenu.appendChild(dashboardBtn);
    return dashboardBtn;
}

const createLogin = () => {
    loginBtn.innerText = 'Login';
    loginNavMenu.appendChild(loginBtn);
    return loginBtn;
}

const createLoginMobile  = () => {
    loginMobBtn.innerText = 'Login';
    loginMobMenu.appendChild(loginMobBtn);
    return loginMobBtn;
}

const removeLogin = () => {
    loginNavMenu.removeChild(loginBtn);
}

const removeLoginMobile = () => {
    loginMobMenu.removeChild(loginMobBtn);
}

const logout = (company) => {
    switch (company) {
      case 1: { window.location.replace('#/'); window.location.reload();} break;
      case 3: { window.location.replace('#/mml'); window.location.reload();} break;
      case 4: { window.location.replace('#/msb'); window.location.reload();} break;
      case 8: { window.location.replace('#/mmi'); window.location.reload();} break;
      default: { window.location.replace('#/login'); window.location.reload();} break;
    }
    sessionStorage.clear();
  }

const login = () => {
    window.location.replace('..#/login');
    window.location.reload();
    sessionStorage.clear();
}

const hideLegend = () => {
  legendMenu.classList.add('hide');
  legendMobile.classList.add('hide')
}

const createDwnld = () => {
    dwnldBtn.innerText = 'Descarga';
    DwnldMenu.appendChild(dwnldBtn);
    return dwnldBtn;
}

const createDwnldMob = () => {
    dwnldMobBtn.innerText = 'Descarga';
    DwnldMob.appendChild(dwnldMobBtn);
    return dwnldMobBtn;
}

  const chooseSpinnerMenu = (company) => {
    const navMenu = document.getElementById('spinNav');
    const mobMenu = document.getElementById('spinMobile');
    navMenu.classList.remove('spinSanBorja','spinMiraflores','spinLima','spinQaira');
    mobMenu.classList.remove('spinSanBorjaMobile','spinMirafloresMobile','spinLimaMobile','spinQairaMobile')
    switch (company) {
      case 4:
        {
          navMenu.classList.add('spinSanBorja');
          mobMenu.classList.add('spinSanBorjaMobile');
        }
        break;
    
        case 8:
          {
          navMenu.classList.add('spinMiraflores');
          mobMenu.classList.add('spinMirafloresMobile');
          }
          break;
    
          case 3:
            {
            navMenu.classList.add('spinLima');
            mobMenu.classList.add('spinLimaMobile');
    
            }
            break;
            case 1:
              {
                navMenu.classList.add('spinQaira');
                mobMenu.classList.add('spinQairaMobile');
  
              }
        
        break;
    
      default:
        break;
    }
  }

export {createLogout, createLogoutMobile, removeLogout, 
    removeLogoutMobile,logout, createDashboard,
     chooseSpinnerMenu, createLogin, createLoginMobile,
    login, removeLogin,removeLoginMobile, hideLegend,
    createDwnld, createDwnldMob}