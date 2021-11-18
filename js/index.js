const mapsApiKey = config.MAPS_API_KEY;

function initMap() {
  let map;
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 52.409538, lng: 16.931992 },
    zoom: 10,
  });
}

function callMap(url) {
  let script = document.createElement('script');
  script.src = url;
  script.async = true;
  document.body.appendChild(script);
}
