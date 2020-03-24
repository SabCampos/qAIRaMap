const months = ["Enero", "Febrero", "Marzo","Abril", "Mayo", "Junio",  
 "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];



const mapCenter = (company) => {
    switch (company) {
        case 1:
            return{lat: -12.04318, lng: -77.02824}
        case 3:
            return {lat:-12.04388888, lng: -77.05055555}
        case 4:
            return {lat:-12.096780, lng: -76.989240}
        case 8:
            return {lat:-12.1097222222, lng:-77.05194444444}
        default:
            break;
    }
    
}

const ppbToECA = (sensor) => {

    switch (sensor) {
      case 'CO':
        return {
          ECA:10000*.87,
          factor:1.144919906
        }
        case 'NO2':
          return {
            ECA:100*.532,
            factor:1.880677075
          }
          case 'O3':
            return {
              ECA:100*.51,
              factor:1.962019118
            }
            case 'H2S':
              return {
                ECA:150*.719,
                factor:1.393033574
              }
              case 'SO2':
                return {
                  ECA:250*.382,
                  factor:2.618478014
                }
                case 'PM25':
                  return {
                    ECA:50,
                    factor:1
                  }
                  case 'PM10':
                    return {
                      ECA:100,
                      factor:1
                    }
      default:
        break;
    }
  }

const drawChart =(sensor, qhawax_id) =>{

    d3.selectAll("#line-chart > *").remove();
  
    let titleChart = '';
    if (sensor === 'PM25'||sensor ==='PM10') {
      titleChart = `${qhawax_id}: Concentración de ${sensor} de las últimas 24 horas (&micro;g/m<sup>3</sup>)`;
    } else {
      titleChart = `${qhawax_id}: Concentración de ${sensor} de las últimas 24 horas (ppb)`;
    }
  
    document.getElementById('chart-title').innerHTML = titleChart;
    
    const factorEca = ppbToECA(sensor)
  
    const svgWidth = window.innerWidth*0.4, svgHeight =  window.innerHeight*0.6;
    const margin = { top: 20, right: 20, bottom: 30, left: 30 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;
    
    const svg = d3.select('svg')
        .attr("width", svgWidth)
        .attr("height", svgHeight);
  
        
    const g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    const x = d3.scaleTime()
        .rangeRound([0, width])
        .domain([new Date(Date.now() - 86400000), new Date(Date.now())])
        // .range([0, width]);
  
    
    const y = d3.scaleLinear()
        .rangeRound([height, 0])
        .domain([0,factorEca.ECA*1.5])
  
    fetch(`https://qairamapnapi.qairadrones.com/api/gas_average_measurement/?qhawax=${qhawax_id}&gas=${sensor}`)
    .then(res =>res.json())
    .then(data => {
  
      const line = d3.line()
        .x((d)=>x(new Date(d.timestamp)))
        .y((d)=>y(d.sensor))
        .curve(d3.curveMonotoneX)
  
        x.domain(d3.extent(data, (d)=>new Date(d.timestamp)));
        // y.domain([0,d3.max(data, (d)=>d.sensor*factorEca.factor)]);
  
  
      const limitLine = d3.line()
      .x((d)=>x(new Date(d.timestamp)))
      .y((d)=>y(factorEca.ECA))
  
  
  
        g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 2.5)
        .attr("d", line);
  
        g.append("path")
        .datum(data)
        .attr("class", "line line5")
        .style("stroke-dasharray", ("3, 3"))
        .attr("stroke-width", 2.5)
        .attr("d", limitLine)
  
    
    })
    
    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .select(".domain")
        // .remove();
    
    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "red")
        .attr("id", "legendECA")
        // .attr("transform", "rotate(-90)")
        .attr("y", 6)  
        .attr("dy", "10em")
        .attr("text-anchor", "start")
        // .select(".domain")
        .text(`___Límite ECA`)
       
  
    }

