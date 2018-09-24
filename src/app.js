import 'bootstrap';
import $ from 'jquery';
require('webpack-jquery-ui/resizable');
import L from 'leaflet';
import mapboxgl from 'mapbox-gl';
import mapboxGL from 'mapbox-gl-leaflet';
import { GeoSearchControl, GoogleProvider } from 'leaflet-geosearch';
import html2canvas from 'html2canvas';
import leafletImage from 'leaflet-image';
// import manipulateCanvasFunction from './assets/js/manipulateCanvas';

import './assets/scss/app.scss';

var maptilerRasterSnow = 'https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/PTM-Blacklines/{z}/{x}/{y}.png?key=T8rAFKMk9t6uFsXlx0KS';
var maptilerRasterMoon = 'https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/test-8136c/style.json?key=T8rAFKMk9t6uFsXlx0KS';
var maptilerRasterGranite = 'https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/PTM-Granite/{z}/{x}/{y}.png?key=T8rAFKMk9t6uFsXlx0KS';
var maptilerRasterMint = 'https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/PTM-Mint/{z}/{x}/{y}.png?key=T8rAFKMk9t6uFsXlx0KS';

var maptilerBlack = 'https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/PTM-Blacklines/{z}/{x}/{y}.png?key=T8rAFKMk9t6uFsXlx0KS';
var maptilerVectorBlack = 'https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/PTM-Blacklines/style.json?key=T8rAFKMk9t6uFsXlx0KS';
var maptilerRaster2xBlack = 'https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/PTM-Blacklines/{z}/{x}/{y}@2x.png?key=T8rAFKMk9t6uFsXlx0KS';
var maptilerWhite = 'https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/PTM-Whitelines/{z}/{x}/{y}.png?key=T8rAFKMk9t6uFsXlx0KS';
var maptilerVectorWhite = 'https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/PTM-Whitelines/style.json?key=T8rAFKMk9t6uFsXlx0KS';
var maptilerRaster2xWhite = 'https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/PTM-Whitelines/{z}/{x}/{y}@2x.png?key=T8rAFKMk9t6uFsXlx0KS';

var defaultSnowMapStyle = maptilerRasterSnow;
var defaultMoonMapStyle = maptilerRasterMoon;
var defaultGraniteMapStyle = maptilerRasterGranite;
var defaultMintMapStyle = maptilerRasterMint;

// var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
//var urlExists = require('url-exists');
const provider = new GoogleProvider({
    params: {
        key: 'AIzaSyDmN3d6aCXHXYo_oLjCEAdvUmO3ca38CVQ'
    }
});
const searchControl = new GeoSearchControl({
  provider: provider,
  autoCompleteDelay: 250,
  retainZoomLevel: false,
  animateZoom: false,

});

let varId;  // WooCommerce ID
let addToCart = $('#addToCart');
let cartUrl = addToCart.attr('action');
// var cartUrl = 'https://www.placethemoment.com/dev/collectie/city-map-poster/?attribute_pa_dimensions=50x70&attribute_design=';
//var styleUrl = 'https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/PTM-Blacklines/style.json?key=T8rAFKMk9t6uFsXlx0KS';
//var styleUrl = 'http://localhost:8080/styles/ptm-white-lines-final/style.json';
//var styleUrl = 'http://placethemoment.com/dev/ptm-editor/assets/styles/style.json';
//var styleUrl = "mapbox://styles/roelz/cjbp002fe6an22smmpzfotnk4";
//var styleUrl = maptilerBlack;

let currentMarkerStyle = "yellow";
let currentStyle = defaultStyle();
let defaultStartView = defaultView();

let defaultMarkerStyleUrl = getMarker(currentMarkerStyle);
var imgData = "";
let isMobile = false;

// Hidden Form values
let formCoordinates = $('#addToCart input[name="coordinates"]');
let formPlaceId = $('#addToCart input[name="placeid"]');
let formZoom = $('#addToCart input[name="zoom"]');
let formMarkerCoordinates = $('#addToCart input[name="marker_coordinates"]');
let formMarkerStyle = $('#addToCart input[name="marker_style"]');
let formVariationId = $('#addToCart input[name="variation_id"]');

