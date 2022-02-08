const mapsApiKey = config.MAPS_API_KEY;
let map;

function callMap(url) {
  let script = document.createElement('script');
  script.src = url;
  script.async = true;
  document.body.appendChild(script);
}

function initAutocomplete() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 52.409538, lng: 16.931992 },
    zoom: 15,
    mapTypeId: "roadmap",
  });

  const request = {
    query: "Stary Rynek",
    fields: ["name", "geometry"],
  };

  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }

      map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}