const airQuality = (data) => {

  const addZero = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
    
    const PM10 = data.PM10;
    const SO2 = data.SO2;
    const CO = data.CO;
    const H2S = data.H2S;
    const PM25 = data.PM25;
    const O3 = data.O3;
    const NO2 = data.NO2;
    const UV = data.UV;
   
  
  
    const newDate = new Date(data.timestamp)
    
    const time = addZero(newDate.getHours()+5)+':'+addZero(newDate.getMinutes())
  
  
    const qPM10 = (PM10 >= 0 && PM10 <= 50) ? {color:'green', label:'Buena'}
        : (PM10 > 50 && PM10 <= 100) ? {color:'yellow', label:'Moderada'}
            : (PM10 > 100 && PM10 <= 167) ? {color:'orange', label:'Mala'} : (PM10 > 167) ? {color:'red', label:'Cuidado'} : {color:'transparent', label:''};
  
    const qSO2 = (SO2 >= 0 && SO2 <= 50) ? {color:'green', label:'Buena'}
        : (SO2 > 50 && SO2 <= 100) ? {color:'yellow', label:'Moderada'}
            : (SO2 > 100 && SO2 <= 625) ? {color:'orange', label:'Mala'} : (SO2 > 625) ? {color:'red', label:'Cuidado'} : {color:'transparent', label:''};
  
    const qCO = (CO >= 0 && CO <= 50) ? {color:'green', label:'Buena'}
        : (CO > 50 && CO <= 100) ? {color:'yellow', label:'Moderada'}
            : (CO > 100 && CO <= 150) ? {color:'orange', label:'Mala'} : (CO > 150) ? {color:'red', label:'Cuidado'} : {color:'transparent', label:''};
  
    const qH2S = (H2S >= 0 && H2S <= 50) ? {color:'green', label:'Buena'}
        : (H2S > 50 && H2S <= 100) ? {color:'yellow', label:'Moderada'}
            : (H2S > 100 && H2S <= 1000) ? {color:'orange', label:'Mala'} : (H2S > 1000) ? {color:'red', label:'Cuidado'} : {color:'transparent', label:''};
  
    const qPM25 = (PM25 >= 0 && PM25 <= 50) ? {color:'green', label:'Buena'}
        : (PM25 > 50 && PM25 <= 100) ? {color:'yellow', label:'Moderada'}
            : (PM25 > 100 && PM25 <= 500) ? {color:'orange', label:'Mala'} : (PM25 > 500) ? {color:'red', label:'Cuidado'} : {color:'transparent', label:''};
  
    const qO3 = (O3 >= 0 && O3 <= 50) ? {color:'green', label:'Buena'}
        : (O3 > 50 && O3 <= 100) ? {color:'yellow', label:'Moderada'}
            : (O3 > 100 && O3 <= 175) ? {color:'orange', label:'Mala'} : (O3 > 175) ? {color:'red', label:'Cuidado'} : {color:'transparent', label:''};
  
  
    const qNO2 = (NO2 >= 0 && NO2 <= 50) ? {color:'green', label:'Buena'}
        : (NO2 > 50 && NO2 <= 100) ? {color:'yellow', label:'Moderada'}
            : (NO2 > 100 && NO2 <= 150) ? {color:'orange', label:'Mala'} : (NO2 > 150) ? {color:'red', label:'Cuidado'} : {color:'transparent', label:''};
  
    const qUV = (0<=UV && UV<3)?'green':(3<=UV && UV<6)?'yellow':(6<=UV && UV<9)?'orange': (9<=UV && UV<12)?'red':
          (12<=UV && UV<=14)?'orchid': (UV>14) ? 'blueviolet':'transparent';
  
    const airColor =
        (qPM10 === 'red' || qSO2 === 'red' || qCO === 'red'
            || qH2S === 'red' || qPM25 === 'red' || qO3 === 'red'
            || qNO2 === 'red') ? 'red' :
            (qPM10 === 'orange' || qSO2 === 'orange' ||
                qCO === 'orange' || qH2S === 'orange' || qPM25 === 'orange'
                || qO3 === 'orange' || qNO2 === 'orange') ? 'orange' :
                (qPM10 === 'yellow' || qSO2 === 'yellow' ||
                    qCO === 'yellow' || qH2S === 'yellow' ||
                    qPM25 === 'yellow' || qO3 === 'yellow' ||
                    qNO2 === 'yellow') ? 'yellow' : (qPM10 === 'green' || qSO2 === 'green' ||
                        qCO === 'green' || qH2S === 'green' ||
                        qPM25 === 'green' || qO3 === 'green' ||
                        qNO2 === 'green') ? 'green' : 'transparent';
  
    return {
      time,
        qPM10,
        qSO2,
        qCO,
        qH2S,
        qPM25,
        qO3,
        qNO2,
        qUV,
        airColor
    };
  }