let ptm_moment = $('#addToCart input[name="ptm_moment"]');
let ptm_subline = $('#addToCart input[name="ptm_subline"]');
let ptm_tagline = $('#addToCart input[name="ptm_tagline"]');
let ptm_thumb = $('#addToCart input[name="ptm_thumb"]');

ptm_subline.val(defaultStartView.name);
$('#sublineInput').val(defaultStartView.name);
$("#posterText .card-text:first").html(defaultStartView.name);
ptm_tagline.val('The Netherlands');
$('#taglineInput').val('The Netherlands');
$("#posterText .card-text:last").html('The Netherlands');

/* INITIAL BREAKPOINTS CHECK */
$(document).ready(function() {
    checkSize();    
    $(window).resize(checkSize);   

    // Needs realtime isMobile check!
    if(isMobile){
        $('main').on('click', function(){
            $('.collapse').collapse('hide');
        });

        $('#collapseTwo').on('show.bs.collapse', function(){
            $('#collapseThree').collapse('hide');
            $('#posterWrapper').css('transform', 'translateY(-27%)');
        });
        $('#collapseTwo').on('hide.bs.collapse', function(){
            $('#posterWrapper').css('transform','');
        });        
        $('#collapseThree').on('show.bs.collapse', function(){
            $('#collapseTwo').collapse('hide');
            $('#posterWrapper').css('transform', 'translateY(-44%)');
        });
        $('#collapseThree').on('hide.bs.collapse', function(){
            $('#posterWrapper').css('transform','');
        });

        $('#accordion .btn-group button.btn-ptmLight').on('click', function(){
            $('#accordion .btn-group button').removeClass('active');
        });

        $('.collapse').on('show.bs.collapse', function (){
            $('button[data-target="#'+$(this).attr('id')+'"]').addClass('active');
        });
        $('.collapse').on('hide.bs.collapse', function (){
            $('button[data-target="#'+$(this).attr('id')+'"]').removeClass('active');
        });        

        $('nav.navbar').removeClass('d-flex').addClass('d-none');
        
    }
    
    $('#posterText').on('click', function(){
        $('#collapseTwo').collapse('toggle');
        $('#momentInput').focus();
    });
});

function checkSize(){
    // if ($(".sidebar-sticky").css('position') != 'sticky'){
    if ($("#accordion > div").css('display') == 'none'){
        isMobile = true;

        if(!$('#collapseOne').hasClass('show')){
            $('#collapseOne').addClass('show');
        }        
        
        addToCart.appendTo('#btnGroup');

    } else {
        // $('#accordion .navbar span').next().prepend(addToCart);
    }

}

// *** Resize Poster Canvas ***
var $el = $("#posterCanvas");
var elHeight = $el.outerHeight();
var elWidth = $el.outerWidth();

var $wrapper = $("#posterWrapper");

$wrapper.resizable({
    resize: doResize
});

function doResize(event, ui) {

var scale, origin;
    
scale = Math.min(
    ui.size.width / elWidth,    
    ui.size.height / elHeight
);

scale = scale > 1 ? 1 : scale;

$el.css({
    transform: "translate(-50%, -50%) " + "scale(" + scale + ")"
});

}

var starterData = { 
size: {
    width: $wrapper.width(),
    height: $wrapper.height()
}
}
doResize(null, starterData);

$(window).resize(function() {
    starterData = { 
        size: {
            width: $wrapper.width(),
            height: $wrapper.height()
        }
    }
    doResize(null, starterData);
});

/*
function checkUrlExists(host,cb) {
    http.request({method:'HEAD',host,port:80,path: '/'}, (r) => {
        cb(null, r.statusCode > 200 && r.statusCode < 400 );
    }).on('error', cb).end();
}
*/

