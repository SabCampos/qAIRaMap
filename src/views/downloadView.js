import { openModalDateAlert, openModalEmptyAlert, toTimestamp} from '../lib/pickerErrors.js';
import { json2csv , download } from '../lib/fromJsonToCsv.js';
import { createLogout, createLogoutMobile, removeLogout, removeLogoutMobile, logout } from '../lib/buttons.js';

const csvFields = [
  'CO (ppb)','H2S (ppb)','NO2 (ppb)','O3 (ppb)','PM10 (μg/m3)','PM25 (μg/m3)','SO2 (ppb)','SPL (dB)','UV','UVA','UVB',
  'humidity (%)','lat','lon','pressure (Pa)','temperature (°C)','day','timestamp'
]
const viewDownload = `
<div class="row">
    <div class="col s6 offset-s3">
        <div class="card-pannel z-depth-5">
            <form action="">
                <h5 class="center-align">Descarga la data de medición de calidad del aire</h5>
                <div class="row">
                    <div class="input-field col s6 offset-s3">
                        <select class="browser-default center-align" name="" id="selectQhawax">
                        <option value="" disabled selected> Selecciona un qHAWAX</option>
                        </select>
                    </div>
                </div>
                <div class="container">
                  <div class="row center-align">
                    <div class="col s6">
                      <label for="initDate">Fecha de Inicio</label>
                      <input type="text" class="datepicker center-align" name="initDate">
                    </div>
                    <div class="col s6">
                        <label for="initHour">Hora de Inicio</label>
                        <input type="text" class="timepicker center-align" name="initHour">
                    </div>
                </div>
                </div>
                <div class="container">
                  <div class="row center-align">
                    <div class="col s6">
                        <label for="endDate">Fecha de fin</label>
                        <input type="text" class="datepicker center-align" name="endDate">
                      </div>
                    <div class="col s6">
                      <label for="endHour">Hora de fin</label>
                      <input type="text" class="timepicker center-align" name="endHour">
                    </div>
                  </div>
                  <div class="row">
                  <div class="center-align">
                  <button id="submit-btn" class="btn waves-effect waves-light" >Descargar
                    <i class="material-icons right">send</i>
                  </button>
                </div>
                </div>
            </form>
        </div>
    </div>
    </div>
`;

const waitingLoader = `
<div class="progress">
      <div class="indeterminate"></div>
  </div>
`

const optionsDatePicker ={
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
  }

}

const optionsTimePicker ={
  i18n: {
      cancel: 'Cancelar',
      done: 'Ok'
  },
  twelveHour:false,
  vibrate: false,
}




const downloadView = (company) => {



    M.toast({html: '¡Primero selecciona un Módulo!'})
    M.toast({html: 'Por favor ingresa todos los campos'})
    const leyenda = document.getElementById('legend-menu')
    leyenda.classList.add('hide');

    
    const logoutBtn = createLogout();
    const logoutMobBtn = createLogoutMobile();


    logoutBtn.addEventListener('click', () => {
      logout(company);
      removeLogout();
    })

    logoutMobBtn.addEventListener('click', () => {
      logout(company);
      removeLogoutMobile();
    })
    
    const downloadElem = document.createElement('div');
    downloadElem.innerHTML = viewDownload;

    const selection = downloadElem.querySelectorAll('select');
    M.FormSelect.init(selection);

    //AGRAGAR SWITCH PARA CAMBIAR FETCH
    let filename='';

    fetch(`https://qairamapnapi.qairadrones.com/api/AllQhawaxByCompany/?company_id=${company}`)
    .then(res =>res.json())
    .then(qhawax_list => {
        const addOptions = downloadElem.querySelector('#selectQhawax');
        
        qhawax_list.forEach(qhawax => {
            const option = document.createElement('option')
            option.setAttribute('value', qhawax.qhawax_id);
            option.innerText = qhawax.qhawax_name +': '+ qhawax.comercial_name;

            filename =qhawax.qhawax_name +': '+ qhawax.comercial_name;

            addOptions.appendChild(option)

        });
    })

    let selectedParameters = {
      company,
    };

    selection[0].onchange = ()=>{    
    fetch(`https://qairamapnapi.qairadrones.com/api/GetInstallationDate/?qhawax_id=${selection[0].value}`)
    .then(res =>res.text())
    .then(installationDate => {     
      selectedParameters.id=selection[0].value;

              optionsDatePicker.minDate = new Date(installationDate)
              optionsDatePicker.maxDate = new Date(Date.now());
              optionsDatePicker.onClose = ()=>{
                selectedParameters.initDate = datePicker[0].value;
                selectedParameters.endDate = datePicker[1].value;
              }; 
              optionsTimePicker.onCloseEnd = () =>{
                selectedParameters.initHour = timePicker[0].value;
                selectedParameters.endHour = timePicker[1].value;
              };         

              const datePicker = downloadElem.querySelectorAll('.datepicker');
              M.Datepicker.init(datePicker, optionsDatePicker);
          
              const timePicker = downloadElem.querySelectorAll('.timepicker');
              M.Timepicker.init(timePicker, optionsTimePicker);
              
    })
    
    }
    const downloadBtn = downloadElem.querySelector('#submit-btn');
    downloadBtn.addEventListener('click',()=>{

        const arrayInitDate = typeof selectedParameters.initDate==='undefined'? false: selectedParameters.initDate.split("/");
        const arrayEndDate = typeof selectedParameters.endDate==='undefined'? false: selectedParameters.endDate.split("/");
        const arrayInitTime = typeof selectedParameters.initHour==='undefined' ||
        selectedParameters.initHour===''?false : selectedParameters.initHour.split(":");
        const arrayEndTime = typeof selectedParameters.endHour==='undefined' || 
        selectedParameters.endHour===''? false : selectedParameters.endHour.split(":");
        
        const initial_timestamp= toTimestamp(arrayInitDate, arrayInitTime).toUTCString();
        const final_timestamp=toTimestamp(arrayEndDate,arrayEndTime).toUTCString();   

      if (!arrayInitDate||!arrayEndDate||!arrayInitTime||!arrayEndTime) {
        openModalEmptyAlert();

      } else {
        
        if (Date.parse(initial_timestamp)>=Date.parse(final_timestamp)) {
          openModalDateAlert();

          } else {
          const request = async () => {

          const response = await fetch(`https://qairamapnapi.qairadrones.com/api/valid_processed_measurements_period/?qhawax_id=${selectedParameters.id}&company_id=${selectedParameters.company}&initial_timestamp=${initial_timestamp}&final_timestamp=${final_timestamp}`);
          const json = await response.json();
          
          const csvContent = json2csv(json,csvFields)
          download(csvContent,`${filename}.csv`, 'text/csv;encoding:utf-8');
          window.location.reload()
          }

        request()
        M.toast({html: 'La descarga puede demorar unos 5 minutos...',displayLength:10000})
        M.toast({html: '¡Estamos preparando la data!',displayLength:6000})

        const pannel = document.querySelector('.card-pannel');
        pannel.innerHTML=waitingLoader;

      }
        
      }
      
    })
    
    return downloadElem;
}

export { downloadView };