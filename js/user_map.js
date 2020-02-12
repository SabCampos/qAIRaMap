window.onload = () => {

    document.getElementById('loader').classList.add('hide');
    
    const mobileMenu = document.getElementById('mobile-nav');
    M.Sidenav.init(mobileMenu);

};

const socket = io.connect('http://54.159.70.183/');

  socket.on('new_data_summary', (data) => {
    // console.log(data);
    
});

const script1 = document.createElement("script");
script1.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDqrNaRtt0c6vhC55vQ9v12nhqt-rDhREg&language=en&callback=initMap"
script1.async=true;
script1.defer=true;
 document.body.appendChild(script1);

const script2 = document.createElement("script");
script2.text= ` initMap =() => {
new google.maps.Map(document.getElementById('map'), {
    center: {lat: -13.2687204, lng: 33.9301963},
    zoom: 8
  })}`;
document.body.appendChild(script2);

var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }