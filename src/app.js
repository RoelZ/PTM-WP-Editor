import 'bootstrap';
import $ from 'jquery';
require('webpack-jquery-ui/resizable');
//import mapboxgl from 'mapbox-gl';
//import jsPDF from 'jspdf';
//import domtoimage from 'dom-to-image';
import './assets/scss/app.scss';
//import Base64 from './assets/js/base64.js';
//import svgCanvas from './assets/js/svgcanvas.js';


import mapboxBlackStyle from './assets/styles/style.json';
import mapboxWhiteStyle from './assets/styles/mapbox-white/style.json';
//import mapputnikStyle from './assets/styles/maputnik.json';

var maptilerBlack = 'https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/PTM-Blacklines/style.json?key=T8rAFKMk9t6uFsXlx0KS';
var maptilerWhite = 'https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/PTM-Whitelines/style.json?key=T8rAFKMk9t6uFsXlx0KS';

var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
//var urlExists = require('url-exists');

var varId;  // WooCommerce ID
var cartUrl = 'http://www.placethemoment.com/dev/collectie/city-map-poster/?attribute_pa_dimensions=50x70&attribute_design=';
//var styleUrl = 'https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/PTM-Blacklines/style.json?key=T8rAFKMk9t6uFsXlx0KS';
//var styleUrl = 'http://localhost:8080/styles/ptm-white-lines-final/style.json';
//var styleUrl = 'http://placethemoment.com/dev/ptm-editor/assets/styles/style.json';
//var styleUrl = "mapbox://styles/roelz/cjbp002fe6an22smmpzfotnk4";
var styleUrl = mapboxBlackStyle;


var currentStyle = "snow";
var currentMarkerStyle = "mint";
var imgData = "";
let isMobile = false;

/* INITIAL BREAKPOINTS CHECK */
$(document).ready(function() {
    checkSize();    
    $(window).resize(checkSize);   
    
    // Needs realtime isMobile check!
    if(isMobile){
        $('main').on('click', function(){
            $('.collapse').collapse('hide');
        });
        $('#posterText').on('click', function(){
            $('#collapseTwo').collapse('toggle');
        });
        $('#collapseTwo').on('show.bs.collapse', function(){
            $('#posterWrapper').css('transform', 'translateY(-70%)');

        });        
        $('#collapseTwo').on('hide.bs.collapse', function(){
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


        
        let addToCart = $('#addToCart');
        addToCart.appendTo('#btnGroup');
        // addToCart.children('')

        $('nav.navbar').removeClass('d-flex').addClass('d-none');
        
    }
});

function checkSize(){
    if ($(".sidebar-sticky").css('position') != 'sticky'){
        isMobile = true;

        //$('#collapseOne').addClass('show'); 
        // $('#accordion .btn-group button[data-target="#collapseOne"]').trigger("click");
    }        
    else if(!$('#collapseOne').hasClass('show'))
        $('#collapseOne').addClass('show');
}


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

console.log(checkUrlExists(styleUrl));

urlExists(styleUrl, function(err, exists){
    if(!exists)
        styleUrl = 'mapbox://styles/mapbox/basic-v9'; ///styles/roelz/cjbp002fe6an22smmpzfotnk4?optimize=true
});
*/
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9lbHoiLCJhIjoiY2phczkwc25mNXJieTJxbnduYTNtaDNneiJ9.7eTxRRsp0GbqkZOJMxRw8g';

var debugPanel = document.getElementById('debugger');

const map = new mapboxgl.Map({
    container: 'mapbox',
    style: styleUrl,
    center: [5.4546,51.4553],
    zoom: 10,
    hash: true,
});

var canvas = map.getCanvasContainer();

var geojson = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [0, 0]
        }
    }]
};

const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
});

//map.addControl(geocoder);
$('#geocoder').append(geocoder.onAdd(map));

//mapCanvas.width = 600;
//mapCanvas.height = 600;

// Adding source layer after map is loaded
map.on('load', function(){   

    // laden van een default marker
    //addMarker();

    // map.on('mousedown', 'point', function(e) {

    //     // Prevent the default map drag behavior.
    //     e.preventDefault();

    //     canvas.style.cursor = 'grab';
    //     console.log(map.getSource('ptm-marker'));

    //     map.on('mousemove', onMove);
    //     map.once('mouseup', onUp);
    // });

    // map.on('touchstart', 'point', function(e) {
    //     if (e.points.length !== 1) return;

    //     // Prevent the default map drag behavior.
    //     e.preventDefault();

    //     map.on('touchmove', onMove);
    //     map.once('touchend', onUp);
    // });

    debugPanel.style.display = 'none';
    debugPanel.innerHTML = 'Longitude: ' + map.getBounds();
    var mapCanvas = map.getCanvas();

    if(!isMobile){
    //BLOB
    
    //function({
        /*
    mapCanvas.toBlob(function(blob){
        var newImg = document.createElement('img'),
        url = URL.createObjectURL(blob);

        newImg.onload = function(){
            URL.revokeObjectURL(url);
        };

        newImg.src = url;
        $('#canvasImage').parent('div').append(newImg);
        //document.body.appendChild(newImg);
    });
    */

    // PNG
        
   imgData = mapCanvas.toDataURL('image/png',1);
   $('#canvasImage').attr("src",imgData);  

   /*
   domtoimage.toBlob(mapCanvas)
   .then(function(blob){
    window.saveAs(blob, 'ptm-map.png');
   });
    */

    // SVG
    //mapCanvas.toBlob(function(blob){
/*
    var svgString = new XMLSerializer().serializeToString(mapCanvas);
    var svg = new Blob([svgString], { type: "image/svg+xml;charset=utf-8"});
    var svgurl = URL.createObjectURL(svg);
    
    var newImg = document.createElement('img');
    newImg.onload = function(){
        URL.revokeObjectURL(svgurl);
    };

    newImg.src = svgurl;
    $('#canvasImage').parent('div').append(newImg);
*/
    //});
    //var svg = $('#mapbox .mapbox-canvas').html();
    //console.log(imgData);  
    
    //var ctx = new SVGCanvas("mapboxgl-canvas");
    //$('#canvasImage').parent().html(ctx.toDataURL("image/svg+xml"));
    //var xml = '<?xml version="1.0" encoding="utf-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd"><svg xmlns="http://www.w3.org/2000/svg" width="' + 600 + '" height="' + 600 + '" xmlns:xlink="http://www.w3.org/1999/xlink"><source><![CDATA[' + imgData + ']]></source>' + svg + '</svg>';
    //var b64 = Base64.encode(svg);
    
    //$('#canvasImage').append("<a href-lang='image/svg+xml' href='data:image/svg+xml;base64,\n"+b64+"'>download</a>");
    
    //PDF
    /*
    var doc = new jsPDF();

    if(currentStyle == "granite"){
        doc.setFillColor("44","34","22","77");  //44 34 22 77
    } else if(currentStyle == "mint"){
        doc.setFillColor("54","8","47","14");  //54 8 47 14
    } else {
        doc.setFillColor(44,34,22,77);  //44 34 22 77
    }

    doc.roundedRect(5,7,200,200,100,100);

    doc.setFontSize("56");
    //doc.setFont("Open Sans");
    doc.setTextColor("255");
    if($('#momentInput').val())
        var docText = $('#momentInput').val();
    else
        var docText = "Place the moment";
    doc.text(docText,"50","220");

    doc.addImage(imgData, 'png', 5, 7, 200, 200, '', 'slow');
    doc.save('ptm-print.pdf');
)}
    */
}

    //console.log('Line 52: '+map.getCenter());
    $('#addToCart input[name="design_id"]').val(token());
    $('#addToCart input[name="coordinates"]').val(map.getCenter().lat+','+map.getCenter().lng+','+map.getZoom());
    
    // empty on load
    $('#addToCart input[name="ptm_moment"]').val();
    $('#addToCart input[name="ptm_subline"]').val();
    $('#addToCart input[name="ptm_tagline"]').val();
    
    // Bij GET values (mc,s,m), locatie, stijl en marker tonen
    if(findGetParameter("mc")){

        var markerCoordinates = getCoordinates(findGetParameter("mc"));
        //var locationMarker = [{"type":"FeatureCollection","features":[{"type":"Feature", "geomerty": { "type": "Point", "coordinates": [5.463783, 51.443383] }}]}];
        var locationMarker = {type: 'FeatureCollection',
        features: [{
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: markerCoordinates
        }
        }]};
        
        console.log('line 75: '+markerCoordinates);
        
        switch(findGetParameter('s')){
            case "moon":
                currentStyle = "moon";
                break;
            case "granite":
                currentStyle = "granite";
                break;
            case "mint":    
                currentStyle = "mint";
                break;
            default:
                currentStyle = "snow";
        }
        
        switch(findGetParameter('m')){    
            case "granite":
                currentMarkerStyle = "granite";
                break;
            case "yellow":    
                currentMarkerStyle = "yellow";
                break;
            default:
                currentMarkerStyle = "mint";
        }
        console.log('s: '+findGetParameter('s')+', m: '+findGetParameter('m'));
        setStyle(currentStyle,currentMarkerStyle);

        locationMarker.features.forEach(function(marker){
            var el = document.createElement('div');
            //el.id = 'marker';
            el.className = 'marker ' + currentMarkerStyle;

            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);
        });
    }
    
    // Wachten op een geocoder.input event
    geocoder.on('result', function(ev){
        
        console.log(ev.result);

        //addMarker(ev.result.geometry.coordinates);
        let markerElement = document.createElement('div');
        markerElement.className = 'marker';
        
        let markert = new mapboxgl.Marker({ element: markerElement, draggable: true})
            .setLngLat(ev.result.geometry.coordinates)
            .addTo(map);

        markert.on('dragStart', function(){
            console.log('drag');
        });
        //doelenstraat 22, eindhoven
        //map.getSource('single-point').setData(locationMarker);
        
        // Adding marker coordinates to form
        //$('#addToCart input[name="marker_coordinates"]').val(locationMarker.coordinates[0]+','+locationMarker.coordinates[1]+','+map.getZoom());

        // Adding address on poster
        var locationCity = ev.result.context[1].text;
        var locationCountry = ev.result.context[3].text;
        var locationAddress = ev.result.text+" "+ev.result.address;

        $('#sublineInput').val(locationCity+" - "+locationCountry);
        $('#addToCart input[name="ptm_subline"]').val(locationCity+" - "+locationCountry);
        $('#taglineInput').val(locationAddress);
        $('#addToCart input[name="ptm_tagline"]').val(locationAddress);

        $("#posterText .card-text:first").html(locationCity+" - "+locationCountry);
        $("#posterText .card-text:last").html(locationAddress);

        /*
        map.on('moveend', function(e){
            $('#addToCart input[name="marker_coordinates"]').val(ev.result.geometry.coordinates+','+Math.round(map.getZoom() * 10) / 10);
        });
        */

    }); // end geocode search
    
    

});  // end Map onLoad

// Draggable markers
function onMove(e) {
    var coords = e.lngLat;
    canvas.style.cursor = 'pointer';

    //console.log(geojson);    
    // Update the Point feature in `geojson` coordinates
    // and call setData to the source layer `point` on it.  
    geojson.features[0].geometry.coordinates = [coords.lng, coords.lat];
    map.getSource('ptm-marker').setData(geojson);
}
function onUp(e) {
    var coords = e.lngLat;
    
    $('#addToCart input[name="marker_coordinates"]').val(coords.lat + ','+ coords.lng);
    // Print the coordinates of where the point had
    // finished being dragged to on the map.
    debugPanel.style.display = 'block';
    debugPanel.innerHTML = 'Longitude: ' + coords.lng + '<br />Latitude: ' + coords.lat;
    canvas.style.cursor = '';

    // Unbind mouse/touch events
    map.off('mousemove', onMove);
    map.off('touchmove', onMove);
}

/*
map.on('dragend', function(e){
    $('#addToCart input[name="marker_coordinates"]').val(map.getCenter().lat+','+map.getCenter().lng+','+map.getZoom());
});
map.on('moveend', function(e){
    $('#addToCart input[name="marker_coordinates"]').val(map.getCenter().lat+','+map.getCenter().lng+','+map.getZoom());
});
*/

var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
    return rand() + rand() // extra rand() to make it longer
};

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