// var canvas = map.getCanvasContainer();
let debugPanel = $('#debugger');

// L.CRS.CustomZoom = L.extend({}, L.CRS.Simple, {
//     scale: function (zoom) {
//         // This method should return the tile grid size
//         // (which is always square) for a specific zoom
//         // We want 0 = 200px = 2 tiles @ 100x100px,
//         // 1 = 300px = 3 tiles @ 100x100px, etc.
//         // Ie.: (200 + zoom*100)/100 => 2 + zoom

//         // return 2 + zoom;
//         return zoom;
//     }
// });

let map = L.map('mapbox', { 
    renderer: L.canvas(),
    preferCanvas: true,
    zoomControl: false,
    attributionControl: false,
    // crs: L.CRS.CustomZoom
});


map.on('load', function(){
    formCoordinates.val(JSON.stringify(map.getBounds()));
    formZoom.val(13);
    formMarkerStyle.val(currentMarkerStyle);
    formMarkerCoordinates.val(L.latLng([defaultStartView.lat,defaultStartView.lng]));
    // updateDebugger();
})
.setView(L.latLng([defaultStartView.lat,defaultStartView.lng]),13);



var ptmMoon = L.mapboxGL({ style: defaultMoonMapStyle, accessToken: 'no-token', crossOrigin: true });
    // ptmWhite = L.mapboxGL({ style: defaultWhiteMapStyle, accessToken: 'no-token', crossOrigin: true })

ptmMoon.addTo(map);
var activeLayer = ptmMoon;

var ptmSnow = L.tileLayer(defaultSnowMapStyle, { attribution: false, maxZoom: 21, crossOrigin: 'anonymous', zoomOffset: 2 }),
    // ptmMoon = L.tileLayer(defaultMoonMapStyle, { attribution: false, maxZoom: 21, crossOrigin: 'anonymous' }),
    ptmGranite = L.tileLayer(defaultGraniteMapStyle, { attribution: false, maxZoom: 21, crossOrigin: 'anonymous', zoomOffset: -1, tileSize: 512 }),
    ptmMint = L.tileLayer(defaultMintMapStyle, { attribution: false, maxZoom: 21, crossOrigin: 'anonymous', zoomOffset: 2 });

// getStyle(currentStyle).addTo(map);
// var activeLayer = getStyle(currentStyle);

    // ptmBlack.addTo(map);
// var activeLayer = ptmBlack;

let markerOnMap = new L.marker(map.getCenter(), {
    icon: L.icon({
    iconUrl: defaultMarkerStyleUrl,
    iconSize: [24, 32],
    className: 'marker'
}),
draggable: true,
}).addTo(map);






const geocoderInput = $('#geocoder');

const GooglePlacesSearchBox = L.Control.extend({
onAdd: function() {
    var element = document.createElement("input");
    element.id = "searchBox";
    // var element = $('#searchBox');
    return element;
}
});

L.control.zoom({position:'topright'}).addTo(map);

(new GooglePlacesSearchBox).addTo(map);
  
var input = document.getElementById("searchBox");
$(input).addClass('form-control py-2 border-right-0 border')
.attr('placeholder','Enter your place');

var searchBox = new google.maps.places.SearchBox(input);

searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
  
    if (places.length == 0) {
      return;
    }

    let latlng,latlngbounds;
    let locationCity, locationCountry, locationName;
    let subline,tagline;
    
    places.forEach(function(place) {
        console.log(place.place_id);        
        formPlaceId.val(place.place_id);

        $.getJSON('https://www.placethemoment.com/api/v1/json.php?placeid='+place.place_id, function(data){            
        console.log(data.result);

        // Adding address fields
        data.result.address_components.forEach(address => {
            address.types.forEach(type => {
                if(type == 'country')
                    locationCountry = address.long_name;

                if(locationCity == '' && type == 'administrative_area_level_2'){
                    locationCity = address.short_name;
                }else if(type == 'locality'){
                    locationCity = address.long_name;
                }
            });
        });

        locationName = data.result.name;

        if(locationCity == locationName)
            tagline = locationCountry;
        else if(locationCountry == locationName)
            tagline = locationCity;
        else
            tagline = locationCity ? locationCity+" - "+locationCountry : locationCountry;

        $('#sublineInput').val(locationName);
        ptm_subline.val(locationName);
        $('#taglineInput').val(tagline);
        ptm_tagline.val(tagline);

        $("#posterText .card-text:first").html(locationName);
        $("#posterText .card-text:last").html(tagline);

        });

        latlng = L.latLng(
                place.geometry.location.lat(),
                place.geometry.location.lng()
        );

        let northeast = L.latLng(place.geometry.viewport.f.b,place.geometry.viewport.b.b);
        let southwest = L.latLng(place.geometry.viewport.f.f,place.geometry.viewport.b.f);

        latlngbounds = L.latLngBounds(northeast,southwest);

    if(markerOnMap)
        map.removeLayer(markerOnMap);
        
        let markerStyle;
        
        $('#markerSelector').find("label").each(function(){ 
            if($(this).hasClass('active')){
                markerStyle = getMarker($(this).attr('id'));
            }
        });


        markerOnMap = new L.marker(latlng, {
            icon: L.icon({
              iconUrl: defaultMarkerStyleUrl,
              iconSize: [24, 32], 
              className: 'marker'
            }),
          draggable: true,
        })
        .addTo(map);
        
        markerOnMap.setIcon(L.icon({ 
            iconUrl: defaultMarkerStyleUrl,
            iconSize: [24, 32], 
            className: 'marker' }));
                
        formMarkerCoordinates.val(markerOnMap.getLatLng());
        
        markerOnMap.on('dragend', function(){
            formMarkerCoordinates.val(markerOnMap.getLatLng());
        });
       
    }); 

    map.flyToBounds(latlngbounds, {duration: 3, maxZoom: 15});

    // Adding coordinate bounds
    // console.log(latlngbounds);
    formCoordinates.val(JSON.stringify(latlngbounds));
    updateDebugger();

  });

input.focus();

$('.mapwindow').append($('.leaflet-control-container'));
geocoderInput.append(input);
geocoderInput.append('<span class="input-group-append"><button class="btn btn-outline-light border-left-0 border" type="button"><i class="fa fa-search"></i></button></span>');


map.on('zoomend', function(){
    formZoom.val(map.getZoom());
    formCoordinates.val(JSON.stringify(map.getBounds()));
    updateDebugger();
});
    

map.on('moveend', function(){
    formCoordinates.val(JSON.stringify(map.getBounds()));
    updateDebugger();
});



// Adding source layer after map is loaded
// map.on('load', function(){   

//     debugPanel.style.display = 'none';
//     debugPanel.innerHTML = 'Longitude: ' + map.getBounds();
//     var mapCanvas = map.getCanvas();

//     if(!isMobile){
//     //BLOB
    
//     //function({
//         /*
//     mapCanvas.toBlob(function(blob){
//         var newImg = document.createElement('img'),
//         url = URL.createObjectURL(blob);

//         newImg.onload = function(){
//             URL.revokeObjectURL(url);
//         };

//         newImg.src = url;
//         $('#canvasImage').parent('div').append(newImg);
//         //document.body.appendChild(newImg);
//     });
//     */

//     // PNG
        
//    imgData = mapCanvas.toDataURL('image/png',1);
//    $('#canvasImage').attr("src",imgData);  

//    /*
//    domtoimage.toBlob(mapCanvas)
//    .then(function(blob){
//     window.saveAs(blob, 'ptm-map.png');
//    });
//     */

//     // SVG
//     //mapCanvas.toBlob(function(blob){
// /*
//     var svgString = new XMLSerializer().serializeToString(mapCanvas);
//     var svg = new Blob([svgString], { type: "image/svg+xml;charset=utf-8"});
//     var svgurl = URL.createObjectURL(svg);
    
