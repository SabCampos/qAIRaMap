//support service worker
if ('serviceWorker' in navigator) {
    console.log('Service Worker Supported');
    window.onload = () => {

        navigator.serviceWorker
        .register('service_worker.js')
        .then(()=> console.log('Service Worker: Registered'))
        .catch(err => console.log(`Service Worker: Error: ${err}`))

        document.getElementById('loader').classList.add('hide');
        
        const mobileMenu = document.getElementById('mobile-nav');
        M.Sidenav.init(mobileMenu);
    };
    
}



