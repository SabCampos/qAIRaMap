
import { changeView } from './lib/viewController.js';

if ('serviceWorker' in navigator) {
    console.log('Service Worker: Supported');
    window.onload = () => {

        navigator.serviceWorker
        .register('service_worker.bundle.js')
        .then(()=> console.log('Service Worker: Registered'))
        .catch(err => console.log(`Service Worker: Error: ${err}`))

        document.getElementById('loader').classList.add('hide');

        const mobileMenu = document.getElementById('mobile-nav');
        M.Sidenav.init(mobileMenu);  
        
        const dropMenu = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(dropMenu);

        const modalsMenu= document.querySelectorAll('.modal');
        M.Modal.init(modalsMenu);

        const chipAlert= document.querySelectorAll('.chip');
        M.Chips.getInstance(chipAlert);

        // changeView(window.location.hash);
        // window.addEventListener('hashchange', () => {
        //   changeView(window.location.hash);
        // });
        window.onhashchange=changeView(window.location.hash);
     
    };

}