const generateGif = (qhawax,company) =>{
    if (company===3) {
       if(qhawax.main_inca >=0 && qhawax.main_inca <= 50) {
        return 'https://github.com/qAIRa/qAIRaMap/blob/master/src/img/gecko/gecko%20-%20buena.png?raw=true'
      } else if (qhawax.main_inca <= 100) {
        return 'https://github.com/qAIRa/qAIRaMap/blob/master/src/img/gecko/gecko%20-%20moderada.png?raw=true'
      } else if (qhawax.main_inca <= 500) { 
        return 'https://github.com/qAIRa/qAIRaMap/blob/master/src/img/gecko/gecko%20-%20mala.png?raw=true'
      } else {
        return 'https://github.com/qAIRa/qAIRaMap/blob/master/src/img/gecko/gecko%20-%20cuidado.png?raw=true'
      }
    } else {
        if(qhawax.main_inca>=0 && qhawax.main_inca<= 50) {
            return 'https://github.com/qAIRa/qAIRaMap/blob/master/src/img/qairito/qairito_buena.gif?raw=true'
          } else if (qhawax.main_inca<= 100) {
            return 'https://github.com/qAIRa/qAIRaMap/blob/master/src/img/qairito/qairito_moderada.gif?raw=true'
          } else if (qhawax.main_inca<= 500) {
            return 'https://github.com/qAIRa/qAIRaMap/blob/master/src/img/qairito/qairito_mala.gif?raw=true'
          } else {
            return 'https://github.com/qAIRa/qAIRaMap/blob/master/src/img/qairito/qairito_cuidado.gif?raw=true'
          }
    }
  }

const  qhawaxLeaf = (inca) => {
    let leaf = '';
        typeof inca === null ? leaf='https://github.com/qAIRa/qAIRaMap/blob/master/src/img/leafs/leaf_out_of_service.png?raw=true':
        (inca>=0 && inca <=50) ? leaf='https://github.com/qAIRa/qAIRaMap/blob/master/src/img/leafs/leaf_inca_good.png?raw=true':
        (inca <=100) ? leaf='https://github.com/qAIRa/qAIRaMap/blob/master/src/img/leafs/leaf_inca_moderate.png?raw=true':
        (inca <=500) ? leaf='https://github.com/qAIRa/qAIRaMap/blob/master/src/img/leafs/leaf_inca_bad.png?raw=true':
        leaf='https://github.com/qAIRa/qAIRaMap/blob/master/src/img/leafs/leaf_inca_hazardous.png?raw=true';

  return leaf;
};

