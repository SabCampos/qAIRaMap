
import { changeView } from './lib/viewController.js';

if ('serviceWorker' in navigator) {
    console.log('Service Worker: Supported');
    window.onload = () => {

        navigator.serviceWorker
        .register('service_worker.bundle.js')
        .then(()=> console.log('Service Worker: Registered'))
        .catch(err => console.log(`Service Worker: Error: ${err}`))

        document.getElementById('loader').classList.add('hide');

        const optionsPicker ={
            format:'dd/mm/yyyy',
            i18n: {
                months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
                weekdays: ["Domingo","Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
                weekdaysShort: ["Dom","Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
                weekdaysAbbrev: ["D","L", "M", "M", "J", "V", "S"],
                selectMonths: true,
                cancel: 'Cancelar',
                clear: 'Limpiar',
                today: 'hoy',
                done: 'Ok'
            },
            minDate: new Date('2020-03-17 00:06:22.0-05:00')
          }
        
        const mobileMenu = document.getElementById('mobile-nav');
        M.Sidenav.init(mobileMenu);  
        
        const dropMenu = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(dropMenu);

        const modalsMenu= document.querySelectorAll('.modal');
        M.Modal.init(modalsMenu);

        const chipAlert= document.querySelectorAll('.chip');
        M.Chips.getInstance(chipAlert);

        const selection = document.querySelectorAll('select');
        M.FormSelect.init(selection);

        const datePicker = document.querySelectorAll('.datepicker');
        M.Datepicker.init(datePicker, optionsPicker);

        const timePicker = document.querySelectorAll('.timepicker');
        M.Timepicker.init(timePicker);
        

        changeView(window.location.hash);
        window.addEventListener('hashchange', () => {
          changeView(window.location.hash);
        });
     
    };
    
}

