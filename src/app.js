import 'bootstrap';
require('webpack-jquery-ui/resizable');
import './assets/js/Control.Loading';

import './assets/scss/app.scss';
import 'd3-celestial';

let productId = $('#addToCart input[name="product_id"]').val();
let isMobile = false;

// Hidden Form values
let addToCart = $('#addToCart');
let cartUrl = addToCart.attr('action');
let formCoordinates = $('#addToCart input[name="coordinates"]');
let formPlaceId = $('#addToCart input[name="placeid"]');
let formLocation = $('#addToCart input[name="location"]');
let formDateTime = $('#addToCart input[name="datetime"]');
let formVariationId = $('#addToCart input[name="variation_id"]');
let formPrice = $('.pricetag');

let ptm_moment = $('#addToCart input[name="ptm_moment"]');
let ptm_subline = $('#addToCart input[name="ptm_subline"]');
let ptm_tagline = $('#addToCart input[name="ptm_tagline"]');
let ptm_thumb = $('#addToCart input[name="ptm_thumb"]');

const activeFormatSelector = document.querySelector('#formatSelector').dataset.format;
const activeStyleSelector = document.querySelector('#styleSelector').dataset.style;

const params = new URLSearchParams(window.location.search)
const draft = params.has('draft');

let defaultStartView = defaultView(draft);

let currentPrice = 49;
let currentFormat = params.has('attribute_pa_dimensions') ? params.get('attribute_pa_dimensions') : activeFormatSelector;   // returns 30x40cm,etc
let currentStyle = params.has('attribute_design') ? params.get('attribute_design') : activeStyleSelector;     // returns moon,etc
let currentLatLng = draft ? formLocation.val().split(',') : [defaultStartView.ne.lat, defaultStartView.ne.lng]
let currentDateTime = draft ? formDateTime.val() : Date.now();

addCartParameters(currentStyle, currentFormat);

if(!draft){
  formLocation.val(currentLatLng);
  ptm_moment.val(defaultStartView.moment);
  $('#momentInput').val(defaultStartView.moment);
  $("#posterText .card-title").html(defaultStartView.moment);
  ptm_subline.val(defaultStartView.subline);
  $('#sublineInput').val(defaultStartView.subline);
  $("#posterText .card-text:first").html(defaultStartView.subline);
  ptm_tagline.val(defaultStartView.tagline);
  $('#taglineInput').val(defaultStartView.tagline);
  $("#posterText .card-text:last").html(defaultStartView.tagline);
} else {
  $("#posterText .card-title").html($('#momentInput').val());
  $("#posterText .card-text:first").html($('#sublineInput').val());
  $("#posterText .card-text:last").html($('#taglineInput').val());
}


const starposter = { width: 466 }  // 446, 2910, 4749

const config = {
  width: starposter.width,  
  container: "celestial-map",
  projection: "airy",   // airy, azimuthal, berghaus star, orthographic, wiechel, 
  datapath: 'https://ofrohn.github.io/data/',
  interactive: false,
  controls: false,     // Display zoom controls
  form: false,        // Display settings form
  formFields: {
    "location": true,  // Set visiblity for each group of fields with the respective id
    "general": true,  
    "stars": true,  
    "dsos": false,  
    "constellations": true,  
    "lines": true,  
    "other": false,  
    "download": false
  },
  advanced: false,     // Display fewer form fields if false
  background: {        // Background style
    fill: "#54575c",   // Area fill
    opacity: 1, 
    stroke: "#ffffff", // Outline
    width: 1
  }, 
  stars: {
    show: true,    // Show stars
    limit: 6,      // Show only stars brighter than limit magnitude
    size: 7,
    colors: false,  // Show stars in spectral colors, if not use "color"
    names: false, 
    designation: false,
  },
  planets: { 
    show: true,
    which: ["lun"],
    symbols: {
      // "sol": {symbol: "\u2609", letter:"Su", fill: lines, size:"6"},
      "lun": {symbol: "\u25cf", letter:"L", fill: "#000000", size:"40"},
    },
    symbolType: "symbol",
    names: false,
  },
  constellations: {
    names: false,  // Show constellation names
    lines: true,
    lineStyle: { stroke: '#ffffff', width: 0.8, opacity:1 },
  },
  mw: {
    show: true,  
    style: { fill:"#6B6F76", opacity:"0.4" }
  },
  dsos: { show: false, names: false, desig: false },
  lines: {
    graticule: { show: false },
    equatorial: { show: false },
    ecliptic: { show: false },
    galactic: { show: false },
    supergalactic: { show: false }
  }
}

