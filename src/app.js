import 'bootstrap';
import $ from 'jquery';
import mapboxgl from 'mapbox-gl';
import './assets/scss/app.scss';

var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
//var urlExists = require('url-exists');

var varId;  // WooCommerce ID
var cartUrl = 'http://www.placethemoment.com/dev/collectie/city-map-poster/?attribute_pa_dimensions=50x70cm&attribute_design=';
var styleUrl = 'http://localhost:8080/styles/ptm-black-lines/style.json';
/*
function checkUrlExists(host,cb) {
    http.request({method:'HEAD',host,port:80,path: '/'}, (r) => {
        cb(null, r.statusCode > 200 && r.statusCode < 400 );
    }).on('error', cb).end();
}

console.log(checkUrlExists(styleUrl));

urlExists(styleUrl, function(err, exists){
    if(!exists)
        styleUrl = 'mapbox://styles/mapbox/basic-v9'; ///styles/roelz/cjbp002fe6an22smmpzfotnk4?optimize=true
});
*/

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9lbHoiLCJhIjoiY2phczkwc25mNXJieTJxbnduYTNtaDNneiJ9.7eTxRRsp0GbqkZOJMxRw8g';
const map = new mapboxgl.Map({
    container: 'mapbox',
    style: styleUrl,
    center: [5.4546,51.4553],
    zoom: 10,
    hash: true,
});

const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
});

//map.addControl(geocoder);
$('#geocoder').append(geocoder.onAdd(map));

// Adding source layer after map is loaded
map.on('load', function(){   

    addMarker();

    console.log(map.getCenter());
    $('#addToCart input[name="design_id"]').val(token());
    $('#addToCart input[name="marker_coordinates"]').val(map.getCenter().lat+','+map.getCenter().lng+','+map.getZoom());
    
    // empty on load
    $('#addToCart input[name="ptm_moment"]').val();
    $('#addToCart input[name="ptm_location"]').val();
    $('#addToCart input[name="ptm_address"]').val();
    

    if(findGetParameter("mc")){

        var markerCoordinates = findGetParameter("mc");
        //var locationMarker = [{"type":"FeatureCollection","features":[{"type":"Feature", "geomerty": { "type": "Point", "coordinates": [5.463783, 51.443383] }}]}];
        var locationMarker = {type: 'FeatureCollection',
        features: [{
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [markerCoordinates]
        }
        }]};
        
        console.log(markerCoordinates);

        locationMarker.features.forEach(function(marker){
            var el = document.createElement('div');
            el.className = 'marker';

            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);
        });
    }
    

        // Wachten op een geocoder.input event
        geocoder.on('result', function(ev){
            console.log('na input, result: '+ev.result);
            locationMarker = ev.result.geometry;
            map.getSource('single-point').setData(locationMarker);
            
            // Adding marker coordinates to form
            //$('#addToCart input[name="marker_coordinates"]').val(locationMarker.coordinates[0]+','+locationMarker.coordinates[1]+','+map.getZoom());

            // Adding address on poster
            var locationCity = ev.result.context[1].text;
            var locationCountry = ev.result.context[3].text;
            var locationAddress = ev.result.text+" "+ev.result.address;

            $('#locationInput').val(locationCity+" - "+locationCountry);
            $('#addToCart input[name="ptm_location"]').val(locationCity+" - "+locationCountry);
            $('#addressInput').val(locationAddress);
            $('#addToCart input[name="ptm_address"]').val(locationAddress);

            $("#posterText .card-text:first").html(locationCity+" - "+locationCountry);
            $("#posterText .card-text:last").html(locationAddress);

            map.on('moveend', function(e){
                $('#addToCart input[name="marker_coordinates"]').val(ev.result.geometry.coordinates+','+Math.round(map.getZoom() * 10) / 10);
            });
            
        });
    //}

});
            