const zoneColorNoise = (data) => {
    const newDate = new Date(data.timestamp)
  
    if (7<=newDate.getHours()<=22) {
      switch (data.zone) {
        case 'Zona de Protección Especial':
          if (data.spl<=50) {
            return {color:'green',zone:'Zona de Protección Especial'};
          }else {
            return {color:'red',zone:'Zona de Protección Especial'};
          }
          case 'Zona Residencial':
            if (data.spl<=60) {
              return {color:'green',zone:'Zona Residencial'};
            }else {
              return {color:'red',zone:'Zona Residencial'};
            }
            case 'Zona Comercial':
              if (data.spl<=70) {
                return {color:'green',zone:'Zona Comercial'};
              }else {
                return {color:'red',zone:'Zona Comercial'};
              }
              case 'Zona Industrial':
                if (data.spl<=80) {
                  return {color:'green',zone:'Zona Industrial'};
                }else {
                  return {color:'red',zone:'Zona Industrial'};
                }
      
        default:
          return 'transparent';
          break;
      }
    } else {
      switch (data.zone) {
        case 'Zona de Protección Especial':
          if (data.spl<=40) {
            return {color:'green',zone:'Zona de Protección Especial'};
          }else {
            return {color:'red',zone:'Zona de Protección Especial'};
          }
          case 'Zona Residencial':
            if (data.spl<=50) {
              return {color:'green',zone:'Zona Residencial'};
            }else {
              return {color:'red',zone:'Zona Residencial'};
            }
            case 'Zona Comercial':
              if (data.spl<=60) {
                return {color:'green',zone:'Zona Comercial'};
              }else {
                return {color:'red',zone:'Zona Comercial'};
              }
              case 'Zona Industrial':
                if (data.spl<=70) {
                  return {color:'green',zone:'Zona Industrial'};
                }else {
                  return {color:'red',zone:'Zona Industrial'};
                }
        default:
          return 'transparent';
          break;
      }
  
    }
  }

const uvColor = (uvValue) => {
  
  return (uvValue>=0 && uvValue <3) ? {color:'green', label:'Mínimo'}: (uvValue>=3 && uvValue<6)  ? {color:'yellow', label:'Bajo'}:
    (uvValue>=6 && uvValue <9) ? {color:'orange', label:'Moderado'}: (uvValue>=9 && uvValue<12) ? {color:'red', label:'Alto'}:
    (uvValue<=12 && uvValue <=14) ? {color:'mediumpurple', label:'Muy Alto'} : {color:'darkmagenta', label:'Extremo'};
};


const indexValue = (data) => {
   
    const lat = data.lat.toFixed(5);  
    const lng = data.lon.toFixed(5);
    const UV = Number(data.UV.toFixed(1));
    const spl = Number(data.spl.toFixed(1));

    const newDate = new Date(data.timestamp);
    
    const time = newDate.getDate()+ ' de ' 
    +months[newDate.getMonth()] + ' de ' 
    + newDate.getFullYear()+ ', '+newDate.getHours()+':'+newDate.getMinutes()
    
    // const CO2 = (typeof data.CO2 !== 'number' || data.CO2 <= 0) ? '-' : data.CO2.toFixed(2);
    // const NO = (typeof data.NO !== 'number' || data.NO <= 0) ? '-' : data.NO.toFixed(2);
    const PM1 = Number(data.PM1);
    const humidity = Number(data.humidity.toFixed(1));
    const pressure = Number((data.pressure / 1000).toFixed(1));
    const temperature = Number(data.temperature.toFixed(1));

    const PM10 = Number((data.PM10).toFixed(1));
    const SO2 = Number((data.SO2).toFixed(1));
    const CO = Number((data.CO).toFixed(1));
    const H2S = Number((data.H2S).toFixed(1));
    const PM25 = Number((data.PM25).toFixed(1));
    const O3 = Number((data.O3).toFixed(1));
    const NO2 = Number((data.NO2).toFixed(1));
  
    return {
        lat,
        lng,
        UV,
        spl,
        time,
        PM1,PM1label:'PM1',
        humidity,
        pressure,
        temperature,
        PM10,PM10label:'PM10',
        SO2,SO2label:'SO2',
        CO,COlabel:'CO',
        H2S,H2Slabel:'H2S',
        PM25,PM25label:'PM25',
        O3,O3label:'O3',
        NO2,NO2label:'NO2'
    };
  }

