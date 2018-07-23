import L from 'leaflet';
import mapboxgl from 'mapbox-gl';
import mapboxGL from 'mapbox-gl-leaflet';
import leafletImage from 'leaflet-image';

import './assets/scss/preview.scss';

var maptilerBlack = 'https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/PTM-Blacklines/{z}/{x}/{y}.png?key=T8rAFKMk9t6uFsXlx0KS';
var maptilerVectorBlack = 'https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/PTM-Blacklines/style.json?key=T8rAFKMk9t6uFsXlx0KS';
var maptilerWhite = 'https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/PTM-Whitelines/{z}/{x}/{y}.png?key=T8rAFKMk9t6uFsXlx0KS';
var maptilerVectorWhite = 'https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/PTM-Whitelines/style.json?key=T8rAFKMk9t6uFsXlx0KS';

let coordinates;
let style;
let markercoordinates;
let markerstyle;

if(findGetParameter("c")){
    coordinates = L.latLngBounds(L.latLng(51.4338638,5.505379599999969),L.latLng(51.5379958,5.60615770000004));
}
if(findGetParameter("s")){
    style = findGetParameter("s");
}
if(findGetParameter("mc")){
    markercoordinates = findGetParameter("mc");
}
if(findGetParameter("ms")){
    markerstyle = findGetParameter("ms");
}


var map = L.map('map', { 
    preferCanvas: true,
    renderer: L.svg(),
    dragging: false,
    zoomControl: false
}).fitBounds(coordinates);


map.on('load', leafletImage(map, function(err, canvas) {
    // now you have canvas
    // example thing to do with that canvas:
    var img = document.createElement('img');
    var dimensions = map.getSize();
    img.width = dimensions.x;
    img.height = dimensions.y;
    img.src = canvas.toDataURL();
    document.getElementById('images').innerHTML = '';
    document.getElementById('images').appendChild(img);

    console.log(err);
}));

let mapStyle = L.mapboxGL({
    style: maptilerVectorBlack,
    accessToken: 'no-token'
}).addTo(map);

// new L.marker(map.getCenter(), {
//     icon: L.icon({iconUrl: markerstyle, className: 'marker'})
// }).addTo(map);



// Deze functie haalt de coordinaten van de GET header op
function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}