map.on('dragend', function(e){
    $('#addToCart input[name="marker_coordinates"]').val(map.getCenter().lat+','+map.getCenter().lng+','+map.getZoom());
});
map.on('moveend', function(e){
    $('#addToCart input[name="marker_coordinates"]').val(map.getCenter().lat+','+map.getCenter().lng+','+map.getZoom());
});

var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
    return rand(); // + rand() to make it longer
};

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

function addMarker(){   

    map.addSource('single-point', {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": []
        }
    });

    map.addLayer({
        "id": "point",
        "source": "single-point",
        "type": "circle",
        "paint": {
            "circle-radius": 10,
            "circle-color": getMarkerStyle()
        }
    });
}

function getStyle(name){

    if(name == 'mapboxStyle'){
        varId = 1207
        return 'mapbox://styles/mapbox/streets-v9';
    }
    else if(name == 'snow'){
        varId = 1207
        return 'http://localhost:8080/styles/ptm-black-lines/style.json'; //'mapbox://styles/roelz/cjbp002fe6an22smmpzfotnk4';
    }
    else if(name == 'moon'){
        varId = 1208
        return 'http://localhost:8080/styles/ptm-white-lines/style.json'; //'mapbox://styles/roelz/cjbp18k2y6h922rmxjdv2r6zn';
    }
    else if(name == 'granite'){
        varId = 1209
        return 'http://localhost:8080/styles/ptm-white-lines/style.json'; //'mapbox://styles/roelz/cjbp18k2y6h922rmxjdv2r6zn';
    }
    else if(name == 'mint'){
        varId = 1210
        return 'http://localhost:8080/styles/ptm-white-lines/style.json'; //'mapbox://styles/roelz/cjbp18k2y6h922rmxjdv2r6zn';
    }
    
}

function getMarkerStyle(){
    if(currentStyle == "snow")
        return '#6fa189';
    else if(currentStyle == "moon")
        return '#ffffff';
    else if(currentStyle == "granite")
        return '#d8ae46';
    else 
        return '#54575c';
}

// Tabs: Moment
var activeTab;

$(".nav-item").click(function(e){
    
    if(e.target.id == "moment-tab"){
        $('main').addClass('moment');
        $('main').animate({scrollTop: $("main").height()}, 'slow');
        //return false;        
    }
    else if(activeTab == "moment-tab") {
        $('main').removeClass('moment');
        $('main').animate({scrollTop: 0}, 'slow');
    }

    activeTab = e.target.id;
});

// Dynamic text on poster
$('#momentInput').val($("#posterText .card-title").text());
//$('#momentInput').change(function(){
$("#momentInput").on("input", function(){
    $("#posterText .card-title").text($(this).val());
    $('#addToCart input[name="ptm_moment"]').val($(this).val());
});

$("#locationInput").on("input", function(){    
    $("#posterText .card-text:first")
        .html($(this).val());
});

$("#addressInput").on("input", function(){    
    $("#posterText .card-text:last")
        .html($(this).val());
});

// Styling buttons
var currentStyle = "snow";  // later GET aan toevoegen
$("#styleSelector .btn").click(function ( event ) {
    
    currentStyle = toString(event.target.id);
    console.log(event.target.id+': '+getStyle(event.target.id));

    //map.setStyle(getStyle(event.target.id));
    //$('.card').removeClass('snow', 'moon', 'granite', '')
    $('.card').attr('class','card '+event.target.id);

    $('#addToCart').attr('action', cartUrl+event.target.id);

    var styleUrl = getStyle(event.target.id);        
    map.setStyle(styleUrl);

    map.on('load', function(){
    //if(map.isStyleLoaded){
        addMarker();
        console.log(map.getSource('single-point'));
        map.getSource('single-point').setData(locationMarker);
    });

    $('#addToCart input[name="variation_id"]').val(varId);
    //map.setStyle('mapbox://styles/mapbox/basic-v9');
    //event.preventDefault();
});