const setQhawaxInfowindow = (map,marker,infoWindow,qhawax,company) => {
  console.log('setQhawaxInfowindow', company);
  
let content = 'Cargando...';
    if (qhawax.main_inca===null) {
      content = 'En Mantenimiento.';  
    } else {

      const socket = io.connect('https://qairamapnapi.qairadrones.com/');
     
      socket.on('new_data_summary_processed', (res) => {
          
          if (res.ID===marker.id) {

             const values = indexValue(res);
             const zoneColor = zoneColorNoise(res);
             const colorUV = uvColor(res.UV);
  

             fetch('https://qairamapnapi.qairadrones.com/api/last_gas_inca_data/')
             .then(res =>res.json())
             .then(qhawax_inca_list => {
       
               qhawax_inca_list.forEach(qhawax_inca => {
       
                 if (Number(res.ID.toString().slice(-2)) === qhawax_inca.qhawax_id) {
       
                   const qhawax_sensor_color = airQuality(qhawax_inca);


             content=
             `
             <div class="infoWindow">
                  <h6 class="header">${qhawax.comercial_name}<br><img src="${generateGif(qhawax,company)}" alt="Hoja Calidad aire" class="qairito-img"></h6>
                  <h7 class="header"><strong>${zoneColor.zone}</strong></h7><br>
                  <h7 class="header">${values.time}</h7>
                <div class="gas-table">
                <table class="responsive-table centered">
                  <thead>
                    <tr>
                        <th><br>(${res.ID})<br></th>
                        <th>${window.innerWidth>768?'Monóxido de Carbono ':''}(CO)</th>
                        <th>${window.innerWidth>768?'Dióxido de Nitrógeno ':''}(NO<sub>2</sub>)</th>
                        <th>${window.innerWidth>768?'Ozono ':''}(O<sub>3</sub>)</th>
                        <th>${window.innerWidth>768?'Sulfuro de Hidrógeno ':''}(H<sub>2</sub>S)</th>
                        <th>${window.innerWidth>768?'Dióxido de Azúfre ':''}(SO<sub>2</sub>)</th>
                        <th>${window.innerWidth>768?'Material Particulado ':'PM'}(2,5&micro;)</th>
                        <th>${window.innerWidth>768?'Material Particulado ':'PM'}(10&micro;)</th>
                    </tr>
                  </thead>
                  <tbody >
                    <tr>
                        <td ><strong>INCA</strong> <br>(promedio <br>${qhawax_sensor_color.time})</td>
                        <td bgcolor="${qhawax_sensor_color.qCO.color}">${qhawax_sensor_color.qCO.label}<br>(${qhawax_inca.CO})</td>
                        <td bgcolor="${qhawax_sensor_color.qNO2.color}">${qhawax_sensor_color.qNO2.label}<br>(${qhawax_inca.NO2})</td>
                        <td bgcolor="${qhawax_sensor_color.qO3.color}">${qhawax_sensor_color.qO3.label}<br>(${qhawax_inca.O3})</td>
                        <td bgcolor="${qhawax_sensor_color.qH2S.color}">${qhawax_sensor_color.qH2S.label}<br>(${qhawax_inca.H2S})</td>
                        <td bgcolor="${qhawax_sensor_color.qSO2.color}">${qhawax_sensor_color.qSO2.label}<br>(${qhawax_inca.SO2})</td>
                        <td bgcolor="${qhawax_sensor_color.qPM25.color}">${qhawax_sensor_color.qPM25.label}<br>(${qhawax_inca.PM25})</td>
                        <td bgcolor="${qhawax_sensor_color.qPM10.color}">${qhawax_sensor_color.qPM10.label}<br>(${qhawax_inca.PM10})</td>
                    </tr>
                    <tr>
                        <td >Concentración <br>Tiempo Real</td>
                        <td class="infowindow-graph"><a class="modal-trigger" href="#modalGraphic" data-infograph="${marker.id}" data-label="${values.COlabel}">${values.CO}<br>(ppb)</a></td>
                        <td class="infowindow-graph"><a class="modal-trigger" href="#modalGraphic" data-infograph="${marker.id}" data-label="${values.NO2label}">${values.NO2}<br>(ppb)</a></td>
                        <td class="infowindow-graph"><a class="modal-trigger" href="#modalGraphic" data-infograph="${marker.id}" data-label="${values.O3label}">${values.O3}<br>(ppb)</a></td>
                        <td class="infowindow-graph"><a class="modal-trigger" href="#modalGraphic" data-infograph="${marker.id}" data-label="${values.H2Slabel}">${values.H2S}<br>(ppb)</a></td>
                        <td class="infowindow-graph"><a class="modal-trigger" href="#modalGraphic" data-infograph="${marker.id}" data-label="${values.SO2label}">${values.SO2}<br>(ppb)</a></td>
                        <td class="infowindow-graph"><a class="modal-trigger" href="#modalGraphic" data-infograph="${marker.id}" data-label="${values.PM25label}">${values.PM25}<br>(&micro;g/m<sup>3</sup>)</a></td>
                        <td class="infowindow-graph"><a class="modal-trigger" href="#modalGraphic" data-infograph="${marker.id}" data-label="${values.PM10label}">${values.PM10}<br>(&micro;g/m<sup>3</sup>)</a></td>
                    </tr>
                  </tbody>
                </table>
                </div>
                <div class="">
                <table class="responsive-table centered">
                  <thead>
                    <tr>
                      <th></th>
                      <th>${window.innerWidth>768?'Ruido ':'Ruido '}(dB)</th>
                      <th>${window.innerWidth>768?'Temperatura ':'T '}(°C)</th>
                      <th>${window.innerWidth>768?'Ultra Violeta ':'UV '}</th>
                      <th>${window.innerWidth>768?'Presión ':'P '}(kPa)</th>
                      <th>${window.innerWidth>768?'Humedad ':'H '} (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Tiempo<br> Real</strong></td>
                      <td bgcolor="${zoneColor.color}">${values.spl}</td>
                      <td>${values.temperature}</td>
                      <td bgcolor="${colorUV.color}">${colorUV.label}<br>${values.UV}</td>
                      <td>${values.pressure}</td>
                      <td>${values.humidity}</td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </div>
             ` 
            };})})
          }
          infoWindow.setContent(content) ; 
          const infograph = document.querySelectorAll('.infowindow-graph')
    
          infograph.forEach(ig =>
            ig.addEventListener('click',(e) => {        
              const qhawax_id= e.target.dataset.infograph;
              const qhawax_sensor = e.target.dataset.label;
      
              drawChart(qhawax_sensor, qhawax_id)
      
            }))
       });
      
    }

   
    infoWindow.open(map, marker);
    google.maps.event.addListener(map, 'click', ()=>{
      infoWindow.close(map, marker);
    }); 
}


const drawQhawaxMap = (map,qhawax,company) => {
  
    const previous_marker_index = map.markers.findIndex(marker => marker.id === qhawax.qhawax_name);

  if (previous_marker_index != -1) {
    map.markers[previous_marker_index].setMap(null);
    map.markers.splice(previous_marker_index, 1);
  }
    
    const qhawax_marker = new google.maps.Marker({
        position: {lat: qhawax.lat, lng: qhawax.lon},
        map: map,
        icon: {
          url: qhawaxLeaf(qhawax.main_inca, qhawax.qhawax_name),
          scaledSize: new google.maps.Size(35, 35)
        },
        id: qhawax.qhawax_name,
      });
    const infoWindow = new google.maps.InfoWindow(); 
    qhawax_marker.addListener('click', () => {
        setQhawaxInfowindow(map,qhawax_marker,infoWindow,qhawax,company)
        
    })

      map.markers.push(qhawax_marker);
    
}
   

export { drawQhawaxMap, mapCenter};