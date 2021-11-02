var mapsApiKey = config.MAPS_API_KEY;

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 52.409538, lng: 16.931992 },
    zoom: 10,
  });
}