//     var newImg = document.createElement('img');
//     newImg.onload = function(){
//         URL.revokeObjectURL(svgurl);
//     };

//     newImg.src = svgurl;
//     $('#canvasImage').parent('div').append(newImg);
// */
//     //});
//     //var svg = $('#mapbox .mapbox-canvas').html();
//     //console.log(imgData);  
    
//     //var ctx = new SVGCanvas("mapboxgl-canvas");
//     //$('#canvasImage').parent().html(ctx.toDataURL("image/svg+xml"));
//     //var xml = '<?xml version="1.0" encoding="utf-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd"><svg xmlns="http://www.w3.org/2000/svg" width="' + 600 + '" height="' + 600 + '" xmlns:xlink="http://www.w3.org/1999/xlink"><source><![CDATA[' + imgData + ']]></source>' + svg + '</svg>';
//     //var b64 = Base64.encode(svg);
    
//     //$('#canvasImage').append("<a href-lang='image/svg+xml' href='data:image/svg+xml;base64,\n"+b64+"'>download</a>");
    
//     //PDF
//     /*
//     var doc = new jsPDF();

//     if(currentStyle == "granite"){
//         doc.setFillColor("44","34","22","77");  //44 34 22 77
//     } else if(currentStyle == "mint"){
//         doc.setFillColor("54","8","47","14");  //54 8 47 14
//     } else {
//         doc.setFillColor(44,34,22,77);  //44 34 22 77
//     }

//     doc.roundedRect(5,7,200,200,100,100);

//     doc.setFontSize("56");
//     //doc.setFont("Open Sans");
//     doc.setTextColor("255");
//     if($('#momentInput').val())
//         var docText = $('#momentInput').val();
//     else
//         var docText = "Place the moment";
//     doc.text(docText,"50","220");

//     doc.addImage(imgData, 'png', 5, 7, 200, 200, '', 'slow');
//     doc.save('ptm-print.pdf');
// )}
//     */
// }
    
// });  // end Map onLoad


var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
    return rand() + rand() // eßxtra rand() to make it longer
};

function updateDebugger(){
    console.log(map.getZoom());
    //map.getBounds().toBBoxString()
    debugPanel.html('sw='+btoa(
        map.getBounds().getSouth()+','+
        map.getBounds().getWest())
        +'&ne='+btoa(
        map.getBounds().getNorth()+','+
        map.getBounds().getEast())
    );
    // html2canvas(document.querySelector("#mapbox"), { 
    //         // proxy: 'http://www.placethemoment.com/dev/editor/proxy/proxy.php',
    //         logging: true, 
    //         useCORS: true 
    //     }).then(canvas => {
    //     $('#canvasImage').parent('div').append(canvas);  //.appendChild(canvas)
    //      console.log(canvas.toDataURL('image/png',1));
    //  });

    // $('#mapbox').html2canvas({
    //     profile: false,
    //     useCORS: true
    // });

    // $('#canvasImage').parent('div').append(manipulateCanvasFunction(savedMap).toDataURL("image/png"));
    
}

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

// Functie om een correcte Mapbox LngLat output te geven op basis van coordinaten (b.v. 51.31,5.1)
function getCoordinates(value){
    var cor = new Array();
    cor= value.split(',');
    //return mapboxgl.LngLat(cor[0],cor[1]);
    return cor;
}


function defaultView(){
    let places = {
        0 : {
            name: 'Eindhoven',
            lat : '51.441767',
            lng : '5.470247',
            zoom : '12.1'
        },
        1 : {
            name: 'Utrecht',
            lat : '52.090737',
            lng : '5.12142',
            zoom : '12.1'
        },
        2 : {
            name: 'Amsterdam',
            lat : '52.370216',
            lng : '4.895168',
            zoom : '12.1'
        },
    }

    let randomItem = Math.floor(Math.random() * Object.keys(places).length);  
        
    return places[randomItem];
}

