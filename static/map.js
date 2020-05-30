// var locations = [[1, 54.6854, 25.2865, 'Audrone', 'Cathedral squere'],[2, 54.6932233, 25.2747147, 'Audrone', 'Baltasis tiltas skatepark']]



var icon = {};
var map;
var marker;
var spotname;
var spotdescription;
var fotourl;
var infowindow;
var markers = {};
var spotlist = document.getElementById('places');
var yellow_icon =  'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png' ;
var purple_icon =  'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' ;
var updateButton = document.getElementById('updateDetails');
var favDialog = document.getElementById('favDialog');
var outputBox = document.querySelector('output');
var selectEl = document.querySelector('select');
var confirmBtn = document.getElementById('confirmBtn');
var lat;
var lng;
var markerId;


var getLatLng = function(lat, lng) {
    return new google.maps.LatLng(lat, lng);
};

var getMarkerUniqueId= function(lat, lng) {
    return lat + '_' + lng;
};

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#spot-photo')
                .attr('src', e.target.result)
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function initMap() {
    var vilnius = {lat:54.6872, lng: 25.2797};
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), {
        center: vilnius,
        zoom: 14
    });
    
    iconskate = {
        url: "/static/skate-icon.svg",
        scaledSize: new google.maps.Size(50,50)
    }
    iconskategrey = {
        url: "/static/skate-icon-grey.svg",
        scaledSize: new google.maps.Size(50,50)
    }
    // var addMarker = google.maps.event.addListener(map, 'click', function(e) {
    //     favDialog.showModal();
    //     lat = e.latLng.lat(); // lat of clicked point
    //     lng = e.latLng.lng(); // lng of clicked point
    //     markerId = getMarkerUniqueId(lat, lng);
    // });
   
    loadMarkers()
    
    // document.getElementById("confirmBtn").addEventListener("click", function(){
    //     spotname = document.querySelector("#spot-name").value;
    //     spotdescription = document.querySelector("#spot-description").value;
    //     var loc = [locations.length+1, lat, lng, "Audrone","skateboarding", markerId, spotname, spotdescription, fotourl]
    //     locations.push(loc)
       
    //     displayNew(locations);
    //     document.querySelector("#spot-name").value="";   
    // });

  
    favDialog.addEventListener('close', function onClose() {
        console.log("cancel");
    });


    // function displayNew(locations) {
    //     var markerId = getMarkerUniqueId(lat, lng);
    //     var x = lat;
    //     var y = lng; 
    //     var url = '?' + 'lat=' + lat + '&' + 'lng=' + lng + '&' + "markerId=" + markerId + '&' + "spotname=" + spotname+ '&' + "spotdescription=" + spotdescription;
    //     downloadUrl(url)
    //     for (var i = locations.length-1; i < locations.length; i++) {
    //         marker = new google.maps.Marker({
    //             position: new google.maps.LatLng(locations[i][1], locations[i][2]),
    //             map: map,
    //             icon : iconskate,
    //             html: document.getElementById('loc-info'),
    //             content: locations[i][4],
    //         });
    //         const li = document.createElement('li'); 
    //         li.innerHTML = locations[i][4];
    //         const list = document.querySelector('#placeslist')
    //         li.classList.add("place-el")
    //         li.setAttribute("id", locations[i][5]);
    //         spotlist.append(li); 
    //         markers[markerId] = marker;
    //         addinfo(marker);
    //         deleteinfo(marker);
            
    //     }
    //     function addinfo(marker) {
    //         google.maps.event.addListener(marker, "click", function (point) {
    //             var name;
    //             for (var i = 0; i < locations.length; i++) {
    //                 if (locations[i][1] == x  && locations[i][2] == y ){
    //                     name = locations[i][4]
    //                     document.querySelector('#loc-name').innerHTML = locations[i][4]
    //                     //$("#loc-info").show();
    //                 }

    //             }            
    //             console.log(name)
    //             var markerId = getMarkerUniqueId(point.latLng.lat(), point.latLng.lng()); // get marker id by using clicked point's coordinate
    //             var marker = markers[markerId]; // find marker
    //             console.log(marker)
    //             infowindow = new google.maps.InfoWindow();
    //             infowindow.setContent("<p>"+name+"</p>");
    //             infowindow.open(map, marker);
    //             // removeMarker(marker, markerId); // remove it
    //         }); 
    //     }

    

    //     function deleteinfo(marker) {
    //         google.maps.event.addListener(marker, "rightclick", function (point) {
    //             var latx = point.latLng.lat()  
    //             var lngy = point.latLng.lng()
    //             console.log(latx)
    //             console.log(lngy)
    //             var markerId = getMarkerUniqueId(latx, lngy); // get marker id by using clicked point's coordinate
    //             var marker = markers[markerId]; // find marker
    //             removeMarker(marker, markerId, latx, lngy); // remove it
    //         });
        
    //         function removeMarker(marker, markerId, latx, lngy) {
    //         var places = document.getElementById("ul");
    //         var listItem = document.querySelectorAll(".place-el");   
    //         console.log(listItem)
    //             for (var i = 0; i < locations.length; i++) {
    //                 if (locations[i][1] == latx  && locations[i][2] == lngy ) {  
    //                     for (var n = 0; n < listItem.length; n++) {
    //                         console.log(n, listItem[n]);
    //                         if(listItem[n].id == locations[i][5]) {
    //                             listItem[n].remove();
    //                         }
    //                     }                 
    //                     locations.splice(i, 1);
    //                 }
                  
    //             }
    //             console.log(locations)                
    //             marker.setMap(null); // set markers setMap to null to remove it from map
    //             delete markers[markerId]; // delete marker instance from markers object
    //         };
    //     }

    //     function downloadUrl(url) {
    //         var request = window.ActiveXObject ?
    //             new ActiveXObject('Microsoft.XMLHTTP') :
    //             new XMLHttpRequest;

    //         // request.onreadystatechange = function() {
    //         //     if (request.readyState == 4) {
    //         //         callback(request.responseText, request.status);
    //         //     }
    //         // };

    //         request.open('GET', url, true);
    //         request.send(null);
    //     }
    // } 
} 