function loadMarkers() {
    var filtered = [];
    var filteredmarkers = [];
    google.maps.event.addListener(map, 'bounds_changed', function() {
        filtered = locations.filter((location)=>{
            return map.getBounds().contains({lat:location[1], lng:location[2]})
        })
        spotlist.innerHTML = "";
        for (var i = 0; i < filteredmarkers.length; i++) {
            filteredmarkers[i].setMap(null);
        }
        for (var i = 0; i < filtered.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(filtered[i][1], filtered[i][2]),
                map: map,
                icon : iconskategrey
            });
            filteredmarkers.push(marker) 
            const li = document.createElement('li'); 
            li.innerHTML = filtered[i][6];
            li.classList.add("place-el")
            li.setAttribute("id", filtered[i][3]);
            spotlist.append(li); 
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent('<div id="loc-info"><p id="loc-name">'+filtered[i][6]+'</p></div>');
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    });
}