function defaultStyle(){
    
    let style = findGetParameter('attribute_design') ? findGetParameter('attribute_design') : "moon";
    $('.poster').attr('class','card poster '+style);    
    $('#addToCart').attr('action', cartUrl+style);          
    
    // currentMarkerStyle = $('#markerSelector').find("label.active").attr('id');
    // markerOnMap.setIcon(L.icon({ iconUrl: getMarker(currentMarkerStyle), className: 'marker' }));        
    
    return style;    
}

function getStyle(name){

    if(name == 'mapboxStyle'){
        varId = 1207
        return mapboxStyle;
        //return 'mapbox://styles/mapbox/streets-v9';
    }
    else if(name == 'maputnikStyle'){
        varId = 1207
        return maputnikStyle;
    }
    else if(name == 'snow'){
        formVariationId.val(1207);
        return ptmSnow
        // return defaultBlackMapStyle; //'http://localhost:8080/styles/ptm-black-lines-final/style.json'; 
    }
    else if(name == 'moon'){
        formVariationId.val(1208);
        return ptmMoon
        // return defaultWhiteMapStyle; //'http://localhost:8080/styles/ptm-white-lines-final/style.json'; 
    }
    else if(name == 'granite'){
        formVariationId.val(1209);
        return ptmGranite
        // return defaultWhiteMapStyle; //'http://localhost:8080/styles/ptm-white-lines-final/style.json'; 
    }
    else if(name == 'mint'){
        formVariationId.val(1210);
        return ptmMint
        // return defaultWhiteMapStyle; //'http://localhost:8080/styles/ptm-white-lines-final/style.json'; 
    }
    
}
function getVariation(style){
    if(style == 'snow')
        return 1207;
    else if(style == 'moon')
        return 1208;
    else if(style == 'granite')
        return 1209;
    else if(style == 'mint')
        return 1210;
}

function defaultMarkerStyle(){
    if(currentStyle == "snow")
        return 'mint';
    else if(currentStyle == "moon")
        return 'snow';
    else if(currentStyle == "granite")
        return 'yellow';
    else if(currentStyle == "mint")
        return 'granite';
}

function getMarker(style, poster = false){
    if(!poster){
        if(style == "snow")
            return 'https://www.placethemoment.com/dev/build/images/ptm-marker-snow.svg';
        else if(style == "granite")
            return 'https://www.placethemoment.com/dev/build/images/ptm-marker-granite.svg';
        else if(style == "yellow")
            return 'https://www.placethemoment.com/dev/build/images/ptm-marker-yellow.svg';
        else if(style == "mint")
            return 'https://www.placethemoment.com/dev/build/images/ptm-marker-mint.svg';
    } else {
        if(style == "snow")
            return 'https://www.placethemoment.com/dev/build/images/ptm-marker-mint.svg';
        else if(style == "granite")
                return 'https://www.placethemoment.com/dev/build/images/ptm-marker-yellow.svg';
        else if(style == "moon")
            return 'https://www.placethemoment.com/dev/build/images/ptm-marker-snow.svg';
        else if(style == "mint")
            return 'https://www.placethemoment.com/dev/build/images/ptm-marker-granite.svg';
    }
}

function KeyPress(e) {
    var evtobj = window.event? event : e
    if (evtobj.keyCode == 112 && evtobj.ctrlKey){

        debugPanel.toggleClass('d-block');

    };
}

document.onkeydown = KeyPress;

// $(document).keyup(function(e){

//     if(e.keyCode == 49){       
//         map.setStyle(maptilerWhite);
//     } else if(e.keyCode == 50){
//         map.setStyle(maptilerBlack);
//     }
// //});
//     else if(e.keyCode == 17 && e.keyCode == 112){

//         debugPanel.addClass('d-block');
//          /*
//          var mapCanvas = map.getCanvas();
       
//         domtoimage.toBlob(mapCanvas)
//         .then(function(blob){
//             window.saveAs(blob, 'ptm-map.png');
//         });
//         */
// /*
//         mapCanvas.toBlob(function(blob){
//             var newImg = document.createElement('img'),
//             url = URL.createObjectURL(blob);

