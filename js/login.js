window.onload = () => {

    document.getElementById('loader').classList.add('hide');
    
    const mobileMenu = document.getElementById('mobile-nav');
    M.Sidenav.init(mobileMenu);
};