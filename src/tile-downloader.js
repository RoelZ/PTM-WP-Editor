import $ from 'jquery';
import L from 'leaflet';
// import './assets/scss/app.scss';

// var map = L.map('map').setView([0, 0], 6);
// L.tileLayer('https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/PTM-Blacklines/{z}/{x}/{y}@2x.png?key=T8rAFKMk9t6uFsXlx0KS', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     tileSize: 512
//     // zoomOffset: -2
// }).addTo(map);

// var ptmIcon = L.icon({
//     iconUrl: 'https://www.placethemoment.com/wp-content/uploads/2017/11/ptm-marker-dark.png',
//     shadowUrl: ''
// });

// var marker = L.marker([51.441767, 5.470247],{
//     draggable: true,
//     icon: ptmIcon
//   }).addTo(map);
  

//   marker.on('dragend', function (e) {
//       console.log('hoi: ' + e);
//   });

// 32, 64, 96

let startX = 0; //32
let startY = 34; // 
let steps = 16;
let downloadAction;
let downloads = 0;
let flex = document.getElementById('flex');

$('#image').attr('src','https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/PTM-Whitelines/6/'+startX+'/'+startY+'@2x.png?key=T8rAFKMk9t6uFsXlx0KS');

function showRow (startX, startY) {

    let maxX = startX + steps;

    for (let i = startX; i < maxX; i++) { 

        let dl = document.createElement('a');
        let img = document.createElement('img');

        var origin = "https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/PTM-Whitelines/6/"+i+"/"+startY+"@2x.png?key=T8rAFKMk9t6uFsXlx0KS";

        var oReq = new XMLHttpRequest();
        oReq.open("GET", origin);
        oReq.responseType = "arraybuffer";

        oReq.onload = function(oEvent){
            console.log('image loaded..');
            var arrayBufferView = new Uint8Array( this.response );
            var blob = new Blob([arrayBufferView], { type: 'image/png' });
            var url = URL.createObjectURL(blob);
            dl.href = url;
        }    
        oReq.send();
        
        dl.download = i+''+startY+'.png';

        img.src = 'https://maps.tilehosting.com/c/44c99296-dff6-484b-9ce9-f9f9ab795632/styles/PTM-Whitelines/6/'+i+'/'+startY+'@2x.png?key=T8rAFKMk9t6uFsXlx0KS';
        
        dl.appendChild(img);
        flex.appendChild(dl);

        downloads++;
        downloadAction = setInterval(function(){ autoDownload(dl); }, 1500);
    }    

    console.log(startX,startY);
}
function autoDownload(button){    

    if(downloads < steps){
        button.click();
    } else {
        downloads = 0;
        clearInterval(downloadAction);
    }
        

    // var $arr = $.makeArray("a");
    // for(var i = 0; i < $arr.length; i++){        
    // $("a").each(function( index ) {
    //     console.log($(this));
    //     setInterval(function(){ $(this).css('background-color', 'red'); }, 500);
    // });

}

showRow(startX, startY);


$('#next').on('click', function(){   
    startX = startX+steps;

    if(startX > 48){
        $('#flex').empty();
        startX = 0;
        startY++;
    }
    showRow(startX, startY);
});