//             newImg.onload = function(){
//                 URL.revokeObjectURL(url);
//             };

//             newImg.src = url;
//             $('#canvasImage').parent('div').append(newImg);
//             //document.body.appendChild(newImg);
//         });
// */
// //if(findGetParameter("debug")){
//     // IMG
    
//     $("#toPNG").click(function(e){
//         var mapCanvas = map.getCanvas();
//         imgData = mapCanvas.toDataURL('image/png',1);
//         $('#canvasImage').attr("src",imgData); 

//         //var mapCanvas = map.getCanvas();
//         //on.mapCanvas.getContext('webgl').finish()
//         //imgData = mapCanvas.toDataURL('image/png',1);
        
//         //console.log('putting data to img...')
//         //var imgData = map.getCanvas().toDataURL('image/jpeg');
//         //$("#canvasImage").parent('div').removeClass('d-none');
//         //$('#canvasImage').attr("src",imgData); 
//         //console.log(imgData);
//     });

// };

// });

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
    ptm_moment.val($(this).val());
});

$("#sublineInput").on("input", function(){    
    $("#posterText .card-text:first").text($(this).val());
    ptm_subline.val($(this).val());
});

$("#taglineInput").on("input", function(){    
    $("#posterText .card-text:last").text($(this).val());
    ptm_tagline.val($(this).val());
});

$("#styleSelector .ptm-btn").click(function ( event ) {
    
    $(this).parent().find("label").each(function(){
        $(this).removeClass('active');
    });
    currentStyle = event.target.id;


    $('.poster').attr('class','card poster '+event.target.id);

    $('#addToCart').attr('action', cartUrl+event.target.id);

    map.removeLayer(activeLayer);
    activeLayer = getStyle(currentStyle);
    map.addLayer(activeLayer);
    
    // let marker = $('#markerSelector').find("label.active").attr('id');
    markerOnMap.setIcon(L.icon({ 
        iconUrl: defaultMarkerStyleUrl,
        iconSize: [24, 32], 
        className: 'marker' 
    }));
    
    // Needs refactoring: update (default) text to marker
    /*
    $(this).parent().find("label").each(function(){
        $(this).find('span.text-muted').removeClass('d-block').addClass('d-none');
            
        if(defaultMarkerStyle() == $(this).attr('id'))
            $(this).find('span.text-muted').addClass('d-block');
    });
    */
    
});



// Marker
//WAT IS DEZE SHIT? (defaultSnowMapStyle)
$('#markerSelector .ptm-btn').click(function ( event ) {

    $(this).parent().find("label").each(function(){        
        $(this).removeClass('active');        
    });

    defaultSnowMapStyle = $(this).attr('id');
    defaultMarkerStyleUrl = getMarker(defaultSnowMapStyle);
    formMarkerStyle.val(defaultSnowMapStyle);
    markerOnMap.setIcon(L.icon({ 
        iconUrl: defaultMarkerStyleUrl,
        iconSize: [24, 32],
        className: 'marker'
    }));
        
});


document.getElementById("addToCart").addEventListener("click", function(event){
    event.preventDefault();

    $('.ptm-cta').attr('disabled', true);
    let check = false;

    // $('#posterCanvas').attr('style','');
    // html2canvas(document.getElementById("posterCanvas"))
    //     .then(canvas => {
    //         $('#canvasImage').parent('div').append(canvas);  //.appendChild(canvas)
    //             //      console.log(canvas.toDataURL('image/png',1));
    //         //  })
    //     })
    
    leafletImage(map, function(err, canvas) {
        let dataURL = canvas.toDataURL('image/png');
        // console.log(dataURL);
        dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        // ptm_thumb.val(dataURL);
        $.post("https://www.placethemoment.com/dev/build/save.php", { savedMap: dataURL }, 
        function(data) {
            ptm_thumb.val(data);
        })
        .done(function(){
            $('#addToCart').submit();
        });
        
    });

});