const mapsApiKey = config.MAPS_API_KEY;
const poznanCenter = { lat: 52.409538, lng: 16.931992 };
let marker, i, map;

function displayMarkers() {
  fetch("./assets/locations.json") //read file from a location
    .then(function (response) {
      return response.json(); //to get JSON data from response need to be executed json() function. It returns promise
    })
    .then(function (places) {
      //get JSON data as a parameter
      let infowindow = new google.maps.InfoWindow();
      for (i = 0; i < places?.locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(
            places?.locations[i]["lat"],
            places?.locations[i]["lng"]
          ),
          map: map,
        });

        let input = places?.locations[i]["name"];
        fetch(
          "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" +
            input +
            "&inputtype=textquery&key=" +
            mapsApiKey +
            ""
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (id) {
            return place_id = id?.candidates[0]["place_id"];
          });

        google.maps.event.addListener(
          marker,
          "click",
          (function (marker, i) {
            return function () {
              let markerHTMLStructure =
                "<div id='location-details-container' style='width: 200px; height: 150px; overflow-x: hidden;'> <div id='location-name' style='font-weight: bold; font-size: 15px; padding: 5px 10px 5px 10px;'>" +
                place_id +
                "</div> </br> <div id='location-details' style='padding: 5px 10px 5px 10px;'>" +
                "details" +
                "</div> </div>";
              infowindow.setContent(markerHTMLStructure);
              infowindow.open(map, marker);
            };
          })(marker, i)
        );
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: poznanCenter,
    zoom: 13,
  });

  displayMarkers();
}

function callMap(url) {
  let script = document.createElement("script");
  script.src = url;
  script.async = true;
  document.body.appendChild(script);
}
