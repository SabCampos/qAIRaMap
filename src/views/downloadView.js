const viewDownload = `
<div class="row">
<div class="col s6 offset-s3">
    <div class="card-pannel z-depth-5">
        <form action="">
            <h4 class="center-align">Descarga la data de medición</h4>
            <div class="row">
                <div class="input-field col s6 offset-s3">
                    <select class="browser-default center-align" name="" id="selectQhawax">
                    <option value="" disabled selected> Selecciona un QHAWAX</option>
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
                  <label for="endDate">Fecha de fin</label>
                  <input type="text" class="datepicker center-align" name="endDate">
                </div>
            </div>
            </div>
            <div class="container">
              <div class="row center-align">
                <div class="col s6">
                  <label for="initHour">Hora de Inicio</label>
                  <input type="text" class="timepicker center-align" name="initHour">
                </div>
                <div class="col s6">
                  <label for="endHour">Hora de fin</label>
                  <input type="text" class="timepicker center-align" name="endHour">
                </div>
            </div>
            </div>
        </form>
    </div>
</div>
</div>
`;

const downloadView = (company) => {

    
    const leyenda = document.getElementById('legend-menu')
    leyenda.classList.add('hide');
    
    const downloadElem = document.createElement('div');
    downloadElem.innerHTML = viewDownload;

    fetch(`https://qairamapnapi.qairadrones.com/api/AllQhawaxByCompany/?company_id=${company}`)
    .then(res =>res.json())
    .then(qhawax_list => {
        const addOptions = downloadElem.querySelector('#selectQhawax');
        
        qhawax_list.forEach(qhawax => {
            const option = document.createElement('option')
            option.setAttribute('value', qhawax.qhawax_id);
            option.innerText = qhawax.qhawax_name;
            addOptions.appendChild(option)
        });
    })
    
    return downloadElem;
}

export { downloadView };