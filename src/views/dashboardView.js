import { createLogout, removeLogout, createLogoutMobile,removeLogoutMobile,
   logout, hideLegend } from '../lib/buttons.js';

const viewBoard = `   
<table class="responsive-table highlight centered table-calibration">
            <thead>
              <tr>
                <th align="justify">Qhawax</th> 
                <th align="justify">Nombre</th>  
                <th align="justify">Hora</th>
                <th align="justify">SO<sub>2</sub><br>(&micro;g/m<sup>3</sup>)</th>
                <th align="justify">NO<sub>2</sub><br>(&micro;g/m<sup>3</sup>)</th>
                <th align="justify">CO<br>(&micro;g/m<sup>3</sup>)</th>
                <th align="justify">H<sub>2</sub>S<br>(&micro;g/m<sup>3</sup>)</th>
                <th align="justify">O<sub>3</sub><br>(&micro;g/m<sup>3</sup>)</th>
                <th align="justify">PM<sub>2,5</sub><br>(&micro;g/m<sup>3</sup>)</th>
                <th align="justify">PM<sub>10</sub><br>(&micro;g/m<sup>3</sup>)</th>
                <th align="justify">UV</th>    
                <th align="justify">dB</th>
                <th align="justify">°C</th>
                <th align="justify">H (%)</th>
                <th align="justify">P<br>(kPa)</th>
                <th align="justify">Conexión</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
`;

const addZero = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

const ppbToECA = (sensor) => {
  switch (sensor) {
    case 'CO': return {ECA:10000*.87, factor:1.144919906 };
    case 'NO2': return {ECA:100*.532, factor:1.880677075 };
    case 'O3': return {ECA:100*.51, factor:1.962019118 };
    case 'H2S': return {ECA:150*.719, factor:1.393033574 };
    case 'SO2': return {ECA:250*.382, factor:2.618478014 };
    case 'PM25': return {ECA:50, factor:1 };
    case 'PM10': return {ECA:100, factor:1};
    default: break;
  }
}

const indexValue = (data) => {

  const id = data.ID;

  const lat = data.lat.toFixed(5);  
  const lng = data.lon.toFixed(5);
  const UV = Number(data.UV.toFixed(1));
  const spl = Number(data.spl.toFixed(1));
  const newDate = new Date(data.timestamp);
  
  const time = addZero(newDate.getHours())+':'+
    addZero(newDate.getMinutes())+':'+
    addZero(newDate.getSeconds());

  const PM1 = Number(data.PM1.toFixed(1));
  const humidity = Number(data.humidity).toFixed(1);
  const pressure = Number(data.pressure/1000).toFixed(1);
  const temperature = Number(data.temperature).toFixed(1);

  const PM10 = Number(((data.PM10)*ppbToECA('PM10').factor).toFixed(1));
  const SO2 = Number(((data.SO2)*ppbToECA('SO2').factor).toFixed(1));
  const CO = Number(((data.CO)*ppbToECA('CO').factor).toFixed(1));
  const H2S = Number(((data.H2S)*ppbToECA('H2S').factor).toFixed(1));
  const PM25 = Number(((data.PM25)*ppbToECA('PM25').factor).toFixed(1));
  const O3 = Number(((data.O3)*ppbToECA('O3').factor).toFixed(1));
  const NO2 = Number(((data.NO2)*ppbToECA('NO2').factor).toFixed(1));

  const UVcolor = UV===0?'red':'black';
  const PM1color = PM1===0?'red':'black';
  const PM10color = PM10===0 ||PM10>=ppbToECA('PM10').ECA?'red':'black';
  const SO2color = SO2===0||SO2>=ppbToECA('SO2').ECA?'red':'black';
  const COcolor = CO===0||CO>=ppbToECA('CO').ECA?'red':'black';
  const H2Scolor = H2S===0||H2S>=ppbToECA('H2S').ECA?'red':'black';
  const PM25color = PM25===0||PM25>=ppbToECA('PM25').ECA?'red':'black';
  const O3color = O3===0||O3>=ppbToECA('O3').ECA?'red':'black';
  const NO2color = NO2===0||NO2>=ppbToECA('NO2').ECA?'red':'black';

  return {
      id,
      lat,
      lng,
      UV, UVcolor,
      spl,
      time,
      PM1, PM1color,
      humidity,
      pressure,
      temperature,
      PM10, PM10color,
      SO2, SO2color,
      CO, COcolor,
      H2S, H2Scolor,
      PM25, PM25color,
      O3, O3color,
      NO2, NO2color,
  };
}

const  viewDashboard = (company) => {
  const dashboardElem = document.createElement('div');
  dashboardElem.innerHTML = viewBoard;

  hideLegend()

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
    const table_body = dashboardElem.getElementsByTagName('tbody')[0];
    fetch('https://qairamapnapi.qairadrones.com/api/get_all_active_qhawax/')
    .then(res => res.json())
    .then(qhawax_qaira => {
      let qhawax_asigned = [];
      qhawax_qaira.forEach(q => qhawax_asigned.push(q));

      const socket = io.connect('https://qairamapnapi.qairadrones.com/');
      
      qhawax_asigned.forEach(q => {
        const row_table = document.createElement("tr");
        
        row_table.setAttribute("data-name", `${q.name}`);
        table_body.appendChild(row_table);
        

        let row_data = `
          <td><strong>${q.name}</strong></td> 
          <td>${q.comercial_name}</td> 
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td><i class="material-icons" style="color:gray">signal_wifi_off</i></td>
          `;
          row_table.innerHTML = row_data;
        socket.on('new_data_summary_processed', (data) => {
          if (q.name === data.ID) {
              
              const value = indexValue(data)
              row_data = `
              <td><strong>${data.ID}</strong></td>
              <td>${q.comercial_name}</td>
              <td>${value.time}</td>
              <td style="color:${value.SO2color}">${value.SO2}</td> 
              <td style="color:${value.NO2color}">${value.NO2}</td> 
              <td style="color:${value.COcolor}">${value.CO}</td> 
              <td style="color:${value.H2Scolor}">${value.H2S}</td>
              <td style="color:${value.O3color}">${value.O3}</td>  
              <td style="color:${value.PM25color}">${value.PM25}</td> 
              <td style="color:${value.PM10color}">${value.PM10}</td> 
              <td style="color:${value.UVcolor}">${value.UV}</td> 
              <td>${value.spl}</td>
              <td>${value.temperature}</td>
              <td>${value.humidity}</td>
              <td>${(value.pressure)}</td>  
              <td><i class="material-icons" style="color:#32CD32">wifi</i></td>
              `
              row_table.innerHTML = row_data;
              
          } 
      });
      })
    });
    
   return dashboardElem;
}

export { viewDashboard };