Celestial.display(getCelestialPoster())
Celestial.date(new Date(currentDateTime));
Celestial.location(currentLatLng);

let input = document.createElement("input");
    input.id = "searchBox";
let buttonUI = $('<span class="input-group-prepend"><button type="button" class="btn btn-outline-light border-left-0 border"><i class="fa fa-search"></i></button></span>');

const geocoderInput = $('#geocoder');

geocoderInput.append(input);
geocoderInput.append(buttonUI);

$(input).addClass('form-control py-2 border-right-0 border')
.attr('placeholder','Enter your place');
input.focus();

input.addEventListener('keypress', function(e){
  getMapData(e);
});
buttonUI.on("click", "button", function(e){
  getMapData(e);
});



/* INITIAL BREAKPOINTS CHECK */
$(document).ready(function() {
    checkSize();

    // hard fix for initialising Celestial for iPhone iOS < 15.0
    document.querySelector('#celestial-map > canvas').style = "width: 466px; height: 466px;";

    $(window).resize(checkSize);   

    // Needs realtime isMobile check!
    if(isMobile){

        if(!$('#collapseOne').hasClass('show')){
          $('#collapseOne').addClass('show');
        }
        $('main').on('click', function(){
            $('.collapse').collapse('hide');
        });

        $('#collapseTwo').on('show.bs.collapse', function(){
            // $('#collapseThree').collapse('hide');
            $('#posterWrapper').css('transform', 'translateY(-30vh)');
        });
        $('#collapseTwo').on('hide.bs.collapse', function(){
            $('#posterWrapper').css('transform','');
        });        
        $('#collapseThree').on('show.bs.collapse', function(){
            // $('#collapseTwo').collapse('hide');
            // $('#posterWrapper').css('transform', 'translateY(-30%)');
            $('#posterWrapper').css('transform', 'scale(.9)');
            
        });
        $('#collapseThree').on('hide.bs.collapse', function(){
            $('#posterWrapper').css('transform','');
        });

        $('#accordion .btn-group button.btn-ptmLight').on('click', function(){
            $('#accordion .btn-group.btn-block button').removeClass('active');
        });

        $('.collapse').on('show.bs.collapse', function (){
            $('button[data-target="#'+$(this).attr('id')+'"]').addClass('active');
        });
        $('.collapse').on('hide.bs.collapse', function (){
            $('button[data-target="#'+$(this).attr('id')+'"]').removeClass('active');
        });        

        $('nav.navbar').removeClass('d-flex').addClass('d-none');
        
    }
    
});

function checkSize(){
  // if ($(".sidebar-sticky").css('position') != 'sticky'){
  if ($("#accordion > div").css('display') == 'none'){
      isMobile = true;
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

$(window).on('resize', function() {
    starterData = { 
        size: {
            width: $wrapper.width(),
            height: $wrapper.height()
        }
    }
    doResize(null, starterData);
});

let $debugPanel = $('#debugger');


function getMapData(e){
  let key,txtInput;

  if(e.type === 'keypress')
    key = e.which || e.keyCode;
  else if(e.type === 'click')
    key = 13;

  if (key === 13) {    
    txtInput = encodeURI($(input).val().toString());

    $.getJSON(process.env.WP_URL+'/api/v2/json.php?input='+txtInput, function(data){
      if(data.candidates.length){
      
        let place = data.candidates[0];
        let address = place.formatted_address.split(', ');
        let locationCity, locationCountry, locationName;
        let tagline;

        currentLatLng = [place.geometry.location.lat, place.geometry.location.lng]

        formPlaceId.val(place.place_id);
        locationName = place.name;
        locationCountry = address[address.length-1];
        locationCity = (address.length > 2) ? address[1].replace(/\d+? [A-Z][A-Z]/g, '') : ''; 

        if(locationCity == locationName)
            tagline = locationCountry;
        else if(locationCountry == locationName)
            tagline = locationCity;
        else
            tagline = locationCity ? locationCity+" - "+locationCountry : locationCountry;

        formLocation.val(currentLatLng)
        Celestial.location(currentLatLng)

      };
    });
  };
};

function defaultView(draft){  

  if (draft) return;

  let userCoordinates,
      userMarkerCoordinates,
      userMoment = '', 
      userSubline = '', 
      userTagline = '';

    if(userCoordinates)
    {
      let place = {
        moment: userMoment,
        subline: userSubline,
        tagline: userTagline,
        ne: {
          lat : userCoordinates[0],
          lng : userCoordinates[1]
        },
        sw: {
          lat : userCoordinates[2],
          lng : userCoordinates[3]
        },
        marker: userMarkerCoordinates
      }
      return place;

    } else {

      let places = [
        {
          moment: 'My Moment',
          subline: 'Eindhoven',
          tagline: 'The Netherlands',
          ne: {
            lat : '51.49762961696847',
            lng : '5.539512634277345'
          },
          sw: {
            lat : '51.398777259985444',
            lng : '5.380897521972656'
          },
          zoom : '12.1',
          get marker() { return L.latLngBounds([this.ne.lat,this.ne.lng],[this.sw.lat,this.sw.lng]).getCenter() }
        },
        {
          moment: 'My Moment',
          subline: 'Utrecht',
          tagline: 'The Netherlands',
          ne: {
            lat : '52.13664902426816',
            lng : '5.193443298339845'
          },
          sw: {
            lat : '52.039187769080115',
            lng : '5.034828186035157'
          },
          zoom : '12.1',
          get marker() { return L.latLngBounds([this.ne.lat,this.ne.lng],[this.sw.lat,this.sw.lng]).getCenter() }
        },
        {
          moment: 'My Moment',
          subline: 'Amsterdam',
          tagline: 'The Netherlands',
          ne: {
            lat : '52.39959100269025',
            lng : '4.939727783203125'
          },
          sw: {
            lat : '52.35117489482139',
            lng : '4.860420227050782'
          },
          zoom : '12.1',
          get marker() { return L.latLngBounds([this.ne.lat,this.ne.lng],[this.sw.lat,this.sw.lng]).getCenter() }
        },
      ]

      let randomItem = Math.floor(Math.random() * places.length);
      return places[randomItem];

    }
}

function addCartParameters(style = 'moon', format = '50x70cm'){
  $('.poster').addClass([style, (format != '50x70cm') ? 'small' : '']);
  $('#addToCart').attr('action', cartUrl+'?attribute_pa_dimensions='+format+'&attribute_design='+style);   
}

function setStyle(name){

    currentPrice = (currentFormat === '30x40cm') ? 49 : 59

    switch(name) {
      case 'moon':
        (productId === '12702' && currentFormat === '30x40cm') ? formVariationId.val(12703) : 
        (productId === '12702' && currentFormat === '50x70cm') ? formVariationId.val(12708) :
        (productId === '12328' && currentFormat === '30x40cm') ? formVariationId.val(12329) :
        (productId === '12328' && currentFormat === '50x70cm') ? formVariationId.val(12334) :
        null
        break;
      case 'granite':
        (productId === '12702' && currentFormat === '30x40cm') ? formVariationId.val(12704) : 
        (productId === '12702' && currentFormat === '50x70cm') ? formVariationId.val(12709) :
        (productId === '12328' && currentFormat === '30x40cm') ? formVariationId.val(12330) :
        (productId === '12328' && currentFormat === '50x70cm') ? formVariationId.val(12335) :
        null
        break;
      case 'olive':
        (productId === '12702' && currentFormat === '30x40cm') ? formVariationId.val(12705) : 
        (productId === '12702' && currentFormat === '50x70cm') ? formVariationId.val(12710) :
        (productId === '12328' && currentFormat === '30x40cm') ? formVariationId.val(12331) :
        (productId === '12328' && currentFormat === '50x70cm') ? formVariationId.val(12336) :
        null
        break;
      case 'hay':
        (productId === '12702' && currentFormat === '30x40cm') ? formVariationId.val(12706) : 
        (productId === '12702' && currentFormat === '50x70cm') ? formVariationId.val(12711) :
        (productId === '12328' && currentFormat === '30x40cm') ? formVariationId.val(12332) :
        (productId === '12328' && currentFormat === '50x70cm') ? formVariationId.val(12337) :
        null
        break;
      case 'redwood':
        (productId === '12702' && currentFormat === '30x40cm') ? formVariationId.val(12707) : 
        (productId === '12702' && currentFormat === '50x70cm') ? formVariationId.val(12712) :
        (productId === '12328' && currentFormat === '30x40cm') ? formVariationId.val(12333) :
        (productId === '12328' && currentFormat === '50x70cm') ? formVariationId.val(12338) :
        null
        break;
      case 'dustyrose':
        (productId === '12702' && currentFormat === '30x40cm') ? formVariationId.val(12723) : 
        (productId === '12702' && currentFormat === '50x70cm') ? formVariationId.val(12724) :
        (productId === '12328' && currentFormat === '30x40cm') ? formVariationId.val(12372) :
        (productId === '12328' && currentFormat === '50x70cm') ? formVariationId.val(12373) :
        null
        break;
    }
    
}

function getCelestialPoster(){
  let lines = "",
      background = "",
      mw = "";

  switch(currentStyle){
    case 'snow':
      lines = "#000"
      background = "#fff",
      mw = "#ffffff"
      break;
    case 'moon':      // 0
    case 'granite':   // '#54575c'  1
      lines = "#fff"
      background = "#54575c",
      mw = "#6B6F76"
      break;
    case 'mint':    // #6fa189'
      lines = "#fff"
      background = "#6fa189",
      mw = "#90B6A4"
      break;
    case 'honey':   // #d8ae46'
      lines = "#000"
      background = "#d8ae46",
      mw = "#DFBD68"
      break;
    case 'hay':   // #d8ae46'     3
      lines = "#000"
      background = "#DCB771",
      mw = "#E7CD9D"
      break;
    case 'olive':   // #d8ae46'   2
      lines = "#fff"
      background = "#92886f",
      mw = "#A79F8B"
      break;
    case 'redwood':   // #d8ae46'   4
      lines = "#fff"
      background = "#a3523e",
      mw = "#BC644E"
      break;
    case 'dustyrose':   // #b08782'   5
      lines = "#fff"
      background = "#b08782",
      mw = "#C09F9B"
      break;
    default:
      lines = "#000"
      background = "#fff"
      mw = "#ffffff"
      break;
  }

  return { 
    ...config,
    width: 466,
    geopos: currentLatLng,
    planets: { names: false, symbols: { "lun": { fill: lines } } },
    mw: { style: { fill: mw } },
    stars: { names: false, colors: false, style: { fill: lines } }, 
    dsos: { names: false, colors: false, style: { fill: lines, stroke: lines } }, 
    constellations: { names:false, lineStyle: { stroke: lines, width: 0.8, opacity:1 } },
    background: { fill: background, stroke: lines },
  }
}

function isIE() {
  var sAgent = window.navigator.userAgent;
  var Idx = sAgent.indexOf("MSIE");

  // If IE, return version number.
  if (Idx > 0) 
    return true;
  //   return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

  // If IE 11 then look for Updated user agent string.
  else if (!!navigator.userAgent.match(/Trident\/7\./)) 
    return true;

  else
    return false; //It is not IE
}

document.addEventListener('keyup', (e) => {
  if (e.key == 'F2'){
      $debugPanel.toggleClass('d-block');
  };
});


$("#placedatetime").on("change", function( event ){
  currentDateTime = event.target.value;
  formDateTime.val(event.target.value)

  Celestial.date(new Date(currentDateTime));
})

let activeTab;

$(".nav-item").on("click", function(e){
    
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

$("#styleSelector .ptm-btn").on("click", function ( event ) {

    $(this).parent().find("button").each(function(){
        $(this).removeClass('active');
    });

    currentStyle = event.target.id;
    setStyle(currentStyle);

    let posterSize = (currentFormat == '30x40cm') ? "small" : '';
    $('.poster').attr('class','card poster '+posterSize+' '+event.target.id);
    $('#addToCart').attr('action', cartUrl+'?attribute_pa_dimensions='+currentFormat+'&attribute_design='+currentStyle);

    Celestial.reload(getCelestialPoster())
    
});

$("#formatSelector .ptm-format-btn").on("click", function ( event ) {

  $(this).parent().find("button").each(function(){
    $(this).removeClass('active');
  });

  currentFormat = event.target.id;
  setStyle(currentStyle);

  let posterSize = (currentFormat == '30x40cm') ? "small" : '';
  $('.poster').attr('class','card poster '+posterSize+' '+currentStyle);
  $('#addToCart').attr('action', cartUrl+'?attribute_pa_dimensions='+currentFormat+'&attribute_design='+currentStyle);

  const priceTags = document.querySelectorAll('.pricetag');
  priceTags.forEach(price => {
    price.innerHTML = `&euro;${currentPrice}`;
  });

});

document.getElementById("addToCart").addEventListener("click", function(event){
    event.preventDefault();

    $('.ptm-cta').attr('disabled', true);
    $('.smooth-transition').css('opacity','0.5');
    $('body').prepend('<div class="generate align-items-center justify-content-center d-flex position-fixed w-100"><progress class="circular-activity" /></div>');    

    if(!isIE()) {
        let canvas = document.querySelector('#celestial-map canvas'),
          dataURL = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, "");
          $.post("https://www.placethemoment.com/build/save.php", { savedMap: dataURL }, 
          function(data) {
            ptm_thumb.val(data);
          })
          .done(function(){
            $('#addToCart').submit();
          });
    } else {
      $('#addToCart').submit();
    }
});