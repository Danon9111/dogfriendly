const mapsApiKey = config.MAPS_API_KEY;
const poznanCenter = { lat: 52.409538, lng: 16.931992 };
let marker, i, map;

function displayMarkers() {
  fetch('./assets/locations.json') //read file from a location
    .then(function (response) {
      return response.json(); //to get JSON data from response need to be executed json() function. It returns promise
    })
    .then(function (places) { //get JSON data as a parameter
      for (i = 0; i < places?.locations.length; i++) { 
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(places?.locations[i]["lat"], places?.locations[i]["lng"]),
          map: map
        }); 
      }

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          console.log(places?.locations[i][0]);
          infowindow.setContent(places.locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));

    })
    .catch(function (err) {
      console.log(err);
    });
}

function initMap() {
  let infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById("map"), {
    center: poznanCenter,
    zoom: 13,
  });

  displayMarkers();
}


function callMap(url) {
  let script = document.createElement('script');
  script.src = url;
  script.async = true;
  document.body.appendChild(script);
}