function addMarker(data){   

    geojson.features[0].geometry.coordinates = data;
    
    map.addSource('ptm-marker', {
        "type": "geojson",
        "data": geojson
    });

    map.addLayer({
        "id": "point",
        "source": "ptm-marker",
        "type": "circle",
        "paint": {
            "circle-radius": 10,
            "circle-color": getMarkerStyle()
        }
    });    

    // Onderstaand waarschijnlijk creert NOG een element boven op de locatie van Point
    geojson.features.forEach(function(marker){
        var el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
    });

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
        varId = 1207
        return maptilerBlack; //'http://localhost:8080/styles/ptm-black-lines-final/style.json'; 
    }
    else if(name == 'moon'){
        varId = 1208
        return maptilerWhite; //'http://localhost:8080/styles/ptm-white-lines-final/style.json'; 
    }
    else if(name == 'granite'){
        varId = 1209
        return maptilerWhite; //'http://localhost:8080/styles/ptm-white-lines-final/style.json'; 
    }
    else if(name == 'mint'){
        varId = 1210
        return maptilerWhite; //'http://localhost:8080/styles/ptm-white-lines-final/style.json'; 
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

$(document).keyup(function(e){

    if(e.keyCode == 49){       
        map.setStyle(maptilerWhite);
    } else if(e.keyCode == 50){
        map.setStyle(maptilerBlack);
    }
//});
    else if(e.keyCode == 27){
         /*
         var mapCanvas = map.getCanvas();
       
        domtoimage.toBlob(mapCanvas)
        .then(function(blob){
            window.saveAs(blob, 'ptm-map.png');
        });
        */
/*
        mapCanvas.toBlob(function(blob){
            var newImg = document.createElement('img'),
            url = URL.createObjectURL(blob);

            newImg.onload = function(){
                URL.revokeObjectURL(url);
            };

            newImg.src = url;
            $('#canvasImage').parent('div').append(newImg);
            //document.body.appendChild(newImg);
        });
*/
//if(findGetParameter("debug")){
    // IMG
    
    $("#toPNG").click(function(e){
        var mapCanvas = map.getCanvas();
        imgData = mapCanvas.toDataURL('image/png',1);
        $('#canvasImage').attr("src",imgData); 

        //var mapCanvas = map.getCanvas();
        //on.mapCanvas.getContext('webgl').finish()
        //imgData = mapCanvas.toDataURL('image/png',1);
        
        //console.log('putting data to img...')
        //var imgData = map.getCanvas().toDataURL('image/jpeg');
        //$("#canvasImage").parent('div').removeClass('d-none');
        //$('#canvasImage').attr("src",imgData); 
        //console.log(imgData);
    });
    // PDF
    $("#toPDF").parent('nav').removeClass('d-none');
    $("#canvasImage").parent('div').removeClass('d-none');
    $("#toPDF").click(function(e){
        var imgData = map.getCanvas().toDataURL();

        var doc = new jsPDF();

        /*
        if(currentStyle == "granite"){
            doc.setFillColor("44","34","22","77");  //44 34 22 77
        } else if(currentStyle == "mint"){
            doc.setFillColor("54","8","47","14");  //54 8 47 14
        }
        doc.setFontSize("56");
        //doc.setFont("Open Sans");
        //doc.setTextColor("255");
        if($('#momentInput').val())
            var docText = $('#momentInput').val();
        else
            var docText = "Place the moment";
        doc.text(docText,"50","555");
        */
        doc.addImage(imgData, 'PNG', 52, 73, 400, 400);
        doc.save('ptm-print.pdf');
    });

};

});

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

$("#sublineInput").on("input", function(){    
    $("#posterText .card-text:first").text($(this).val());
    $('#addToCart input[name="ptm_subline"]').val($(this).val());
});

$("#taglineInput").on("input", function(){    
    $("#posterText .card-text:last").text($(this).val());
    $('#addToCart input[name="ptm_tagline"]').val($(this).val());
});

// Styling UI
function setStyle(style, marker = ''){
    // UI checked
    if(style){
        $('#styleSelector').find("label").each(function(){
             if($(this).attr("id") == style){
                $(this).addClass('active');
                $(this).children('input').attr("checked", true);                 
             }
             else {
                $(this).removeClass('active');
                $(this).children('input').attr("checked", false);                 
             }
        })       
     } 
    // GET
    // POST
    // Poster
    $('.poster').attr('class','card poster '+style);

    // Marker
    if(marker){
        
        $('#markerSelector').find("label").each(function(){
            if($(this).attr("id") == marker){
                $(this).addClass('active');
                $(this).children('input').attr("checked", true);
            }
            else {
                $(this).removeClass('active');
                $(this).children('input').attr("checked", false);
            }                
       })       
    }
}


$("#styleSelector .btn").click(function ( event ) {
    
    currentStyle = toString(event.target.id);
    console.log(event.target.id+': '+getStyle(event.target.id));

    //map.setStyle(getStyle(event.target.id));
    //$('.card').removeClass('snow', 'moon', 'granite', '')
    $('.poster').attr('class','card poster '+event.target.id);

    $('#addToCart').attr('action', cartUrl+event.target.id);

    var styleUrl = getStyle(event.target.id);        
    map.setStyle(styleUrl);

    /*
    map.on('load', function(){
    //if(map.isStyleLoaded){
        addMarker();
        console.log(map.getSource('single-point'));
        map.getSource('single-point').setData(locationMarker);
    });
    */
    $('#addToCart input[name="variation_id"]').val(varId);
    //map.setStyle('mapbox://styles/mapbox/basic-v9');
    //event.preventDefault();
});

