var map;
var marker;
var infowindow;
var spotlist = document.getElementById('places');
var red_icon =  'http://maps.google.com/mapfiles/ms/icons/red-dot.png' ;
var purple_icon =  'http://maps.google.com/mapfiles/ms/icons/purple-dot.png' ; 
function initMap() {
    var vilnius = {lat:54.6872, lng: 25.2797};
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), {
        center: vilnius,
        zoom: 12
    });
    iconskategrey = {
        url: '/static/skate-icon-grey.svg',
        scaledSize: new google.maps.Size(50,50)
    }
    iconskate = {
        url: "/static/skate-icon.svg",
        scaledSize: new google.maps.Size(50,50)
    }
    console.log(locations)
    for (var i = 0; i < locations.length; i++) {
        const li = document.createElement('li'); 
        li.innerHTML = locations[i][6];
        li.classList.add("place-el")
        li.setAttribute("id", locations[i][3]);
        li.setAttribute("data-lat", locations[i][1]);
        li.setAttribute("data-lng", locations[i][2]);
        spotlist.append(li);
    }

    document.querySelectorAll(".place-el")


    // var elements = document.getElementsByClassName("place-el");
    // for (var i = 0; i < elements.length; i++) {
    //     elements[i].addEventListener('click', function(){
    //         console.log(marker.id)
    //         console.log(this.id)
    //         if (this.id == marker.id)
    //         {
    //             console.log(marker.id)
    //         }
    //     });
    // }  

}    
    // var spots = document.querySelectorAll(".place-el");
    // console.log(spots)
    // for (var n = 0; n < spots.length; n++) { 
    //     // console.log(spots)
    //     console.log(spots[n])
        
    // }
    

//     for (var i = 0; i < locations.length; i++) {
//         marker = new google.maps.Marker({
//             position: new google.maps.LatLng(locations[i][1], locations[i][2]),
//             map: map,
//             icon :  iconskategrey,
//             html: document.getElementById('loc-info'),
//             id: locations[i][3],
//             content: locations[i][6],
//             block:"<li class='place-el' id='"+locations[i][3]+"'>"+locations[i][6]+"</li>"
//         });
//         marker.myMarkerIndex = i;

//         createblock(marker)
    
    
//         google.maps.event.addListener(marker, 'click', (function(marker, i) {
//             return function() {
//                 // marker.setIcon(purple_icon);
//                 document.querySelector('#loc-name').innerHTML = locations[i][6]
//                 $("#loc-info").show();
//                 console.log(marker.html)
//                 infowindow.setContent(marker.html);
//                 infowindow.open(map, marker);
//             }
//         })(marker, i)); 
  
//         google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
//             return function() {
//                 marker.setIcon(iconskate);
//                 var spotname =  document.querySelector('#loc-name').innerHTML
//                 spotname = locations[i][6]
//                 $("#loc-info").show();
//                 infowindow.setContent(marker.html);
//                 var listItem = document.querySelectorAll(".place-el");
//                 for (var n = 0; n < listItem.length; n++) { 
//                     if (marker.id == listItem[n].id) {
//                         listItem[n].classList.add("current");
//                     }
                    
//                 }
//             }
//         })(marker, i)); 
    
//         google.maps.event.addListener(marker, 'mouseout', (function(marker, i) {
//             return function() {
//                 marker.setIcon(iconskategrey);
//                 var spotname =  document.querySelector('#loc-name').innerHTML
//                 spotname = locations[i][6]
//                 $("#loc-info").show();
//                 infowindow.setContent(marker.html);
//                 var listItem = document.querySelectorAll(".place-el");
//                 for (var n = 0; n < listItem.length; n++) { 
//                     if (marker.id == listItem[n].id) {
//                         listItem[n].classList.remove("current");
//                     } 
//                 }
//             }
//         })(marker, i));  
       
//     }
 

//     function createblock(marker) {
//         const li = document.createElement('li'); 
//         li.innerHTML = marker.content;
//         li.classList.add("place-el")
//         li.setAttribute("id", marker.id);
//         spotlist.append(li);  
//     }
 


// }