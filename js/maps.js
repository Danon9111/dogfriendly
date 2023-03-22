const mapsApiKey = config.MAPS_API_KEY;
let poznanCenter = { lat: 52.409538, lng: 16.931992 };
let marker, i, map, autocomplete;

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

        google.maps.event.addListener(
          marker,
          "click",
          (function (marker, i) {
            let place_id, placeName, address, hours;
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
                place_id = id?.candidates[0]["place_id"];
                fetch(
                  "https://maps.googleapis.com/maps/api/place/details/json?place_id=" +
                    place_id +
                    "&key=" +
                    mapsApiKey +
                    ""
                )
                  .then(function (placeResponse) {
                    return placeResponse.json();
                  })
                  .then(function (placeDetails) {
                    placeName = placeDetails?.result["name"];
                    address = placeDetails?.result["formatted_address"];
                    hours = placeDetails?.result["opening_hours"]?.weekday_text;
                    return placeName, address, hours;
                  });
              });

            return function () {
              let hoursClean = hours.toString().split(",").join("</br>");
              let markerHTMLStructure =
                "<div id='location-details-container' style='all: unset; display: flex; flex-direction: column; overflow-x: hidden; font-family: system-ui; flex-wrap: nowrap; align-content: flex-start; justify-content: flex-start; align-items: flex-start;'> <div id='location-name' style='order: 0; font-size: 20px; font-weight: bold; padding: 0px 10px 5px 10px;'>" +
                placeName +
                "</div> <div id='location-details' style='order: 1; font-size: 15px; font-weight: bolder; padding: 5px 10px 5px 10px;'>" +
                address +
                "</div> <div id='location-hours' style='order: 2; font-size: 13px; font-weight: normal; padding: 5px 10px 5px 10px;'>" +
                hoursClean +
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
  initAutocomplete();
}

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("search-input"),
    {
      componentRestrictions: { country: ["PL"] },
      fields: ["geometry", "name"],
    }
  );

  google.maps.event.addListener(autocomplete, "place_changed", function () {
    let userMarker = autocomplete.getPlace();

    if (!userMarker.geometry) {
      document.getElementById("search-input").placeholder =
        "Wprowadź szukaną lokalizację jeszcze raz";
    } else {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(
          (poznanCenter.lat = userMarker.geometry.location.lat()),
          (poznanCenter.lng = userMarker.geometry.location.lng())
        ),
        map: map,
      });
    }
  });
}

function insertApi(url) {
  let script = document.createElement("script");
  script.src = url;
  script.async = true;
  document.body.appendChild(script);
}
