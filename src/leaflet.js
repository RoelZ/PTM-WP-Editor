import L from 'leaflet';
import './assets/scss/app.scss';

var map = L.map('map').setView([51.441767, 5.470247], 13);
L.tileLayer('https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/PTM-Blacklines/{z}/{x}/{y}.png?key=T8rAFKMk9t6uFsXlx0KS', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
}).addTo(map);

var ptmIcon = L.icon({
    iconUrl: 'http://www.placethemoment.com/dev/wp-content/uploads/2017/11/ptm-marker-dark.png',
    shadowUrl: ''
});

var marker = L.marker([51.441767, 5.470247],{
    draggable: true,
    icon: ptmIcon
  }).addTo(map);
  

  marker.on('dragend', function (e) {
      console.log('hoi: ' + e);
  });
